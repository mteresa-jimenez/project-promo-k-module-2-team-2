'use strict';

// Optimized version

const formData = {
  name: {
    placeholder: 'Catrina de Guadalupe',
    property: 'innerHTML',
    prefix: '',
    remove: false,
  },
  job: {
    placeholder: 'Calavera Garbancera',
    property: 'innerHTML',
    prefix: '',
    remove: false,
  },
  phone: {
    placeholder: '1111111111',
    property: 'href',
    prefix: 'tel:',
    remove: false,
  },
  email: {
    placeholder: 'catrina.guadalupe@gmail.com',
    property: 'href',
    prefix: 'mailto:',
    remove: false,
  },
  linkedin: {
    placeholder: '/catrina-de-guadalupe',
    property: 'href',
    prefix: 'https://linkedin.es/in/',
    remove: true,
  },
  github: {
    placeholder: '@catrina-de-guadalupe',
    property: 'href',
    prefix: 'https://github.com/',
    remove: true,
  },
};

function fillCard() {
  for (let formDataElement in formData) {
    const input = document.querySelector(`.js-intro-${formDataElement}`);
    const inputId = input.id;
    let inputValue = input.value;
    const previewCardElement = document.querySelector(`.js-preview-${inputId}`);
    const previewCardElementProperty = formData[inputId].property;
    const previewCardElementPlaceholder = formData[inputId].placeholder;
    const previewCardElementPrefix = formData[inputId].prefix;
    const previewCardElementRemove = formData[inputId].remove;

    if (inputValue === '') {
      previewCardElement[
        previewCardElementProperty
      ] = previewCardElementPlaceholder;
    } else {
      if (previewCardElementRemove === true) {
        inputValue = inputValue.replace(previewCardElementPrefix, '');
        inputValue = inputValue.replace('@', '');
        inputValue = inputValue.replace('/', '');
      }
      previewCardElement[previewCardElementProperty] =
        previewCardElementPrefix + inputValue;
    }
  }
}
function setDataInLocalStorage() {
  for (let formDataElement in formData) {
    const input = document.querySelector(`.js-intro-${formDataElement}`);
    let inputValue = input.value;
    localStorage.setItem(formDataElement, JSON.stringify(inputValue));
  }
}
// console.log(localStorage);

function getDataFromLocalStorage() {
  // Form data
  for (let formDataElement in formData) {
    const savedData = JSON.parse(
      localStorage.getItem(formDataElement)
    );
    const input = document.querySelector(`.js-intro-${formDataElement}`);
    input.value = savedData;
  }

  // Color palette
  const savedColor = JSON.parse(localStorage.getItem('palette'));
  const palette = document.querySelector('.js-palette');
  palette.classList.add(`palette${savedColor}`);

  // Image
  const savedPhoto = localStorage.getItem('photo');
  const cardPhoto = document.querySelector('.js__profile-image');
  cardPhoto.style.backgroundImage = `url(${savedPhoto})`;
}

function updateCard() {
  fillCard();
  fillImage();
  paletteChange();
  setDataInLocalStorage();
}

for (let formDataElement in formData) {
  const inputClass = document.querySelector(`.js-intro-${formDataElement}`);
  inputClass.addEventListener('keyup', updateCard);
}

getDataFromLocalStorage();
updateCard();
