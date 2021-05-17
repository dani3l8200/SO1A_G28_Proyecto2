package main

import (
	"encoding/json"
	"fmt"
	"net/http"

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

/*func publish(w http.ResponseWriter, r *http.Request) {

	client := redis.NewClient(&redis.Options{
		Addr:     "35.245.206.220:30656",
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

}*/

func publishJSON(w http.ResponseWriter, r *http.Request) {
	client := redis.NewClient(&redis.Options{
		Addr:     "35.245.206.220:30656",
		Password: "",
		DB:       0,
	})

	defer client.Close()

	w.Header().Set("Content-Type", "application/json")

	var infectedinput InfectedInput

	_ = json.NewDecoder(r.Body).Decode(&infectedinput)

	log.Infoln(infectedinput)

	// json.NewEncoder(w).Encode(&infectedinput)
	data, err := json.Marshal(infectedinput)
	if err != nil {
		log.Errorln(err)
	}
	err = client.Publish(r.Context(), "canal1",
		data).Err()

	if err != nil {
		log.Errorln(err)
	}

}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint Hit")
}

func handleRequests() {

	myRouter := mux.NewRouter()

	myRouter.HandleFunc("/", homePage).Methods(http.MethodGet)
	myRouter.HandleFunc("/", publishJSON).Methods(http.MethodPost)
	log.Fatal(http.ListenAndServe(":80", myRouter))
}

func main() {
	handleRequests()
}
