const mdContainer = require('markdown-it-container');

module.exports = function demoContainer(md) {
  return md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },

    render(tokens, idx) {
      // const contentAfterDemoTag = tokens[idx].info.trim().match(/^demo\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        const nextToken = tokens[idx + 1];

        const code = nextToken.type === 'fence' ? nextToken.content : '';

        return `\n<demo>
<!--#region code
${code}
#endregion-->
`;
      }
      // closing tag
      return '</demo>\n';
    },
  });
};
