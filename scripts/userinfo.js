class UserInfo {
  constructor(container, name, about, avatar, api) {
    this.container = container;
    this.api = api;
    this.name = name;
    this.about = about;
    this.avatar = avatar;
  }

  setUserInfo(name, about, avatar) {
    this.name = name;
    this.about = about;
    this.avatar = avatar;
    this.userName = document.querySelector('.user-info__name');
    this.userInfo = document.querySelector('.user-info__job');
    this.userInfoPhoto = document.querySelector('.user-info__photo');
    this.userName.textContent = name;
    this.userInfo.textContent = about;
    //
    // this?
    //
    userInfoPhoto.setAttribute('style', `background-image: url(${avatar})`);
  }

  updateUserInfo(name, about) {
    // присваивать значения нужно находясь внутри then -- иначе данные внутри класса обновяться,
    // даже при ошибке
    
    //
    // this у api???
    //
    return api.sendUserInfo(name, about)
      .then(({name, about}) => {
        this.name = name;
        this.about = about;
        this.userName.textContent = name;
        this.userInfo.textContent = about;
      })
  }

  inputUserInfo() {
    //
    // this.name и this.about вроде как содержат текстовую информацию о юзере
    // сейчас вы их переопределяете как DOM элемент, зачем?
    // Переменные заведены с определенным смыслом и лучше эту смысловую нагрузку
    // не менять, этого никто не ожидает, кошка не может стать собакой, так и с переменными.
    // Если this.name и this.about в актуальном состоянии, то вам не нужна эта
    // мешанина из DOM, перепределения и прочего. Достаточно в методе 4 строки оставить.
    //
    // this.userNameInput = document.querySelector('.popup-edit__input_type_name');
    // this.userJob = document.querySelector('.popup-edit__input_type_info');
    // this.userNameInput.value = this.name;
    // this.userJob.value = this.about;
    //
    // А еще лучше this.userNameInput и this.userJob определить в setUserInfo одни раз,
    // а не каждый раз при вызове метода  итогда у вас вообще тут 2 строки останется
    //
    // Этот метод надо исправить
    this.userNameInput = document.querySelector('.popup-edit__input_type_name');
    this.userJob = document.querySelector('.popup-edit__input_type_info');
    this.userNameInput.value = this.name;
    this.userJob.value = this.about;
  }
}
