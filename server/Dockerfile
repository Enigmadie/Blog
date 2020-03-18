FROM alpine

RUN apk add npm \
      && npm install

VOLUME /opt/server

WORKDIR /opt/server

COPY ./ /opt/server/

EXPOSE 5000

CMD npm start
