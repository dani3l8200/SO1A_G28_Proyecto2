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
	Name         string `json:"name,omitempty"`     //para ser mas explicito de lo que espero recibir
	Location     string `json:"location,omitempty"` // nombre como lo espero ,  caracteristica no nulo
	Age          int32  `json:"age,omitempty"`
	Infectedtype string `json:"infectedtype,omitempty"`
	State        string `json:"state,omitempty"`
	Canal        string `json:"canal"`
}

func ImprimirMensaje(m InfectedOutput) {
	// cadena := string(m.Infected)
	var msg InfectedOutput
	data, err := json.Marshal(m)
	if err != nil {
		fmt.Printf("Error decodificando: %v",err)
		return
	}
	err = json.Unmarshal(data, &msg)
	// btResult, _ := json.MarshalIndent(&m.Infected, "", "  ")
	// logrus.Infoln(cadena)
	if err != nil {
		fmt.Printf("Error decodificando: %v\n", err)
		return
	} else {
		// lo mando
		datos := strings.NewReader(string(data))
		res, err := http.Post("http://35.239.78.64/mensajeria", "application/json; charset=UTF-8", datos)
		if err != nil {
			log.Fatal(err)
		}
		defer res.Body.Close()
	}

	// obj_msg_sender, _ := json.Marshal(cadena)
	// log.Printf("(%d)[%s]:'%s'", i, m.Subject, string(obj_msg_sender))
}

func (*server) Infected(ctx context.Context, req *infectedpb.InfectedRequest) (*infectedpb.InfectedResponse, error) {
	fmt.Printf("Greet function was invoked with %v", req)

	fmt.Println()
	name := req.GetInfected().GetName()
	location := req.GetInfected().GetLocation()
	age := req.GetInfected().GetAge()
	infectedType := req.GetInfected().GetInfectedtype()
	state := req.GetInfected().GetState()
	data := InfectedOutput{Name: name, Location: location, Age: age, Infectedtype: infectedType, State: state, Canal: "gRPC"}
	ImprimirMensaje(data)
	result := "Hello nombre: " + name + "\nlocation: " + location + "\nedad: " + strconv.FormatInt(int64(age), 10) + "\ntipo infectado: " + infectedType + "\nestado:" + state
	res := &infectedpb.InfectedResponse{
		Result: result,
	}

	return res, nil
}

func main() {
	fmt.Println("Hello World")

	lis, err := net.Listen("tcp", ":50051")

	if err != nil {
		log.Fatalf("Failled to listend: %v", err)
	}

	s := grpc.NewServer()

	infectedpb.RegisterInfectedServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to server %v", err)
	}
}

