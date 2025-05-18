function showError(input, errorMessage, errorMessageHolder) {
    input.classList.add('form__input_type_error');
    errorMessageHolder.textContent = errorMessage;
}

function hideError(input, errorMessageHolder) {
    input.classList.remove('form__input_type_error');
    errorMessageHolder.textContent = '';
}

function disableButton(button) {
    button.disabled = true;
}

function enableButton(button) {
    button.disabled = false;
}

export function refreshButtonState(button, validationDataHolders) {
    const allValid = validationDataHolders.every((validationDataHolder) => {
        return validationDataHolder.input.validity.valid;
    });
    if (allValid) {
        enableButton(button)
    } else {
        disableButton(button)
    }
}

function setValidationListener(validationDataHolder, inputHolderArray) {
    const input = validationDataHolder.input;
    const errorMessageHolder = validationDataHolder.errorMessageHolder;
    const submitButton = validationDataHolder.lockedButton;
    const regexp = validationDataHolder.regexp;
    const regexpErrorMessage = validationDataHolder.regexpErrorMessage;
    input.addEventListener('input', () => {
        const showCustom = regexp && !regexp.test(input.value);
        if (showCustom) {
            input.setCustomValidity(regexpErrorMessage);
        } else {
            input.setCustomValidity('');
        }
        if (!input.validity.valid) {
            showError(input, input.validationMessage, errorMessageHolder);
            disableButton(submitButton);
        } else {
            hideError(input, errorMessageHolder);
            refreshButtonState(submitButton, inputHolderArray);
        }
    })
}

export function hideErrors(validationDataHolders, lockedButton) {
    validationDataHolders.forEach((validationDataHolder) => {
        hideError(validationDataHolder.input, validationDataHolder.errorMessageHolder);
    });
    enableButton(lockedButton);
}

export function setValidationListeners(validationDataHolders) {
    validationDataHolders.forEach((validationDataHolder) => {
        setValidationListener(validationDataHolder, validationDataHolders);
    })
}