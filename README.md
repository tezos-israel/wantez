# Wantez

## Development

Ensure you have Docker, docker-compose, Node.js, yarn, and vercel installed in the correct versions.

Install dependencies with yarn:

```sh
yarn
vercel env pull ./web/.env.local
yarn db:create
```

Then build and run the project:

```sh
yarn dev
```

Wantez can now be accessed at <http://localhost:3000>.

Read more at [our contributing guidelines](CONTRIBUTING.md)

### Commit

We adhere to the basic rules of commitlint: https://www.npmjs.com/package/@commitlint/config-conventional
