

const form = document.querySelector('[data-js-order-form]')

const inputList = Array.form(form.querySelectorAll('.order__form-input'))
const buttonElement = form.querySelector('[data-js-order-button]') 
const formErrorElement = form.querySelector('.form__empty-error')




function toggleErrorSpan(inputElement, errorMessage) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);

  if(errorMessage){
    inputElement.classList.add('form-input-error')
    errorElement.textContent = errorMessage
    errorElement.classList.add('form-error-active')
  } else {
    inputElement.classList.remove('form-input-error')
    errorElement.textContent = ''
    errorElement.classList.remove('form-error-active')
  }
  
}


function toggleButton() {
  if(hasInvalidInput){
    buttonElement.classList.add('button-inactive')
    buttonElement.setAttribute('aria-disabled', true)
  } else {
    buttonElement.classList.remove('button-inactive')
    buttonElement.setAttribute('aria-disabled', false)
  }
}

function formError() {
  const errorMessage = 'Please fill out all fields';
  formErrorElement.textContent = errorMessage
}
function checkInputValidity(inputElement){
    if(inputElement.validity.patternMismatch){
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity(checkLengthMismatch(inputElement))
    }
}

function toggleinputError(inputElement){
  if(!inputElement.validity.valid){
    toggleErrorSpan(inputElement, inputElement.validationMessage)
  } else {
    toggleErrorSpan(inputElement)
  }
}

function checkLengthMismatch(inputElement){
  if(inputElement.type !== 'text') {
    return ''
  }

  const valueLength = inputElement.value.trim().length;

  if(valueLength < inputElement.minLength) {
    return `Миннимфльное количество символов: ${inputElement.minLength}`
  }

  return
  
}

function hasInvalidInput() {
  return (inputList.some((inputElement) => !inputElement.validity.valid))
}




function startValidation() {

  toggleButton()

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    if(hasInvalidInput()){
      formError()
      inputList.forEach(inputElement => {
        checkInputValidity(inputElement)
        toggleinputError(inputElement)
      });
    }
  })

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement)
      toggleButton()
    })

    inputElement.addEventListener('blur', () => {
      toggleinputError(inputElement)
    })

    inputElement.addEventListener('focus', () => {
      toggleErrorSpan(inputElement)
    })
  })
}