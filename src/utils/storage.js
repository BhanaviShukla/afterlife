export function setLocalStorage(key, value) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

export function getLocalStorage(key, initialValue) {
  try {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}
