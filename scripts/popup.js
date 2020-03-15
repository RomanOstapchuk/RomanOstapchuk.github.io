class Popup {
  constructor(popup) {
    this.popup = popup;
    this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
  }

  // Можно лучше -- заменить этот метод одним? котры будет делать toggle для стиля popup_is-opened
  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}

class PopupImg extends Popup {
  open(src) {
    this.popup.querySelector('.popup-img__image').src = src;
    super.open();
  }
}

class PopupWithForm extends Popup {
  constructor(popup) {
    super(popup);
    this.form = this.popup.querySelector('form')
    this.form.addEventListener('submit', this.onSubmit.bind(this))
  }

  onSubmit(event) {
    event.preventDefault();
    this.close();
  }
}

class PopupAddCard extends PopupWithForm {
  constructor(popup, cardList) {
    super(popup);
    this.cardList = cardList;
  }

  onSubmit(event) {
    super.onSubmit(event);
    const name = event.target.querySelector('.popup__input_type_name').value;
    const link = event.target.querySelector('.popup__input_type_link-url').value;
    this.cardList.addCard(name, link);

  }

  open() {
    super.open();
    this.form.reset();
  }
}

class PopupEditCard extends PopupWithForm {
  constructor(popup, userInfo, api) {
    super(popup);
    this.userInfo = userInfo;
    this.api = api;
    this.userNameInput = popup.querySelector('.popup-edit__input_type_name');
    this.userJob = popup.querySelector('.popup-edit__input_type_info');


  }

  open() {
    super.open();
    this.userInfo.inputUserInfo();
  }

  onSubmit(event) {
    // Вы вызываете метод родительского класса, но он первым делом ЗАКРЫВАЕТ ОКНО не дожидаясь результата
    // т.е. вся наша красивая логика внизу уже без толку. Вызов надо убрать.
    //super.onSubmit(event); Оставил закомментированый метод для наглядности исправления ошибки
    // event.preventDefault() -- а вот это не забыть добавить
    
    const name = this.userNameInput.value;
    const about = this.userJob.value;
    event.preventDefault();
    this.userInfo.updateUserInfo(name, about)
      .then(() => {
        this.close();
      })
      .catch((err) => {
        alert('Данные не сохранены');
      })
  }
}

