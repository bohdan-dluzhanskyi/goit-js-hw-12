
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.getElementById('gallery');
const loaderEl = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more');


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images, append = true) {

  const markup = images
    .map(
      img => `
    <a class="gallery__item" href="${img.largeImageURL}">
      <div class="photo-card">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p><b>Likes:</b> ${img.likes}</p>
          <p><b>Views:</b> ${img.views}</p>
          <p><b>Comments:</b> ${img.comments}</p>
          <p><b>Downloads:</b> ${img.downloads}</p>
        </div>
      </div>
    </a>
  `
    )
    .join('');

  if (append) {
    galleryContainer.insertAdjacentHTML('beforeend', markup);
  } else {
    galleryContainer.innerHTML = markup;
  }

  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
  lightbox.refresh();
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
