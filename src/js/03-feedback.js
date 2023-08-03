import throttle from 'lodash.throttle';
import '../css/common.css';
import '../css/03-feedback.css';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form'); //получаем доступ к форме по классу
form.addEventListener('input', throttle(onFormData, 500)); //вешаем обработчик событий на инпут (на оба поля формы) и для ф-ции делаем ограничение частоты ее выполнения
form.addEventListener('submit', onSubmitForm); //вешаем обработчик событий на кнопку с типом сабмит и в колл-бек записываем функцию onSubmitForm

dataFromLocalStorage();

function onFormData(evt) {//ф-ция, которая вызывается при инпуте
  const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; //распарсиваем полученные данные из ключа и записываем эти данные в formData
  formData[evt.target.name] = evt.target.value; //динамически обновляем значения введенных данных в поле email и message
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); //задаем ключу значение полученным из форм-дата после метода stringify
}

function onSubmitForm(evt) {
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}); //получаем значение хранилища по ключу, потом парсим его в вадидный джс и выводим в консоль
  evt.preventDefault();
  evt.currentTarget.reset(); //сбрасываем данные формы до значений по умолчанию (очищаем поля)
  localStorage.removeItem(STORAGE_KEY); //удаляем данные из локального хранилища(после сабмита они там не нужны)
}

function dataFromLocalStorage() {
  //ф-ция для восстановления данных в полях формы при перезагрузке страницы
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY)); //получаем значение хранилища по ключу, потом парсим его в вадидный джс и присваиваем переменной
  const email = document.querySelector('.feedback-form input'); //получаем доступ к значению, которое записано в инпут мейл
  const message = document.querySelector('.feedback-form textarea'); //получаем доступ к значению, которое записано в тексареа
  if (savedMessage) {
    //проверяем, если savedMessage true - записываем в email.value и message.value значения, если false - пустую строку
    email.value = savedMessage.email || ''; //присваивание в значение
    message.value = savedMessage.message || ''; //присваивание в значение
  }
}
