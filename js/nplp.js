function appendCSS (cssUrl) {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = cssUrl;

  document.head.appendChild(linkElement);
}

function addCssToHead (cssContent) {
  const styleElement = document.createElement('style');
  styleElement.textContent = cssContent;

  // Append the <style> element to the <head> of the document
  document.head.appendChild(styleElement);
}

addCssToHead(`
input[name="phone"] {
  width: 100%;
  height: 100%;
}
`);

let phoneLibLoaded = false;
let itis = []
let formKey = 0

function includeScriptFromCDN (cdnUrl) {
  const scriptElement = document.createElement('script');
  scriptElement.src = cdnUrl;

  scriptElement.onload = function () {
    phoneLibLoaded = true;
    initializePhoneInput();
  };

  document.body.appendChild(scriptElement);
}

appendCSS('https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/css/intlTelInput.css');
includeScriptFromCDN('https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/intlTelInput.min.js');

function initializePhoneInput () {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {

    form.setAttribute('adw-form-id', formKey)
    formKey += 1

    const nameInput = form.querySelector('input[name="name"]')

    nameInput.setAttribute('required', true)
    nameInput.setAttribute('pattern', '[a-zA-Z ]+')
    nameInput.setAttribute('title', 'Please enter a valid name')
    nameInput.setAttribute('autocomplete', 'name')
    nameInput.setAttribute('autocapitalize', 'words')
    nameInput.setAttribute('minlength', '2')

    const phoneInput = form.querySelector('input[name="phone"]')
    phoneInput.setAttribute('required', true)

    itis[form.getAttribute('adw-form-id')] = window.intlTelInput(phoneInput, {
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      nationalMode: true,
      separateDialCode: true,
      initialCountry: "auto",
      autoPlaceholder: "aggressive",
      geoIpLookup: function (callback) {
        fetch("https://ipapi.co/json")
          .then(function (res) { return res.json(); })
          .then(function (data) { callback(data.country_code); })
          .catch(function () { callback("us"); });
      }
    })

    console.log({ itis })

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const key = form.getAttribute('adw-form-id')
      const phoneInput = form.querySelector('input[name="phone"]')
      const nameInput = form.querySelector('input[name="name"]')
      const iti = itis[key]

      const number = iti.getNumber(intlTelInputUtils.numberFormat.E164).replace(/[^\d]/g, '');
      console.log({ number })

      var error = iti.getValidationError();
      console.log({ error })

      if (error !== 0) {
        console.error('Phone error. It is not valid');
        const validationError = {
          IS_POSSIBLE: 0,
          INVALID_COUNTRY_CODE: 1,
          TOO_SHORT: 2,
          TOO_LONG: 3,
          IS_POSSIBLE_LOCAL_ONLY: 4,
          INVALID_LENGTH: 5,
        };



        if (error === validationError.TOO_SHORT) {
          alert('Phone error. It is too short');
        } else if (error === validationError.TOO_LONG) {
          alert('Phone error. It is too long');
        } else if (error === validationError.INVALID_COUNTRY_CODE) {
          alert('Phone error. Invalid country code');
        } else if (error === validationError.INVALID_LENGTH) {
          alert('Phone error. Invalid length');
        }

        return false;
      }

      console.log('Phone is valid');
      phoneInput.value = number

      form.submit();
    })
  })
}



