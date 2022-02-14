import { prettierKonfik } from '@schickling/konfik-base'
import * as eslintBase from '@schickling/konfik-base/eslint/base'
import * as eslintReact from '@schickling/konfik-base/eslint/react'
import { PackageJsonKonfik } from '@konfik-plugin/package-json'

export { prettyPrint } from '@schickling/konfik-base'

const packageKonfik = PackageJsonKonfik({
  name: 'contentlayer-monorepo',
  private: true,
  workspaces: ['./packages/@contentlayer/*', './packages/*', './examples/*'],
  scripts: {
    postinstall: 'ts-patch install && ts-patch --persist',
    test: 'yarn workspaces foreach --no-private --parallel run test',
    build: 'run build:clean && run build:ts && yarn workspace next-contentlayer run prepack',
    'build:konfik': 'konfik build -c ./.konfik/index.ts',
    'dev:konfik': 'konfik dev -c ./.konfik/index.ts',
    'build:ts': 'tsc --build tsconfig.all.json',
    'dev:ts': 'run build:ts --watch',
    'build:clean': "bash -c 'rm -rf packages/*/dist packages/@contentlayer/*/dist'",
    'examples:postinstall':
      'yarn workspaces foreach --verbose --include "examples-*" exec yarn contentlayer postinstall',
    'release:prerelease':
      'yarn build && yarn workspaces foreach --verbose --topological-dev --no-private exec npm version prerelease --preid=dev && yarn workspaces foreach --verbose --topological-dev --parallel --no-private npm publish --tolerate-republish --tag=dev',
    'release:patch':
      'yarn build && yarn workspaces foreach --verbose --topological-dev --no-private exec npm version patch && yarn workspaces foreach --verbose --topological-dev --parallel --no-private npm publish --tolerate-republish',
    'release:minor':
      'yarn build && yarn workspaces foreach --verbose --topological-dev --no-private exec npm version minor && yarn workspaces foreach --verbose --topological-dev --parallel --no-private npm publish --tolerate-republish',
    'lint:check': 'run lint:eslint:check && run lint:prettier:check',
    'lint:fix': 'run lint:eslint:fix & run lint:prettier:fix',
    'lint:eslint:fix': 'eslint packages --ext .ts --fix',
    'lint:eslint:check': 'eslint packages --ext .ts --max-warnings=0',
    'lint:prettier:fix': 'prettier packages --write',
    'lint:prettier:check': 'prettier packages --check',
  },
  devDependencies: {
    ...eslintBase.eslintDeps,
    ...eslintReact.eslintDeps,
    '@changesets/cli': '2.19.0-temp.0',
    '@effect-ts/tracing-plugin': '^0.18.0',
    '@konfik-plugin/package-json': 'latest',
    '@schickling/konfik-base':
      'https://github.com/schickling/konfik-base.git#workspace=@schickling/konfik-base&commit=658ecbd6095814a270cda5057802a997a348ab09',
    '@types/prettier': '^2.3.2',
    konfik: '^0.0.12',
    prettier: '^2.5.1',
    'ts-patch': '^1.4.5',
    typescript: '^4.5.5',
  },
  resolutions: {
    esbuild: '0.13.12',
    contentlayer: 'workspace:*',
    '@contentlayer/*': 'workspace:*',
    'contentlayer-stackbit-yaml-generator': 'workspace:*',
    'next-contentlayer': 'workspace:*',
    rxjs: '^7.1.0',
  },
  packageManager: 'yarn@3.1.1',
})

export default {
  'prettier.config.js': prettierKonfik,
  'package.json': packageKonfik,
  packages: {
    '.eslintrc': eslintBase.eslintKonfik,
  },
  examples: {
    '.eslintrc': eslintReact.eslintKonfik,
  },
}