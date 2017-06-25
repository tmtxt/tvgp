FROM tmtxt/tvgp-frontend-base:0.0.4

COPY . .

RUN yarn run build

CMD ["dumb-init", "yarn", "start"]
