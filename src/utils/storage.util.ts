export const getFromStorage = (key: string): string => {
  const storageAtKey = localStorage.getItem(key);
  if(storageAtKey !== null) {
    return storageAtKey;
  }
  return '';
}
