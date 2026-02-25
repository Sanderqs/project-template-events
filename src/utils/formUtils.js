/**
 * Returns a new state object after updating a field.
 * @param {object} prevState - The current form state
 * @param {string} field - Field name to update
 * @param {any} value - New value
 * @returns {object} Updated state
 */
export function updateFormField(prevState, field, value) {
  return {
    ...prevState,
    [field]: value,
  };
}

/**
 * Returns a new error object with the field cleared.
 * @param {object} prevErrors - Current errors
 * @param {string} field - Field name to clear
 * @returns {object} Updated errors
 */
export function clearFieldError(prevErrors, field) {
  return {
    ...prevErrors,
    [field]: undefined,
  };
}
