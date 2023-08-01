import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form'); //получаем доступ к форме
form.addEventListener('input', throttle(onFormData, 500)); //вешаем обработчик событий на инпут и для ф-ции делаем ограничение частоты ее выполнения
form.addEventListener('submit', onSubmitForm)

const formData = {}; //задаем переменную для последующего хранения данных


function onFormData(evt){ //ф-ция, которая вызывается при инпуте
    formData[evt.target.name] = evt.target.value;//динамически присваиваем значение введенных данных в поле мейл и месседж
    localStorage.setItem("feedback-form-state", JSON.stringify(formData)) //задаем ключу значение полученным из форм-дата после метода stringify
}

function onSubmitForm(evt){
    console.log(JSON.parse(localStorage.getItem('feedback-form-state'))); //получаем значение хранилища по ключу, потом парсим его в вадидный джс и выводим в консоль
    evt.preventDefault(); 
    evt.currentTarget.reset(); //сбрасываем данные
    localStorage.removeItem("feedback-form-state"); //удаляем из хранилища
}

function dataFromLocalStorage() { //ф-ция для восстановления данных в полях формы при перезагрузке страницы
    const data = JSON.parse(localStorage.getItem('feedback-form-state')); //получаем значение хранилища по ключу, потом парсим его в вадидный джс и присваиваем переменной
    const email = document.querySelector('.feedback-form input'); //получаем доступ к значению, которое записано в инпут мейл
    const message = document.querySelector('.feedback-form textarea');//получаем доступ к значению, которое записано в тексареа
      if(data.email){ //делаем проверку, есть ли в дате свойство email
        email.value = data.email; //присваивание в значение 
      }
      if(data.message){//делаем проверку, есть ли в дате свойство message
        message.value = data.message; //присваивание в значение 
      }
  }

  dataFromLocalStorage();




