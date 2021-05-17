package main

import (
	"context"
	"encoding/json"
	"fmt"
	"infectedclient/infectedpb"
	"io/ioutil"
	"net/http"

	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

const port int = 80

// use a single instance of Validate, it caches struct info
var validate *validator.Validate

type InfectedInput struct {
	Name        string `json:"name" validate:"required"`
	Location    string `json:"location" validate:"required"`
	Gender      string `json:"gender" validate:"required"`
	Age         int32  `json:"age" validate:"required"`
	VaccineType string `json:"vaccine_type" validate:"required"`
}

func conexion(w http.ResponseWriter, r *http.Request) {
	log.Debug("")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Error(err)
	}

	var infectedInput InfectedInput
	err = json.Unmarshal(body, &infectedInput)
	if err != nil {
		log.Error(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// perform validation of the unmarshalled struct
	err = validate.Struct(&infectedInput)
	if err != nil {
		log.Error(err)
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	// log.Infof("Received the following text to categorize: %s", infectedInput)

	fmt.Println("Hello I'm a client")
	
	cc, err := grpc.Dial("0.0.0.0:50051", grpc.WithInsecure())

	if err != nil {
		log.Fatalf("Could not connect: %v", err)
	}

	defer cc.Close()

	c := infectedpb.NewInfectedServiceClient(cc)
	// fmt.Printf("Created client: %f", c)
	doUnary(c, infectedInput)

	// encode conexionion Ouput into JSON and send to ResponseWriter
	json.NewEncoder(w).Encode("ok")
}

func main() {
	address := fmt.Sprintf(":%d", port)
	log.Infof("Starting HTTP REST API at port %s ...", address)
	log.SetLevel(log.InfoLevel)

	// initialize validator
	validate = validator.New()
	// initialize router and add endpoints
	router := mux.NewRouter()
	router.HandleFunc("/", conexion).Methods(http.MethodPost)

	// start http server
	log.Fatal(http.ListenAndServe(address, router))
}

func doUnary(c infectedpb.InfectedServiceClient, data InfectedInput) {
	req := &infectedpb.InfectedRequest{
		Infected: &infectedpb.Infected{
			Name:        data.Name,
			Location:    data.Location,
			Gender:      data.Gender,
			Age:         data.Age,
			VaccineType: data.VaccineType,
		},
	}
	res, err := c.Infected(context.Background(), req)
	if err != nil {
		log.Fatalf("Error while calling infected RPC: %v", err)
	}
	log.Printf("Response from Infected: %v", res.Result)
}
