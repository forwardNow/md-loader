const mdContainer = require('markdown-it-container');

/**
 * @param md {any} MarkdownIt
 * @param options {{ names: string[] }} “ ::: name  ...  ::: ”
 * @returns {*} MarkdownIt
 */
module.exports = function tipsContainer(md, options) {
  const { names = [] } = options;

  names.forEach((name) => {
    md.use(mdContainer, name);
  });

  return md;
};
