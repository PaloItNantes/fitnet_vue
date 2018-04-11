FROM node:carbon


# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json

RUN cd /tmp && yarn install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN mkdir /usr/src/app/ssh

# Generate SSL certificate with script
ADD generate-certificate.sh /tmp/generate-certificate.sh
RUN chmod +x /tmp/generate-certificate.sh
RUN /bin/bash -c "source /tmp/generate-certificate.sh"

RUN npm run build
RUN rm -rf ./build
RUN rm -rf ./src

EXPOSE 443

CMD ["npm", "start" ]