tsc generatorCli.ts --outDir "build" --module "commonjs" --lib "es2015"

firebase firestore:delete -r galaxies
node build/generator-cli/generatorCli.js
