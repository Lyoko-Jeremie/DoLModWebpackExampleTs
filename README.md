# ModWebpackExampleTs


---

## Installation

1. install nodejs
2. `corepack enable`
3. `yarn`

## config
change mod name in `boot.json` file

## build

`yarn run build:ts`
`yarn run build:webpack`

the output file will in `dist` folder

## pack

`node "..\dist-insertTools\packModZip.js" "boot.json"`


---

only the file in `src_inject` will be build by webpack

the `src_load/earlyload.ts` and `src_load/preload.ts` still two normal ts file, will be build by tsc
