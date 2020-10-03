FROM alpine

RUN apk add npm

VOLUME /home/app

WORKDIR /home/app

COPY ./ /home/app/

EXPOSE 8080

CMD npm install \
  && npm run-script build
  # && npm rebuild node-sass \
  # && node --max-old-space-size=4196 `which npm` start
