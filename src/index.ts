import { Fragment as f, createElement as r } from 'react';
import { render } from 'react-dom';
import { div, h1, section, strong, p, hr } from 'react-dom-factories';

const header = section(
  { className: 'section' },
  div(
    { className: 'container' },
    h1({ className: 'title' }, 'Kurt Lippert'),
    p(
      { className: 'subtitle' },
      'My first website with ',
      strong({}, 'Bulma'),
      '!',
    ),
  ),
);

/**
 * The render function requires one root node, 'fragment' is
 * like an empty root node (the rendered html will list the
 * passed in elements without a root)
 * @param elements react nodes you want to combine in the fragment
 */
const fragment = (...elements: React.ReactNode[]) => r(f, {}, elements);

render(fragment(header, hr()), document.querySelector('main'));
