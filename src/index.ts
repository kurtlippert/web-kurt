import { Fragment as f, createElement as r } from 'react';
import { render } from 'react-dom';
import {
  div,
  h1,
  section,
  strong,
  p,
  hr,
  img,
  article,
  figure,
  h2,
} from 'react-dom-factories';
import MePic from './assets/me-pic.jpg';

/**
 * The render function requires one root node, 'fragment' is
 * like an empty root node (the rendered html will list the
 * passed in elements without a root)
 * @param elements react nodes you want to combine in the fragment
 */
const fragment = (...elements: React.ReactNode[]) => r(f, {}, elements);

/**
 * All webpage content will be nested under this root node
 * ```
 *  <section class="section">
 *    <div class="container">
 *      {the_content_here}
 *    </div>
 *  </section>
 * ```
 * @param content The rest of the app: headers, sidenavs, etc
 */
const root = (content: React.ReactNode) =>
  section({ className: 'section' }, div({ className: 'container' }, content));

const header = fragment(
  article(
    { className: 'media' },
    figure(
      { className: 'media-left' },
      p({ className: 'image is-128x128' }, img({ src: MePic })),
    ),
    div(
      { className: 'media-content' },
      h1({ className: 'title' }, 'Kurt Lippert'),
      p(
        { className: 'subtitle' },
        'My first website with ',
        strong({}, 'Bulma'),
        '!',
      ),
    ),
  ),
  // img({ src: MePic, width: 64, height: 64 }),
  // h1({ className: 'title' }, 'Kurt Lippert'),
  // p(
  //   { className: 'subtitle' },
  //   'My first website with ',
  //   strong({}, 'Bulma'),
  //   '!',
  // ),
);

const leftContent = div(
  { className: 'content' },
  h2({ className: 'title' }, 'What is Lorem Ipsum?'),
  p(
    {},
    `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  ),
);

const rightContent = frag;

/**
 * This is the variable that will hold
 */
const content = fragment(header, hr(), leftContent);

render(root(content), document.querySelector('main'));
