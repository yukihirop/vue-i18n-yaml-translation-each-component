const VueI18nBlockDynamicInjector = require("./vue-config/vue-i18n-block-dynamic-injector");

module.exports = {
  chainWebpack: (config) => {
    VueI18nBlockDynamicInjector(config, {
      localePaths: ["./locales/ja.yaml", "./locales/en.yaml"],
    });
  },
};
