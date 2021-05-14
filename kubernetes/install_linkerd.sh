#!/bin/bash
curl -sL run.linkerd.io/install | sh
export PATH=$PATH:/home/$USER/.linkerd2/bin
linkerd version
linkerd check --pre
linkerd install | kubectl apply -f -
linkerd check
linkerd viz install | kubectl apply -f -
linkerd check
