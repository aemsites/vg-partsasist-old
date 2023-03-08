import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function hideModal(evt) {
  evt.target.classList.remove('show-modal');
  evt.target.textContent = '';
}

function playVideo(evt) {
  evt.preventDefault();

  const card = evt.target.closest('.cards-card-image');
  const modalDiv = card.querySelector('.modal');
  const videoLink = card.querySelector('a.video');
  modalDiv.addEventListener('click', hideModal);

  // create modal div with video
  const videoIframe = document.createElement('iframe');
  videoIframe.setAttribute('width', '560');
  videoIframe.setAttribute('height', '315');
  videoIframe.setAttribute('loading', 'lazy');
  videoIframe.src = videoLink.href;
  videoIframe.setAttribute('allowfullscreen', '');
  modalDiv.append(videoIframe);

  modalDiv.classList.add('show-modal');
}

function createVideoModals(cardList) {
  const videoAnchors = cardList.querySelectorAll('a');

  videoAnchors.forEach((videoLink) => {
    const picture = videoLink.closest('.cards-card-image').querySelector('picture');
    const parent = picture.parentNode;

    // the parent of the video link (<p>) is not needed any more
    videoLink.parentNode.remove();

    // wrap picture in link
    videoLink.textContent = '';
    videoLink.classList.add('video');
    videoLink.title = 'play video';
    videoLink.append(picture);
    parent.append(videoLink);

    // put the play icon over the image preview
    const playIcon = document.createElement('div');
    playIcon.setAttribute('data-toggle', 'modal');
    playIcon.classList.add('play', 'fade');
    videoLink.parentNode.append(playIcon);

    // create modal
    const videoNode = document.createElement('div');
    videoNode.classList.add('modal');
    videoLink.parentNode.append(videoNode);

    playIcon.onclick = (event) => playVideo(event);
    videoLink.onclick = (event) => playVideo(event);
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
