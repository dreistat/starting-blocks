# Changelog

## Unreleased

- Removed the `bottlejs` dependency: *Starting Blocks* now has no runtime dependencies.
- New built-in `ServiceContainer` (exported, with `Container`, `InstanceFactory`, `ServiceDefinition` types) keeps BottleJS semantics: lazy singletons, `instanceFactory().instance()`, overriding a service before it is instantiated, and `container.$register()`.
- `StartingBlocks#bottle` is deprecated, use `StartingBlocks#services` instead.
- Resolving a circular dependency now throws a clear error instead of overflowing the stack.
- Nested (dotted) service names, decorators and middleware from BottleJS are not supported.
- `AbstractBlock#rootElement` and `AbstractPage#rootElement` are now typed `HTMLElement` (non-nullable). They are assigned before `init()`, so subclasses no longer need null checks or `declare rootElement: HTMLElement;` overrides. Before assignment (i.e. in the constructor) the value is now `undefined` instead of `null`.
- Dev tooling upgraded to TypeScript 7 and Vite 8 (Rolldown). `tsconfig.json` now uses `moduleResolution: "Bundler"` and an explicit `rootDir`.
- The `dist/starting-blocks.amd.js` build was dropped, because Rolldown has no AMD output. Use `dist/starting-blocks.umd.cjs`, which still supports AMD loaders (`define.amd`). The file was never exposed through the package `exports` map.
- `dist/` is now built for Vite 8's default target (`baseline-widely-available`), so native class fields, `?.` and `??` are emitted as-is.

## version 5.0.0 2018-03-06

- Drop jquery and waitForImages
- Remove `onLoad` method in `AbstractPage` and `AbstractBlock`

## Version 4.2.0: 2018-03-06

- Change `classFactory.getBlockInstance()` method parameters order (`page, $cont, nodeType`). Make sure to update your `classFactory` file
- You can now switch `classFactory.getBlockInstance()` to `async` and dynamically load your modules with `import('yourModule').then()`, see example for more details.
- Optional web worker feature to load pages content. Add `workerEnabled` router option to true to enable

## Version 4.1.0: 2018-02-20

- Change `classFactory.getPageInstance()` method parameters order and removed `isHome` parameter
- Added new `data` object parameter in history `add` method if you want to manually add specific data

## Version 4.0.0: 2018-02-08

- Big refactoring of all classes
- No more need to bind manually all **links** in Pages, Blocks or Nav, everything is handled by *Pjax* class
- Removed all Router constructor arguments except for `options` array
- `AbstractNav` has been removed, do not extend it anymore.
- Starting-blocks wrapper default ID is now `sb-wrapper`, you can change it in your `Router` options (i.e. `ajaxWrapperId: 'main-container'`)
- *jquery*, *loglevel* and *jquery.waitforimages* are declared external. You should provide them manually as file or as CDN in your project.
- *Pjax* is now using native `window.fetch` methods to perform XHR requests. Make sure to use necessary polyfills. **If window.fetch is not supported, ajax will be disabled.**
