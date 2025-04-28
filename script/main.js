//-------------- Slider ---------------

new Swiper('.reviews__slider', {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 30,
  autoWidth: true,
  loop: false,

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },

    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 40,
    },

    1000: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 20,
    },
  },
});

//  ============ Order Buttons =================
const buttonsContent = [
  {
    value: 3,
    text: 'Good for parties up to 15 Served by 1 hookah attendants.',
  },
  {
    value: 5,
    text: 'Good for parties up to 30 Served by 2hookah attendants.',
  },
  {
    value: 7,
    text: 'Good for parties up to 45 Served by 3 hookah attendant.',
  },
  {
    value: 9,
    text: 'Good for parties up to 60 Served by 4 hookah attendants.',
  },
  {
    value: 15,
    text: 'Good for parties up to 75 Served by 5 hookah attendants.',
  },
];

const buttonsContainer = document.querySelector('[data-js-buttons]');

const fakeDiv = document.querySelector('[data-js-fake]');

const allButtons = Array.from(document.querySelectorAll('[data-js-button]'));

function clearClass(i) {
  allButtons.forEach((el, index) => {
    if (index !== i) {
      el.classList.remove('hookahs__item-button--active');
    }
  });
}

function updateText(key = 3) {
  const content = buttonsContent.find((el) => el.value === +key);
  fakeDiv.innerHTML = '';
  fakeDiv.innerHTML = content.text;
}

allButtons.forEach((el) => {
  el.addEventListener('click', (e, index) => {
    clearClass(index);
    e.target.classList.add('hookahs__item-button--active');
    updateText(e.target.dataset.jsButton);
  });
});

//  Manage order popup

const orderData = [
  {
    id: 1,
    imgSrc: './images/choose/1.jpg ',
    price: 75,
    title: '1 hookah',
    subtitle: '3 tobacco filled fruit heads',
  },
  {
    id: 2,
    imgSrc: './images/choose/2.jpg ',
    price: 120,
    title: '2 hookahs',
    subtitle: '+ 6 tobacco filled fruit heads',
  },
  {
    id: 3,
    imgSrc: './images/choose/3.jpg ',
    price: 160,
    title: '3 hookahs',
    subtitle: '9 tobacco filled fruit heads',
  },
];

const chooseButtons = document.querySelectorAll('[data-js-choose-button]');
const orderPopup = document.querySelector('[data-js-order-popup]');
const orderSubmitButton = orderPopup.querySelector('[data-js-order-button]');
const close = orderPopup.querySelector('[data-js-order-close]');
const closeAgree = orderPopup.querySelector('[data-js-order-close-agree]');
const closeOnMobile = orderPopup.querySelector('[data-js-order-close-mobile]');
const closeAgreeOnMobile = document.querySelector('[data-js-order-close-agree-mobile]');
const chooseWrapper = document.querySelector('.choose-order__wrapper');
const detailsElement = document.querySelector('.order__form-details');
const agreePopup = document.querySelector('[data-js-order-popup-agree]');
const body = document.body;

function findCoords(el) {
  const top = window.pageYOffset + 'px';
  el.style.top = top;
  el.style.left = 0;
  console.log(top);
}

function closePopup() {
  orderPopup.addEventListener('click', (e) => {
    if (e.target === close || !e.target.closest('.choose-order__inner')) {
      body.classList.remove('is-lock');
      orderPopup.classList.add('visually-hidden');
      orderPopup.classList.remove('is-open')
      detailsElement.removeAttribute('open');

    }
    if (
      e.target === closeOnMobile ||
      !e.target.closest('.choose-order__inner')
    ) {
      body.classList.remove('is-lock');
      orderPopup.classList.add('visually-hidden');
      detailsElement.removeAttribute('open');


    }
  });

  orderSubmitButton.addEventListener('click', () => {
    onAgree();
  });
}

chooseButtons.forEach((chooseButton) => {
  chooseButton.addEventListener('click', (e) => {
    const popupContent = orderData.find(
      (obj) => obj.id === +e.target.dataset.jsChooseButton
    );

    const { imgSrc, title, price, subtitle } = popupContent;

    const orderTitle = document.querySelector('.order-card__title');
    const orderDesc = document.querySelector('.order-card__desc');
    const orderPrice = document.querySelector('.order-card__price');
    const orderImage = document.querySelector('[data-js-order-form-image]');

    const popupInner = document.querySelector('.choose-order__inner');
    findCoords(orderPopup);
    body.classList.add('is-lock');
    orderPopup.classList.remove('visually-hidden');

    if (orderTitle) {
      orderTitle.textContent = title;
      orderDesc.textContent = subtitle;
      orderPrice.textContent = `$${price}`;
      orderImage.src = imgSrc;
    }

    closePopup();
  });
});

function onAgree() {


  agreePopup.classList.remove('visually-hidden')
  findCoords(agreePopup)
  orderPopup.classList.add('visually-hidden')
  closeAgreePopup()
}

function closeAgreePopup () {
  agreePopup.addEventListener('click', (e) => {
    if (e.target === closeAgree || !e.target.closest('.order-agree__inner')) {
      body.classList.remove('is-lock');
      agreePopup.classList.add('visually-hidden');
      detailsElement.removeAttribute('open');
    }
    if (
      e.target === closeAgreeOnMobile ||
      !e.target.closest('.order-agree__inner')
    ) {
      body.classList.remove('is-lock');
      agreePopup.classList.add('visually-hidden');
      detailsElement.removeAttribute('open');
    }
  });

}
