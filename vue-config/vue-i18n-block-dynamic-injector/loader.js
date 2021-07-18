/**
 * @see https://github.com/d2-projects/vue-filename-injector
 * @see https://vue-loader.vuejs.org/guide/custom-blocks.html#example
 */
const fs = require("fs");
const path = require("path");
const loaderUtils = require("loader-utils");
const yaml = require("js-yaml");
const pkgDir = require("pkg-dir");
const deeepMerge = require("deepmerge");

const projectRoot = pkgDir.sync() || process.cwd();
const blockName = "i18n";

function getLocales(localePaths) {
  // { "src/views/App.vue": { ja: {...}, en: {...} } }
  return localePaths.reduce((acc, p) => {
    const localeName = path.basename(p, ".yaml");
    const yamlData = yaml.load(fs.readFileSync(`${projectRoot}/${p}`, "utf8"));

    const dataPerLocale = Object.keys(yamlData).reduce((childAcc, compPath) => {
      if (!childAcc[compPath]) {
        childAcc[compPath] = {};
      }
      if (!childAcc[compPath][localeName]) {
        childAcc[compPath][localeName] = {};
      }
      childAcc[compPath][localeName] = yamlData[compPath];
      return childAcc;
    }, {});

    acc = deeepMerge(acc, dataPerLocale);
    return acc;
  }, {});
}

module.exports = function (content) {
  const loaderContext = this;
  const { rootContext, resourcePath } = loaderContext;
  const context = rootContext || process.cwd();
  const options = loaderUtils.getOptions(loaderContext) || {};
  const rawShortFilePath = path
    .relative(context, resourcePath)
    .replace(/^(\.\.[\/\\])+/, "");

  const localePaths = options.localePaths;
  const localeData = getLocales(localePaths);
  let compPath = rawShortFilePath.replace(/\\/g, "/");

  const compLocaleData = localeData[compPath];

  /**
   * The loader may run even if 「compLocaleData」 data cannot be obtained.
   */
  if (compLocaleData != undefined) {
    content += `
<${blockName}>
${JSON.stringify(compLocaleData)}
</${blockName}>
  `;
  }

  return content;
};
