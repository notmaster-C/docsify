
# configuration


## alias 路由代理

- Type: `Object`

Set the route alias. You can freely manage routing rules. Supports RegExp.
Do note that order matters! If a route can be matched by multiple aliases, the one you declared first takes precedence.

```js
window.$docsify = {
  alias: {
    '/foo/(.*)': '/bar/$1', // supports regexp
    '/zh-cn/changelog': '/changelog',
    '/changelog':
      'https://raw.githubusercontent.com/docsifyjs/docsify/master/CHANGELOG',

    // You may need this if you use routerMode:'history'.
    '/.*/_sidebar.md': '/_sidebar.md', // See #301
  },
};
```

> **Note** If you change [`routerMode`](#routermode) to `'history'`, you may
> want to configure an alias for your `_sidebar.md` and `_navbar.md` files.

## auto2top

- Type: `Boolean`
- Default: `false`

Scrolls to the top of the screen when the route is changed.
不知道有啥用

```js
window.$docsify = {
  auto2top: true,
};
```

## autoHeader
- Type: `Boolean`
- Default: `false`

If `loadSidebar` and `autoHeader` are both enabled, for each link in `_sidebar.md`, prepend a header to the page before converting it to HTML. See [#78](https://github.com/docsifyjs/docsify/issues/78).

```js
window.$docsify = {
  loadSidebar: true,
  autoHeader: true,
};
```

## basePath


- Type: `String`

Base path of the website. You can set it to another directory or another domain name.

```js
window.$docsify = {
  basePath: '/path/',

  // Load the files from another site
  basePath: 'https://docsify.js.org/',

  // Even can load files from other repo
  basePath:
    'https://raw.githubusercontent.com/ryanmcdermott/clean-code-javascript/master/',
};
```
## cornerExternalLinkTarget 当前页面跳转 或新页面跳转

- Type: `String`
- Default: `'_blank'`

Target to open external link at the top right corner. Default `'_blank'` (new window/tab)

```js
window.$docsify = {
  cornerExternalLinkTarget: '_self', // default: '_blank'
};
```

## coverpage

- Type: `Boolean|String|String[]|Object`
- Default: `false`

Activate the [cover feature](cover.md). If true, it will load from `_coverpage.md`.

```js
window.$docsify = {
  coverpage: true,

  // Custom file name
  coverpage: 'cover.md',

  // multiple covers
  coverpage: ['/', '/zh-cn/'],

  // multiple covers and custom file name
  coverpage: {
    '/': 'cover.md',
    '/zh-cn/': 'cover.md',
  },
};
```
## el

- Type: `String`
- Default: `'#app'`

The DOM element to be mounted on initialization. It can be a CSS selector string or an actual [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement).

```js
window.$docsify = {
  el: '#app',
};
```
## executeScript

- Type: `Boolean`
- Default: `null`

Execute the script on the page. Only parses the first script tag ([demo](themes)). If Vue is detected, this is `true` by default.

```js
window.$docsify = {
  executeScript: true,
};
```

```markdown
## This is test

<script>
  console.log(2333)
</script>

```
Note that if you are running an external script, e.g. an embedded jsfiddle demo, make sure to include the [external-script](plugins.md?id=external-script) plugin.
## This is test
<script>
  console.log(2333)
</script>

## ext

- Type: `String`
- Default: `'.md'`

Request file extension.

```js
window.$docsify = {
  ext: '.md',
};
```
## externalLinkTarget

- Type: `String`
- Default: `'_blank'`

Target to open external links inside the markdown. Default `'_blank'` (new window/tab)

```js
window.$docsify = {
  externalLinkTarget: '_self', // default: '_blank'
};
```
## fallbackLanguages

- Type: `Array<string>`

List of languages that will fallback to the default language when a page is requested and it doesn't exist for the given locale.

Example:

- try to fetch the page of `/de/overview`. If this page exists, it'll be displayed.
- then try to fetch the default page `/overview` (depending on the default language). If this page exists, it'll be displayed.
- then display the 404 page.

```js
window.$docsify = {
  fallbackLanguages: ['fr', 'de'],
};
```

## formatUpdated

- Type: `String|Function`

We can display the file update date through **{docsify-updated<span>}</span>** variable. And format it by `formatUpdated`.
See https://github.com/lukeed/tinydate#patterns

```js
window.$docsify = {
  formatUpdated: '{MM}/{DD} {HH}:{mm}',

  formatUpdated(time) {
    // ...

    return time;
  },
};
```

## hideSidebar

- Type : `Boolean`
- Default: `true`

This option will completely hide your sidebar and won't render any content on the side.

```js
window.$docsify = {
  hideSidebar: true,
};
```
## homepage

- Type: `String`
- Default: `'README.md'`

`README.md` in your docs folder will be treated as the homepage for your website, but sometimes you may need to serve another file as your homepage.

```js
window.$docsify = {
  // Change to /home.md
  homepage: 'home.md',

  // Or use the readme in your repo
  homepage:
    'https://raw.githubusercontent.com/docsifyjs/docsify/master/README.md',
};
```


## keyBindings

- Type: `Boolean|Object`
- Default: `Object`
  - <kbd>\\</kbd> Toggle the sidebar menu 切换侧边栏菜单
  - <kbd>/</kbd> Focus on [search](plugins#full-text-search) field. Also supports <kbd>alt</kbd>&nbsp;/&nbsp;<kbd>ctrl</kbd>&nbsp;+&nbsp;<kbd>k</kbd>.

Binds key combination(s) to a custom callback function.

Key `bindings` are defined as case insensitive string values separated by `+`. Modifier key values include `alt`, `ctrl`, `meta`, and `shift`. Non-modifier key values should match the keyboard event's [key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) or [code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) value.

The `callback` function receive a [keydown event](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event) as an argument.
!> Let site visitors know your custom key bindings are available! If a binding is associated with a DOM element, consider inserting a `<kbd>` element as a visual cue (e.g., <kbd>alt</kbd> + <kbd>a</kbd>) or adding [title](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title) and [aria-keyshortcuts](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-keyshortcuts) attributes for hover/focus hints.

```js
window.$docsify = {
  keyBindings: {
    // Custom key binding
    myCustomBinding: {
      bindings: ['alt+a', 'shift+a'],
      callback(event) {
        alert('Hello, World!');
      },
    },
  },
};
```

Key bindings can be disabled entirely or individually by setting the binding configuration to `false`.

```js
window.$docsify = {
  // Disable all key bindings
  keyBindings: false,
};
```

```js
window.$docsify = {
  keyBindings: {
    // Disable individual key bindings
    focusSearch: false,
    toggleSidebar: false,
  },
};
```





