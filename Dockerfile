FROM node:16-alpine3.14 as builder

ARG LOG_PROVIDER_CREDENTIAL
#Install Yarn
RUN npm i -g corepack
WORKDIR /app

COPY package*.json /app/
RUN yarn install

COPY tsconfig.* /app/
COPY src /app/src/
COPY .env.dev /app/.env
COPY deploy.sh /app/deploy.sh
RUN echo $LOG_PROVIDER_CREDENTIAL > /app/credential.txt

RUN yarn build

RUN rm -rf node_modules;

#re-install
RUN yarn install --prod

FROM node:16-alpine3.14
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules/
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist/
COPY --from=builder /app/credential.txt /app/credential.txt
COPY --from=builder /app/.env /app/.env
COPY --from=builder /app/deploy.sh /app/deploy.sh
RUN chmod +x deploy.sh

EXPOSE 4000

CMD ["./deploy.sh"]