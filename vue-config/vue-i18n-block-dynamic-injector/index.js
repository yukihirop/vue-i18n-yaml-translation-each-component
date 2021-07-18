/**
 * @see https://github.com/d2-projects/vue-filename-injector
 * @see https://vue-loader.vuejs.org/guide/custom-blocks.html#example
 */

const loaderPath = require.resolve("./loader");

module.exports = function (config, options) {
  config.module
    .rule("vue")
    .use("vue-i18n-block-dynamic-injector")
    .loader(loaderPath)
    .options(options)
    .after("vue-loader")
    .end();

  config.module
    .rule("i18n")
    .resourceQuery(/blockType=i18n/)
    .type("javascript/auto")
    .use("i18n")
      .loader("@intlify/vue-i18n-loader")
      .end();
};
