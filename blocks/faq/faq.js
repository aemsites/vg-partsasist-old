const idGenerator = () => {
  let id = 0;

  return () => ++id;
}

const getId = idGenerator();

let activeItemId = null;

export default function decorate(block) {
  block.querySelectorAll('div.faq div div').forEach((el) => {
    const question = el.querySelector('h1, h2, h3, h4, h5, h6');
    const answer = el.querySelector('h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p');
    const parentEl = question.parentElement;

    // wrap the content of question into button
    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('aria-expanded', 'false');
    buttonEl.setAttribute('aria-controls', 'collapseOne');

    const textEl = document.createElement('div');
    textEl.classList.add('question-text');
    textEl.innerHTML = question.innerHTML;

    const iconEl = document.createElement('div');
    iconEl.classList.add('faq-icon');

    buttonEl.appendChild(iconEl);
    buttonEl.appendChild(textEl);
    question.innerHTML = '';
    question.classList.add('question');
    question.appendChild(buttonEl);

    answer.classList.add('answer', 'answer--hidden');

    question.id = `question-${getId()}`;
    parentEl.classList.add('question-wrapper', 'question--collapsed');

    question.addEventListener('click', () => {
      const questionHeight = question.getBoundingClientRect().height;
      let parentElHeight = questionHeight;

      answer.classList.remove('answer--hidden');
      parentEl.classList.toggle('question--collapsed');

      // closing previously selected question
      if (activeItemId && activeItemId !== question.id) {
        document.querySelector(`#${activeItemId}`).click();
      }

      if (!parentEl.classList.contains('question--collapsed')) {
        const answerHeigh = answer.getBoundingClientRect().height;

        parentElHeight = questionHeight + answerHeigh;
        parentEl.setAttribute('style', `height: ${questionHeight + answerHeigh}px`);
        activeItemId = question.id;
      } else {
        activeItemId = null;
      }

      parentEl.setAttribute('style', `height: ${parentElHeight}px`);
    });

    setTimeout(() => {
      const questionHeight = question.getBoundingClientRect().height;

      answer.classList.remove('answer--hidden');

      parentEl.setAttribute('style', `height: ${questionHeight}px`);
    }, 0);
  });
}
