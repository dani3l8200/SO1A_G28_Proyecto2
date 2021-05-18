package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/go-playground/validator"
	"github.com/gorilla/mux"
	"github.com/segmentio/kafka-go"
	log "github.com/sirupsen/logrus"
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
	Canal       string `json:"canal"`
}

const (
	TOPIC          = "sopes-topic"
	BROKER_ADDRESS = "35.245.206.220:31783"
)

func KafkaProducer(ctx context.Context, message string, result string) {
	i := 0

	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{BROKER_ADDRESS},
		Topic:   TOPIC,
	})

	err := w.WriteMessages(ctx, kafka.Message{
		Key:   []byte(strconv.Itoa(i)),
		Value: []byte(message),
	})

	if err != nil {
		result = "F VACAS"
	}
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
	infectedInput.Canal = "Kafka"
	// perform validation of the unmarshalled struct
	err = validate.Struct(&infectedInput)
	if err != nil {
		log.Error(err)
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	// log.Infoln("Hello I'm a client")
	data, _ := json.Marshal(infectedInput)

	result := string(data)

	go KafkaProducer(context.Background(), string(data), result)

	log.Infoln(result)
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
