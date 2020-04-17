


openssl genrsa -out test.key 2048
openssl req -x509 -new -nodes -addext "subjectAltName = DNS:localhost" -key test.key -sha256 -days 1024 -out test.crt

## This doesn't work
#openssl genrsa -out test.key 2048
#openssl req -new -sha256 \
#    -out test.csr \
#    -key test.key \
#    -config ssl.conf
#openssl x509 -req \
#    -sha256 \
#    -days 365 \
#    -in test.csr \
#    -signkey test.key \
#    -out test.crt \
#    -extensions req_ext \
#    -extfile ssl.conf