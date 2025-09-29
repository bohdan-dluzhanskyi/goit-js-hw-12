import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.getElementById('search-form'),
  input: document.getElementById('search-input'),
  loadMoreBtn: document.getElementById('load-more'),
  gallery: document.getElementById('gallery'),
  loader: document.getElementById('loader'),
};

let currentQuery = '';
let page = 1;
let totalHits = 0;

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();
  const q = refs.input.value.trim();

  if (!q) {
    iziToast.warning({ title: 'Увага', message: 'Введіть пошуковий запит' });
    return;
  }

  currentQuery = q;
  page = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, page);
    const { hits } = data;
    totalHits = data.totalHits || 0;

    if (!hits || hits.length === 0) {
      iziToast.info({ title: 'Результат', message: 'За вашим запитом нічого не знайдено' });
      return;
    }

    createGallery(hits, false);

    if (page * PER_PAGE < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      iziToast.info({ title: 'Кінець', message: "We're sorry, but you've reached the end of search results." });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ title: 'Помилка', message: 'Помилка запиту — перевірте консоль' });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;

  try {
    showLoader();
    refs.loadMoreBtn.disabled = true;

    const data = await getImagesByQuery(currentQuery, page);
    const { hits } = data;

    if (!hits || hits.length === 0) {
      hideLoadMoreButton();
      iziToast.info({ title: 'Кінець', message: "We're sorry, but you've reached the end of search results." });
      return;
    }

    createGallery(hits, true);

    const firstCard = refs.gallery.querySelector('.photo-card');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

    if (page * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({ title: 'Кінець', message: "We're sorry, but you've reached the end of search results." });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ title: 'Помилка', message: 'Помилка підвантаження' });
  } finally {
    refs.loadMoreBtn.disabled = false;
    hideLoader();
  }
}
