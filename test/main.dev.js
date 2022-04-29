import 'highlight.js/styles/atom-one-light.css';

import mdLoader from '../src/main';
import mdFile from './mds/1.basic-tags.md';

const content = mdLoader(mdFile);

document.querySelector('#app').innerHTML = content;
