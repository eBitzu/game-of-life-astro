import { STORAGE_KEY } from "../constants/storage.const";

export const getFromStorage = (key: string): string => {
  const storageAtKey = localStorage.getItem(key);
  if(storageAtKey !== null) {
    return storageAtKey;
  }
  return '';
}

export const loadLifeFromStorage = () => {
  const newLife = new Map();
  const storageLifeStringy = getFromStorage(STORAGE_KEY);
  storageLifeStringy.split(';').forEach(key => {
    newLife.set(key, true);
  })
  return newLife;
}
