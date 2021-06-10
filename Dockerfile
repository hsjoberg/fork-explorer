FROM hayd/alpine-deno:1.9.2

ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=8080
ENV BITCOIND_RPC_URL=http://127.0.0.1:8332
#ENV BITCOIND_RPC_USER
#ENV BITCOIND_RPC_PASSWORD
ENV FORK_NAME=Taproot
ENV FORK_VERSION_BIT=2
ENV FORK_THRESHOLD=1815

COPY . fork-explorer/
WORKDIR fork-explorer/

RUN apk add gettext

EXPOSE 8080

ENTRYPOINT envsubst < config/config.ts_TEMPLATE > config/config.ts && ./build-frontend.sh && ./run-server.sh

HEALTHCHECK CMD wget --spider http://localhost:8080/ || exit 1
