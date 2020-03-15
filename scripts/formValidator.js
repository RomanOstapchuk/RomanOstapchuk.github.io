class FormValidator {
    constructor(popup) {
        this.form = popup.querySelector('form');
        this.button = this.form.querySelector('.button');
        this.form.addEventListener('input', this.checkInputValidity.bind(this));
        this.form.addEventListener('input', this.setSubmitButtonState.bind(this));
        this.ERROR_MESSAGES = {
            valueMissing: 'Это обязательное поле',
            tooShort: 'Должно быть от 2 до 30 символов',
            tooLong: 'Должно быть от 2 до 30 символов',
            typeMismatch: 'Здесь должна быть ссылка',
            noError: ''
        }
        this.setSubmitButtonState();
    }

    checkInputValidity(event) {
        if (event.target.validity.valueMissing) {
            return event.target.nextElementSibling.textContent = this.ERROR_MESSAGES.valueMissing;
        }

        if (event.target.validity.tooShort) {
            return event.target.nextElementSibling.textContent = this.ERROR_MESSAGES.tooShort;
        }

        if (event.target.validity.tooLong) {
            return event.target.nextElementSibling.textContent = this.ERROR_MESSAGES.tooLong;
        }

        if (event.target.validity.typeMismatch) {
            return event.target.nextElementSibling.textContent = this.ERROR_MESSAGES.typeMismatch;
        }

        event.target.nextElementSibling.textContent = this.ERROR_MESSAGES.noError;

    }

    setSubmitButtonState() {
        if (this.form.checkValidity()) {
            this.button.classList.add("popup__button_color");
        } else {
            this.button.classList.remove("popup__button_color");
        } 

    }
    
}
