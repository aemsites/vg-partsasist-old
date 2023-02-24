const idGenerator = () => {
  let id = 0;

  return () => ++id;
}

const getId = idGenerator();

let activeItemId = null;

export default function decorate(block) {
  block.querySelectorAll('div.accordions div div').forEach((el) => {
    const header = el.querySelector('h1, h2, h3, h4, h5, h6');
    const panel = el.querySelector('h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p');
    const parentEl = header.parentElement;

    // wrap the content of header into button
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('accordion-button');
    buttonEl.setAttribute('aria-expanded', 'false');
    buttonEl.setAttribute('aria-controls', 'collapseOne');

    const textEl = document.createElement('div');
    textEl.classList.add('panel-text');
    textEl.innerHTML = header.innerHTML;

    const iconEl = document.createElement('div');
    iconEl.classList.add('accordion-icon');

    buttonEl.appendChild(iconEl);
    buttonEl.appendChild(textEl);
    header.innerHTML = '';
    header.classList.add('accordion-header');
    header.appendChild(buttonEl);

    panel.classList.add('accordion-panel', 'accordion-panel--hidden');

    header.id = `accordion-${getId()}`;
    parentEl.classList.add('accordion-wrapper', 'accordion--collapsed');

    header.addEventListener('click', () => {
      const headerHeight = header.getBoundingClientRect().height;
      let parentElHeight = headerHeight;

      panel.classList.remove('accordion-panel--hidden');
      parentEl.classList.toggle('accordion--collapsed');

      // closing previously selected accordion
      if (activeItemId && activeItemId !== header.id) {
        document.querySelector(`#${activeItemId}`).click();
      }

      if (!parentEl.classList.contains('accordion--collapsed')) {
        const panelHeight = panel.getBoundingClientRect().height;

        parentElHeight = headerHeight + panelHeight;
        parentEl.setAttribute('style', `height: ${headerHeight + panelHeight}px`);
        activeItemId = header.id;
      } else {
        activeItemId = null;
      }

      parentEl.setAttribute('style', `height: ${parentElHeight}px`);
    });

    setTimeout(() => {
      const headerHeight = header.getBoundingClientRect().height;

      panel.classList.remove('accordion-panel--hidden');

      parentEl.setAttribute('style', `height: ${headerHeight}px`);
    }, 0);
  });
}
