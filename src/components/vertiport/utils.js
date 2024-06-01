import { ItemTypes } from './ItemTypes';

export const getEmojiByType = (type) => {
  switch (type) {
    case ItemTypes.AIRPLANE:
      return '✈️';
    case ItemTypes.PERSON:
      return '👤';
    default:
      return '❓';
  }
};