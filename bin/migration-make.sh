#!bin/sh
npx typeorm -d dist/data-source.js migration:generate migrations/${1:-mig}