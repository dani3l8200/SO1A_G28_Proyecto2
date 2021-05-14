package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/go-redis/redis/v8"
	"github.com/sirupsen/logrus"
)

var ctx = context.Background()

type InfectedInput struct {
	Name        string      `json:"name" validate:"required"`
	Location    string      `json:"location" validate:"required"`
	Gender      string      `json:"gender" validate:"required"`
	Age         json.Number `json:"age" validate:"required"`
	VaccineType string      `json:"vaccine_type" validate:"required"`
}

func ImprimirMensaje(m *redis.Message) {
	cadena := string([]byte(m.Payload))
	// var msg InfectedInput
	data, err := json.Marshal(cadena)
	
	if err != nil {
		fmt.Println(data)
		fmt.Printf("Error decodificando: %v\n", err)
	} else {
		// lo mando
		datos := strings.NewReader(cadena)
		// Hay que arreglar esta url, es para mongo
		res, err := http.Post("http://35.188.112.73/mongo/mensajeria", "application/json; charset=UTF-8", datos)
		if err != nil {
			log.Fatal(err)
		}

		defer res.Body.Close()

		// REDIS
		// res2, err := http.Post("http://35.239.78.64/mensajeria2", "application/json; charset=UTF-8", datos)
		// if err != nil {
		// 	log.Fatal(err)
		// }

		// defer res2.Body.Close()
	}

	// obj_msg_sender, _ := json.Marshal(cadena)
	// log.Printf("(%d)[%s]:'%s'", i, m.Subject, string(obj_msg_sender))
}

func main() {
	// Set Connection to redis
	client := redis.NewClient(&redis.Options{
		Addr:     "35.246.53.188:30089",
		Password: "",
		DB:       0,
	})
	// Verify Connection to client redis
	_, err := client.Ping(ctx).Result()
	if err != nil {
		logrus.Errorln(err)
	}

	defer client.Close()
	sub := client.Subscribe(ctx, "canal1")

	for {
		msg, err := sub.ReceiveMessage(ctx)
		if err != nil {
			logrus.Errorln(err)
		}
		val, err := client.Do(ctx, "RPUSH", "listvacunned", msg.Payload).Result()
		if err != nil {
			logrus.Errorln("Error: ", err)
		}
		logrus.Infoln(val, string([]byte(msg.Payload)))
		ImprimirMensaje(msg)
	}
}

