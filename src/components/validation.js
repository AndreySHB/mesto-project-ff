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

export function toggleButtonState(button, validationDataHolders) {
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
    const pattern = validationDataHolder.pattern;
    const patternErrorMessage = input.dataset.errorMessage;
    input.addEventListener('input', () => {
        const showCustom = pattern && !pattern.test(input.value);
        if (showCustom) {
            input.setCustomValidity(patternErrorMessage);
        } else {
            input.setCustomValidity('');
        }
        if (!input.validity.valid) {
            showError(input, input.validationMessage, errorMessageHolder);
            disableButton(submitButton);
        } else {
            hideError(input, errorMessageHolder);
            toggleButtonState(submitButton, inputHolderArray);
        }
    })
}

export function clearValidation(validationDataHolders, lockedButton) {
    validationDataHolders.forEach((validationDataHolder) => {
        hideError(validationDataHolder.input, validationDataHolder.errorMessageHolder);
    });
    enableButton(lockedButton);
}

function setValidationListeners(validationDataHolders) {
    validationDataHolders.forEach((validationDataHolder) => {
        setValidationListener(validationDataHolder, validationDataHolders);
    })
}

export function enableValidation(validationDataHoldersArr) {
    validationDataHoldersArr.forEach(setValidationListeners);
}