import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function hideModal(evt) {
  evt.target.classList.remove('show-modal');
  evt.target.textContent = '';
}

function playVideo(evt, videourl) {
  const videoNode = evt.target.parentNode.parentNode.querySelector('.modal');
  videoNode.addEventListener('click', hideModal);

  // create modal div with video
  const videoIframe = document.createElement('iframe');
  videoIframe.setAttribute('width', '560');
  videoIframe.setAttribute('height', '315');
  videoIframe.setAttribute('loading', 'lazy');
  videoIframe.src = videourl;
  videoIframe.setAttribute('allowfullscreen', '');
  videoNode.append(videoIframe);

  videoNode.classList.add('show-modal');
}
function createVideoModals(elm) {
  const anchors = elm.querySelectorAll('a');
  anchors.forEach((anc) => {
    // put the play icon over the image preview
    const play = document.createElement('div');
    play.setAttribute('data-toggle', 'modal');
    play.classList.add('play', 'fade');
    anc.parentNode.previousElementSibling.append(play);
    play.addEventListener('click', (event) => playVideo(event, anc.href));

    // create modal (iframe is populated later)
    const videoNode = document.createElement('div');
    videoNode.classList.add('modal');
    anc.parentNode.parentNode.append(videoNode);
    anc.parentNode.remove();
  });
}

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      if (div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach(
    (img) => img.closest('picture')
      .replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])),
  );
  block.textContent = '';
  createVideoModals(ul);
  block.append(ul);
}
