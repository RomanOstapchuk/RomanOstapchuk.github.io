Добрый день! Код читается хорошо, все достаточно неплохо структурировано, даже наследование классов используется,
супер! Карточки загружаюстя с сервера, данные о пользователе и аватаре тоже, изменение данных пользователя на
сервере реализовано.

К сожалению сейчас скрипт ведет себя не совсем так как должен, а класс Api выполняет чужой функционал.
Также не совсем корректно обрабатываются ошибки Api на стороне клиента.


Надо исправить
--------------

(+)Удалите моковые данные пользователя из index.html

(+)При первом редактировании данных пользователя форма показывает в инпутах моковые данные, не актуальные.

(+)Класс Api отвечает за коммуникацию с сервером. Он не должен сам менять данные на странице и
выполнять какую-то другую логику. Это интерфейс, который получает запрос, передает его, получает
ответ, обрабатывает ответ и возвращает его клиенту. Сейчас ваша реализация Api делает больше чем должна,
а это не позволит классу быть самодостаточным, переносимым, чтобы его можно было забрать в другой
проект и он продолжил работать. Уберите лишний функциоанл из Api.

(+)Вы все еще подключаете ненужный initialCards.js в index.html

(+)После изменения данных о пользователе, страница не отрисовывает актуальные данные, они остаются старыми.

(+)Хардкод токена и URL в Api -- эти данные следует в класс передать как параметры конструктора, если завтра вам токен новый дадут, потом будете во всех методах менять, нудное дело.

(+)Нельзя менять данные на странице до того как сервер вернул ответ.
Сначала надо убедиться, что сервер вернул положительный результат, потом менять DOM.
То же самое касается и окон попапов -- после сабмита формы сначала опрашиваем сервер,
получаем подтверждение операции и только потом попап закрываем и вносим изменения в DOM.

Прежде чем вносить изменения в DOM обязательно убедитесь, что опреация на сервере прошла успешно,
иначе пользователь будет думать что он, например, профиль обновил, но на самом деле вы ему только
на старнице данные обновили (именно это сейчас и происходит при отключении от сети).

(+)Протестируйте при выключенном интернете, в консоль должны прилетать
только те сообщения об ошибках, которые вы сами выводите, не должно быть ошибки
скрипта из-за неопределенной переменной. 

Допустим у вас есть метод Api:

someApiMethod() {
  return fetch(...)
          .then(...)
          .catch(...)
}

catch тоже должен либо пробрасывать ошибку через throw, либо возвращать промис с ошибкой,
потому что в месте вызова someApiMethod тоже нужно обработчик ошибок сделать. У Api свой есть,
но фронтенд должен на ошибки сервера адекватно реагировать когда методы Api вызывает:

api.someApiMethod()
  .then(... что-то рисуем, меняем, закрываем)
  .catch(... ничего не меняем, не закрываем, сообщаем об ошибке)

(+)Класс UserInfo нуждается в рефакторинге потому что сейчас он в роли такого контейнера с парой переменных,
а он как раз должен запрашивать данные с сервера для отображения на странице, отображать эти данные и быть
хранилищем акуальных данных о пользователе. Данные об аватаре хранить? кстати тоже должен он.

Можно лучше
-----------

Очень хорошее правило 1 класс -- 1 файл. В классе попапа лучше разнести классы по файлам, даже если там 3 строки.
При модульном подходе это позволяет избежать путаницы. В popup.js классов прям слишком много.


Промежуточный итог
------------------

Требуется рефакторинг, обратите внимание как ведет себя скрипт в пограничных состояниях, без сети, или если ошибка пришла.
Помотрите как скрипт с пользователем взаимодействует, не закрывает ли попапы раньше времени, не меняет ли отрисовку страницы
до того как сервер сохранил данные. UserInfo требует доработки. Api надо от ненужных функций освободить. 
Пожалуйста, устраните критические замечания для получения зачета по работе.
