class CardList {
  constructor(container, card, api, userInfo) {
    this.card = card;
    this.container = container;
    this.api = api;
    this.userInfo = userInfo;
    container.addEventListener('click', this.eventHandler.bind(this));
  }

  addCard(card) {
    const element = this.card.create(card);
    this.container.appendChild(element);
  }

  render(initCards) {
     for (const element of initCards) {
      this.addCard(element);
    }
  }


  eventHandler(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      this.card.like(event);
    } else if (event.target.classList.contains('place-card__delete-icon')) {
      this.card.remove(event);
    } else if (event.target.classList.contains('place-card__image')) {
      this.popup.open(event.target.style.backgroundImage.slice(5, -2));
    }
  }
}
