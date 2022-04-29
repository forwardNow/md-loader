const MarkdownIt = require('markdown-it');

const mdOptions = require('./commons/mdOptions');
const demoContainerPlugin = require('./plugins/demoContainerPlugin');
const tipsContainerPlugin = require('./plugins/tipsContainerPlugin');
const vueConvertor = require('./commons/VueConvertor');

const md = MarkdownIt(mdOptions);

md.use(demoContainerPlugin);

md.use(tipsContainerPlugin, { names: ['tip', 'warning'] });

function mdLoader(source) {
  const html = md.render(source);

  const sfcVue = vueConvertor.convertHtmlToSfc(html);

  return sfcVue;
}

module.exports = mdLoader;
