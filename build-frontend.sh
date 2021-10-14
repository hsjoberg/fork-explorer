#!/bin/sh
mkdir frontend/dist 2>/dev/null
deno run -A https://deno.land/x/aleph@v0.3.0-beta.19/cli.ts build frontend --reload
