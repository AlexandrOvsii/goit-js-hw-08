// Add imports above this line
import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const galleryEl = document.querySelector('.gallery'); //получаем доступ к классу gallery

const markup = galleryItems //создаем переменную "разметка" и через мар перебираем наш galleryItems создавая необходимые эл-ты на каждой итерации.
  .map(
    item => `
    <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
            <img 
                class="gallery__image" 
                src="${item.preview}" 
                alt="${item.description}"
            />
        </a>
    </li>`
  )
  .join(''); //объединяем все в одну строку

galleryEl.insertAdjacentHTML('afterbegin', markup); //добавляем в ХТМЛ

//==
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', //вносим изменения в свойства
  captionDelay: 250, //вносим изменения в свойства
});
