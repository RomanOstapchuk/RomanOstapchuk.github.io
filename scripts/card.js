class Card {   
    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
        placesList.removeChild(event.target.closest('.place-card'));
    }

    create(card) {
        const placeCard = document.createElement('div');
        const placeCardImage = document.createElement('div');
        const placeCardDeleteIcon = document.createElement('button');
        const placeCardDescription = document.createElement('div');
        const placeCardName = document.createElement('h3');
        const placeCardLikeIcon = document.createElement('button');

        placeCard.classList.add('place-card');
        placeCardImage.classList.add('place-card__image');
        placeCardDeleteIcon.classList.add('place-card__delete-icon');
        placeCardDescription.classList.add('place-card__description');
        placeCardName.classList.add('place-card__name');
        placeCardLikeIcon.classList.add('place-card__like-icon');

        placeCard.appendChild(placeCardImage);
        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardLikeIcon);
        placeCardImage.appendChild(placeCardDeleteIcon);

        placeCardImage.setAttribute('style', `background-image: url(${card.link})`);
        placeCardName.textContent = card.name;

        return placeCard;
    }
}

