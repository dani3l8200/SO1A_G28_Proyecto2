package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
	log "github.com/sirupsen/logrus"
)

type InfectedInput struct {
	Name        string `json:"name" validate:"required"`
	Location    string `json:"location" validate:"required"`
	Gender      string `json:"gender" validate:"required"`
	Age         int32  `json:"age" validate:"required"`
	VaccineType string `json:"vaccine_type" validate:"required"`
}

func publish(w http.ResponseWriter, r *http.Request) {

	client := redis.NewClient(&redis.Options{
		Addr:     "34.70.56.51:6379",
		Password: "",
		DB:       0,
	})
	defer client.Close()

	_, err := client.Ping(context.Background()).Result()
	if err != nil {
		log.Fatalln(err)
	}

	err = client.Publish(r.Context(), "canal1", "Ya no sale :,v").Err()
	if err != nil {
		log.Fatalln(err)
	}

}

func publishJSON(w http.ResponseWriter, r *http.Request) {
	client := redis.NewClient(&redis.Options{
		Addr:     "34.70.56.51:6379",
		Password: "",
		DB:       0,
	})

	defer client.Close()

	w.Header().Set("Content-Type", "application/json")

	var infectedinput InfectedInput

	_ = json.NewDecoder(r.Body).Decode(&infectedinput)

	log.Infoln(infectedinput)

	json.NewEncoder(w).Encode(&infectedinput)

	err := client.Publish(r.Context(), "canal1",
		`{ "name": "`+infectedinput.Name+`",
	"location": "`+infectedinput.Location+`",
	"gender": "`+infectedinput.Gender+`",
	"age": "`+strconv.FormatInt(int64(infectedinput.Age), 10)+`",
	"vaccine_type": "`+infectedinput.VaccineType+`"
}`).Err()

	if err != nil {
		log.Errorln(err)
	}

}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint Hit")
}

func handleRequests() {

	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/publish", publish).Methods("GET")
	myRouter.HandleFunc("/publish/json", publishJSON).Methods("POST")
	log.Fatal(http.ListenAndServe(":6075", myRouter))
}

func main() {
	handleRequests()
}
