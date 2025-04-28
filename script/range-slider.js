const rangeSlider = document.querySelector('[data-js-range-slider]');
const rangeSliderInput = rangeSlider.querySelector(
  '[data-js-range-slider-input]'
);
const discountButtons = document.querySelectorAll('[data-js-button]');
const priceParagraph = document.querySelector('[data-js-range-slider-price]');
const rangeSliderButtons = rangeSlider.querySelectorAll(
  '[data-js-range-slider-button]'
);

if (rangeSlider) {
  const pricePerHour = 25;

  noUiSlider.create(rangeSliderInput, {
    start: [1],
    connect: 'upper',
    step: 1,
    range: {
      min: 1,
      max: 5,
    },
  });

  rangeSliderInput.noUiSlider.on('update', function (values) {
    const allButtons = [...discountButtons];
    const discountButton = allButtons.find((el) =>
      el.classList.contains('hookahs__item-button--active')
    );

    priceParagraph.textContent =
      '$ ' + Math.ceil(values) * pricePerHour * discountButton.dataset.jsButton;

    discountButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const allButtons = [...discountButtons];
        const discountButton = allButtons.find((el) =>
          el.classList.contains('hookahs__item-button--active')
        );
        priceParagraph.textContent =
          '$ ' +
          Math.ceil(values) * pricePerHour * discountButton.dataset.jsButton;
      });
    });
  });

  rangeSliderButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      rangeSliderInput.noUiSlider.set(Number(e.target.textContent));
    });
  });
}
