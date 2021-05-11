#!/bin/bash

protoc infected_cliente/infectedpb/infected.proto  --go_out=plugins=grpc:.