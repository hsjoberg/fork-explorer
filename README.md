# Fork Explorer

Fork Explorer let's you see the status of a BIP9-style softfork. It relies on bitcoind and its JSON-RPC server.

<img width="1000" src="fork-explorer-screenshot.png" />

## Prerequisites

You need [Deno](https://deno.land) to build and run this project. Deno is a new
Javascript environment, similar to Node.

Fix the config file by duplicating `config/config.ts_TEMPLATE` to `config/config.ts` and setting
bitcoind's JSON-RPC credentials up.

## How to run

For development:

```
port=<port> deno task dev
```

For production:

```
port=<port> deno task prod
```

Notice: The port number has to be the same as the one set in config `serverRoot`.

## Generating block data from a specific difficulty period

Difficulty period is calculated as `floor([any block in the period]/2016)`.

`deno run --allow-net --allow-read --allow-write generate/index.ts [period number]`

Once generated, the data is available via API call `/blocks/[epoch number]` or `[project root]/data/periods/[epoch].json`.
You can also display generated periods on the site by going to Settings and changing the "Period" dropdown.

## Commit and Code-Style

Follow the code style of the file you are working in.

This project uses [Prettier](https://prettier.io/) for code formatting.
To contribute, install and activate the Prettier extension to your editor of choice.

For commits, make descriptive and atomic git commits.
You can prefix the page or relevant code you are working with, for example on a frontend change:

```
index: Add 90% indicator to Progress Bar
```

Or for the backend:

```
blocks: Make fakemode not depend on bitcoind
```

# License

MIT
