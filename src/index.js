import { fetchPixabay } from './fetchImages';
import { createMarkup } from './createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const guardEl = document.querySelector('.guard');

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionClass: 'caption',
  captionDelay: 250,
  scrollZoom: false,
});

let quiry = '';
let page = 1;

searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  page = 1;
  observer.unobserve(guardEl);
  quiry = searchForm.searchQuery.value.trim();
  galleryEl.innerHTML = '';
  if (e.currentTarget.elements.searchQuery.value === '') {
    Notify.failure('Enter query parameter');
    galleryEl.innerHTML = '';
    observer.unobserve(guardEl);
    return;
  }

  const response = await fetchPixabay(quiry, page);
  try {
    if (Math.ceil(response.totalHits > 0)) {
      observer.observe(guardEl);
      appendMarkup(response.hits);
      gallery.refresh();
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }
    if (response.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.log(error);
  }
}

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

function onLoad(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      fetchPixabay(quiry, page)
        .then(res => {
          appendMarkup(res.hits);
          gallery.refresh();
          if (page === Math.ceil(res.totalHits / 40)) {
            Notify.info(
              "We're sorry, but you've reached the end of search results."
            );
            observer.unobserve(guardEl);
          }
        })
        .catch(err => console.log(err));
    }
  });
}

function appendMarkup(array) {
  galleryEl.insertAdjacentHTML('beforeend', createMarkup(array));
}

export function handleError(status) {
  Notify.failure(`${status}`);
}
