package main

import (
	"context"
	"encoding/json"
	"fmt"
	"infectedserver/infectedpb"
	"log"
	"net"
	"net/http"
	"strconv"
	"strings"

	"google.golang.org/grpc"
)

type server struct{}

type InfectedOutput struct {
	Name        string `json:"name" validate:"required"`
	Location    string `json:"location" validate:"required"`
	Gender      string `json:"gender" validate:"required"`
	Age         int32  `json:"age" validate:"required"`
	VaccineType string `json:"vaccine_type" validate:"required"`
	Canal       string `json:"canal"`
}

func ImprimirMensaje(m InfectedOutput) {
	// cadena := string(m.Infected)
	var msg InfectedOutput
	data, err := json.Marshal(m)
	if err != nil {
		fmt.Printf("Error decodificando: %v", err)
		return
	}
	err = json.Unmarshal(data, &msg)
	// btResult, _ := json.MarshalIndent(&m.Infected, "", "  ")
	// logrus.Infoln(cadena)
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

		// REDIS
		// res2, err := http.Post("http://35.239.78.64/mensajeria", "application/json; charset=UTF-8", datos)
		// if err != nil {
		// 	log.Fatal(err)
		// }
		// defer res2.Body.Close()
	}

	// obj_msg_sender, _ := json.Marshal(cadena)
	// log.Printf("(%d)[%s]:'%s'", i, m.Subject, string(obj_msg_sender))
}

func (*server) Infected(ctx context.Context, req *infectedpb.InfectedRequest) (*infectedpb.InfectedResponse, error) {
	fmt.Printf("Greet function was invoked with %v", req)

	fmt.Println()
	name := req.GetInfected().GetName()
	location := req.GetInfected().GetLocation()
	gender := req.GetInfected().GetGender()
	age := req.GetInfected().GetAge()
	vaccine_type := req.GetInfected().GetVaccineType()
	data := InfectedOutput{Name: name, Location: location, Gender: gender, Age: age, VaccineType: vaccine_type, Canal: "gRPC"}
	ImprimirMensaje(data)
	result := "Hello nombre: " + name + "\nlocation: " + location + "\nedad: " + strconv.FormatInt(int64(age), 10) + "\nGenero: " + gender + "\nTipo Vacuna:" + vaccine_type
	res := &infectedpb.InfectedResponse{
		Result: result,
	}

	return res, nil
}

func main() {
	fmt.Println("Hello World")

	lis, err := net.Listen("tcp", "0.0.0.0:50051")

	if err != nil {
		log.Fatalf("Failled to listend: %v", err)
	}

	s := grpc.NewServer()

	infectedpb.RegisterInfectedServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to server %v", err)
	}
}

