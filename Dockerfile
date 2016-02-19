FROM ubuntu:trusty

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install --yes npm supervisor \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm install -G chokidar po2json jsonfile

VOLUME /application

CMD supervisord -n -c /application/supervisord.conf
