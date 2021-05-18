package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/manucorporat/try"
	"github.com/segmentio/kafka-go"
	log "github.com/sirupsen/logrus"
)

// use a single instance of Validate, it caches struct info
// var validate *validator.Validate

type InfectedOutput struct {
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
	GROUP_ID       = "my-group"
)

func ImprimirMensaje(m *kafka.Message) {
	// cadena := string(m.Infected)
	var msg InfectedOutput
	
	data := m.Value

	err := json.Unmarshal(data, &msg)
	
	if err != nil {
		fmt.Printf("Error decodificando: %v\n", err)
		return
	} else {
		// Mongo
		datos := strings.NewReader(string(data))
		res, err := http.Post("http://35.188.112.73/mongo/mensajeria", "application/json; charset=UTF-8", datos)
		if err != nil {
			log.Fatal(err)
		}
		defer res.Body.Close()
	}

}
func KafkaConsume(ctx context.Context) {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{BROKER_ADDRESS},
		Topic:   TOPIC,
		GroupID: GROUP_ID,
	})

	for {
		msg, err := r.ReadMessage(ctx)
		if err != nil {
			log.Error(err.Error())
		}
		ImprimirMensaje(&msg)
		log.Infoln("Message Received: " + string(msg.Value))

	}
}

func main() {
	for {
		try.This(func() {
			KafkaConsume(context.Background())
		}).Catch(func(err try.E) {
			log.Error(err)
		})
	}
}
