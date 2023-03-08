import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

function hideModal(modalDiv) {
  modalDiv.remove('show-modal');
  // remove iframe to make sure the playback stops
  modalDiv.textContent = '';
}

function playVideo(evt, videoLink, modalDiv) {
  evt.preventDefault();

  // add video to modal div
  const videoIframe = document.createElement('iframe');
  videoIframe.setAttribute('width', '560');
  videoIframe.setAttribute('height', '315');
  videoIframe.setAttribute('loading', 'lazy');
  videoIframe.src = videoLink.href;
  videoIframe.setAttribute('allowfullscreen', '');

  modalDiv.addEventListener('click', () => hideModal(modalDiv));
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
    const videoModal = document.createElement('div');
    videoModal.classList.add('modal');
    videoLink.parentNode.append(videoModal);

    playIcon.onclick = (event) => playVideo(event, videoLink, videoModal);
    videoLink.onclick = (event) => playVideo(event, videoLink, videoModal);
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
