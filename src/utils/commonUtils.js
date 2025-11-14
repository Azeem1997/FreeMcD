/**
 * Creates a debounced version of a function
 * 
 * Delays function execution and cancels previous calls if made within the delay period.
 * Useful for optimizing performance on frequently called functions like search or input handlers.
 * 
 * @function
 * @param {Function} func - The function to debounce
 * @param {number} [delay=500] - Debounce delay in milliseconds
 * @returns {Function} A debounced version of the input function
 * @example
 */
export const debounce = (func, delay = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};