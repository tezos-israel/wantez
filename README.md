# Wantez

## Development

- set gitlab ssh keys

- install deps: yarn, nodejs, docker-compose

- run the following commands:

```
yarn
yarn workspace web hasura migrate --project ./hasura --admin-secret password apply
yarn workspace web hasura metadata --project ./hasura --admin-secret password apply
yarn dev
```
