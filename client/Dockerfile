FROM alpine

RUN apk add npm

VOLUME /home/app

WORKDIR /home/app

COPY ./ /home/app/

EXPOSE 8080

CMD npm install \
  && npm rebuild node-sass \
  && npm start
