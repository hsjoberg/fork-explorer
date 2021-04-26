#!/bin/bash

# Build frontend
rm -r frontend/dist 2>/dev/null
mkdir frontend/dist
deno run -A https://deno.land/x/aleph@v0.3.0-alpha.32/cli.ts build frontend --reload

# Run backend
deno run --allow-net --allow-read index.ts
