/* eslint-disable no-use-before-define */
const { runTransform } = require('./esmToCjs');

class VueConvertor {
  regionCodeRegex = /<!--#region code([\s\S]*?)#endregion-->/gm;

  componentNamePrefix = 'code-component';

  convertHtmlToSfc(html) {
    const {
      html: htmlOfHandledDemos,
      demoComponents,
    } = this.parseDemos(html);

    const {
      html: htmlOfHandledScriptTags,
      scriptBodies,
    } = this.parseScriptTags(htmlOfHandledDemos);

    const sfc = this.renderSfc(htmlOfHandledScriptTags, demoComponents, scriptBodies);

    return sfc;
  }

  /**
   * @param html {string}
   * @returns {{html: string, demoComponents: *[]}}
   * @example:
   *
   * <demo>
   *   <!--#region code ... #endregion-->
   *   <pre class="md-code-pre md-code-pre_html"><code>... </code></pre>
   * </demo>
   *
   * ==>
   *
   * <demo>
   *   <code-component1 />
   *   <pre class="md-code-pre md-code-pre_html"><code>... </code></pre>
   * </demo>
   */
  parseDemos(html) {
    const demoComponents = [];

    const htmlOfReplacedDemoCode = html.replace(this.regionCodeRegex, (regionCode, code) => {
      const { name, markup } = this.getNamesOfComponent(demoComponents.length);
      const component = this.getComponentOptions(code);

      demoComponents.push({ name, code, component });

      return markup;
    });

    return { html: htmlOfReplacedDemoCode, demoComponents };
  }

  getNamesOfComponent(index) {
    const name = `${this.componentNamePrefix}${index}`;
    const markup = `<template slot="component"><${name} /></template>`;

    return { name, markup };
  }

  /**
   * @example:
   *
   * code:
   *   <template>
   *     <div>
   *       {{ address.road }}
   *     </div>
   *   </template>
   *   <script>
   *   // ...
   *   export default {
   *     data() {
   *       return {
   *         address: {
   *           city: 'wuhan',
   *           road: 'xiongzhuanglu',
   *         },
   *       };
   *     },
   *   };
   *   </script>
   *
   *   ==>
   *
   * component:
   *   (function() {
   *     // ...
   *     const options = {
   *       data() {
   *         return {
   *           address: {
   *             city: 'wuhan',
   *             road: 'xiongzhuanglu',
   *           },
   *         };
   *       },
   *     };
   *
   *     options.template = `
   *       <div>
   *         <div>
   *           {{ address.road }}
   *         </div>
   *       </div>
   *     `;
   *
   *     return options;
   *   })();
   */
  getComponentOptions(code) {
    const templateRegex = /<template>([\s\S]*)<\/template>/gm;
    const topLevelScriptRegex = /<script>([\s\S]*)\s*export\s+default\s*[\s\S]*<\/script>/gm;
    const exportedObjectRegex = /<script>[\s\S]*\s*export\s+default\s*({[\s\S]*})[\s\S]*<\/script>/gm;

    const [, template] = templateRegex.exec(code) || [];

    const wrappedTemplate = `<div>${template}</div>`;

    const [, topLevelScript] = topLevelScriptRegex.exec(code) || [];

    const formattedTopLevelScript = this.handleImportStatements(topLevelScript);

    const [, exportedObject] = exportedObjectRegex.exec(code) || [];

    const componentOptions = `(function() {
      ${formattedTopLevelScript}
      
      const $$options = ${exportedObject};
    
      $$options.template = \`${wrappedTemplate}\`
    
      return $$options;
    })()`;

    return componentOptions;
  }

  handleImportStatements(esm) {
    return runTransform(esm, {
      quote: 'single',
      lenDestructure: 160,
      lenModuleName: 120,
      lenIdentifier: 120,
    });
  }

  parseScriptTags(html) {
    const scriptBodyRegex = /<script>([\s\S]*?)<\/script>/gm;
    const scriptBodies = [];
    const htmlOfReplaceScriptTags = html.replace(scriptBodyRegex, (matched, scriptBody) => {
      scriptBodies.push(scriptBody);
      return '';
    });

    return { html: htmlOfReplaceScriptTags, scriptBodies };
  }

  renderSfc(html, demoComponents = [], scriptBodies = []) {
    const components = demoComponents
      .map((demoComponent) => `'${demoComponent.name}': ${demoComponent.component}`)
      .join(',\n');

    const rawScripts = scriptBodies.join('\n\n');

    return `
<template>
  <section class="md">
    ${html}
  </section>  
</template>
<script>

${rawScripts}

export default {
  components: {
    ${components}
  }
};
</script>
    `;
  }
}

const vueConvertor = new VueConvertor();

module.exports = vueConvertor;
