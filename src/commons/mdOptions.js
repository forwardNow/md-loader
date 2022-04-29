/* eslint-disable no-use-before-define */
const highlightJs = require('highlight.js');
const mdUtils = require('markdown-it/lib/common/utils');

module.exports = {
  html: true,
  breaks: true,
  typographer: true,
  highlight: (code, lang) => {
    const language = lang || 'text';

    let highlightedCode = highlightCode(code, language);

    if (highlightedCode == null) {
      highlightedCode = mdUtils.escapeHtml(code);
    }

    const preClass = `md-code-pre md-code-pre_${language}`;

    return `<pre class="${preClass}" v-pre><code>${highlightedCode}</code></pre>`;
  },
};

function highlightCode(code, lang) {
  try {
    if (!lang) {
      return null;
    }

    if (!highlightJs.getLanguage(lang)) {
      return null;
    }

    return highlightJs.highlight(code, { language: lang, ignoreIllegals: true }).value;
  } catch (e) {
    console.log(e);
    return null;
  }
}
