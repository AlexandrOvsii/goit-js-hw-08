import throttle from 'lodash.throttle';
import '../css/common.css'
import '../css/03-feedback.css'

const STORAGE_KEY = 'feedback-form-state';

const formData = {}; //задаем переменную для последующего хранения данных

const form = document.querySelector('.feedback-form'); //получаем доступ к форме
form.addEventListener('input', throttle(onFormData, 500)); //вешаем обработчик событий на инпут и для ф-ции делаем ограничение частоты ее выполнения
form.addEventListener('submit', onSubmitForm)

dataFromLocalStorage();

function onFormData(evt){ //ф-ция, которая вызывается при инпуте
    formData[evt.target.name] = evt.target.value;//динамически присваиваем значение введенных данных в поле мейл и месседж
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData)) //задаем ключу значение полученным из форм-дата после метода stringify
}

function onSubmitForm(evt){
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}); //получаем значение хранилища по ключу, потом парсим его в вадидный джс и выводим в консоль
    evt.preventDefault(); 
    evt.currentTarget.reset(); //сбрасываем данные
    localStorage.removeItem(STORAGE_KEY); //удаляем из хранилища
}

function dataFromLocalStorage() { //ф-ция для восстановления данных в полях формы при перезагрузке страницы
    const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY)); //получаем значение хранилища по ключу, потом парсим его в вадидный джс и присваиваем переменной
    const email = document.querySelector('.feedback-form input'); //получаем доступ к значению, которое записано в инпут мейл
    const message = document.querySelector('.feedback-form textarea');//получаем доступ к значению, которое записано в тексареа
      if(savedMessage){
        if(savedMessage.email){ //делаем проверку, есть ли в дате свойство email
          email.value = savedMessage.email; //присваивание в значение 
        }
        if(savedMessage.message){//делаем проверку, есть ли в дате свойство message
          message.value = savedMessage.message; //присваивание в значение 
        }
      }
  }






