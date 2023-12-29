# unplugin-vue-components-jsx

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Support JSX for unplugin-vue-components.

Context:
- [unplugin-vue-components don't support jsx](https://github.com/unplugin/unplugin-vue-components/issues/208)

## Install

```npm
pnpm add -D unplugin-vue-components@npm:unplugin-vue-components-jsx
```

## Versioning

This package proxies all unplugin-vue-components exports, it should be compatible by aliasing the `unplugin-vue-components` package. The version of this package is the same as the latest supported unplugin-vue-components version in addition to a patch number suffix indicating the patches of this package (e.g. `0.26.0-1`). It's using `^` relaxed dependency of `unplugin-vue-components`, so it should work with any newer versions of unplugin-vue-components.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/zhiyuanzmj/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/zhiyuanzmj/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2023-PRESENT [zhiyuanzmj](https://github.com/zhiyuanzmj)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-vue-components-jsx?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/unplugin-vue-components-jsx
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-vue-components-jsx?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/unplugin-vue-components-jsx
[bundle-src]: https://img.shields.io/bundlephobia/minzip/unplugin-vue-components-jsx?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=unplugin-vue-components-jsx
[license-src]: https://img.shields.io/github/license/zhiyuanzmj/unplugin-vue-components-jsx.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/zhiyuanzmj/unplugin-vue-components-jsx/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/unplugin-vue-components-jsx
