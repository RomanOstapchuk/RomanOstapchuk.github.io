const rootPage = document.querySelector('.root');
const placesList = rootPage.querySelector('.places-list');
const popupForm = rootPage.querySelector('.popup');
const popupEditButton = rootPage.querySelector('.popup-edit__button');
const form = rootPage.querySelector('.popup__form');
const formEdit = rootPage.querySelector('.popup-edit__form');
const popupFormEdit = rootPage.querySelector('.popup-edit');
const popupImgContainer = rootPage.querySelector('.popup-img');
const userInfoContainer = rootPage.querySelector('.user-info');
const userInfoName = rootPage.querySelector('.user-info__name');
const userInfoJob = rootPage.querySelector('.user-info__job');
const userInfoPhoto = rootPage.querySelector('.user-info__photo');

const addCardButton = rootPage.querySelector('.user-info__button');
const userInfoEditButton = rootPage.querySelector('.user-info__edit');
const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort8',
  headers: {
    authorization: '32349a2d-13f0-40c4-958a-8599f4405ab4',
    'Content-Type': 'application/json'
  }
});
const popupImg = new PopupImg(popupImgContainer);
const card = new Card();
const userInfo = new UserInfo(userInfoContainer, api);
const cardList = new CardList(placesList, card, api, userInfo);

// Отлично, интересное решение!

Promise.all([
  api.getInitialCards(),
  api.getUserInfo()
])
  .then(([initialCards, user]) => {
    userInfo.setUserInfo(user.name, user.about, user.avatar),
      cardList.render(initialCards)
  })

const formEditValidator = new FormValidator(popupFormEdit);
const popupInfoEdit = new PopupEditCard(popupFormEdit, userInfo, api);

const popupImgAdd = new PopupAddCard(popupForm, cardList);
addCardButton.addEventListener('click', popupImgAdd.open.bind(popupImgAdd));
userInfoEditButton.addEventListener('click', popupInfoEdit.open.bind(popupInfoEdit));

const formValidator = new FormValidator(popupForm);


