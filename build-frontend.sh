#!/bin/bash
rm -r frontend/dist 2>/dev/null
mkdir frontend/dist
deno run -A https://deno.land/x/aleph@v0.3.0-alpha.32/cli.ts build frontend --reload
