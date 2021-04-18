#!/bin/bash

protoc infected/infectedpb/infected.proto  --go_out=plugins=grpc:.