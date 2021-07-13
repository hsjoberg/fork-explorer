#!/bin/sh
mkdir frontend/dist 2>/dev/null
deno run -A https://deno.land/x/aleph@v0.3.0-alpha.33/cli.ts build frontend --reload
