#!/bin/bash
openssl genrsa -out ssh/paloUbuntu-key.pem 2048
openssl req -new -x509 -days 1826 -key ssh/paloUbuntu-key.pem -out ssh/paloUbuntu-cert.pem -subj "/C=FR/ST=France/L=Nantes/O=Palo IT"
# openssl x509 -req -days 365 -in ssh/paloUbuntu-csr.pem -signkey ssh/paloUbuntu-key.pem -out ssh/paloUbuntu-cert.crt
#openssl pkcs12 -export -in  paloUbuntu-crt.pem -inkey  paloUbuntu-key.pem -certfile  paloUbuntu-crt.pem -out paloUbuntu.pfx
