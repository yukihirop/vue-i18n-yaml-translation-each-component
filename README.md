# vue-i18n-yaml-translation-each-component

Better than https://github.com/yukihirop/vue-i18n-translation-each-component

How to write a translation for each component and use it on the screen

```yaml
# locales/en.yaml
src/App.vue:
  link:
    home: Home
    about: About
src/views/About.vue:
  title: This is an about page
src/views/Home.vue:
  message: Welcome to Your Vue.js + TypeScript App
```

How to use with SFC

```vue
// src/views/About.vue

<template>
  <div class="about">
    <h1>{{ $t('title') }}</h1>
  </div>
</template>
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
