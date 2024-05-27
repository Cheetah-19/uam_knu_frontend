import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
  height: '12rem',
  width: '20%',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  border: '1px solid black',
};

const getEmojiByType = (type) => {
  switch (type) {
    case ItemTypes.AIRPLANE:
      return '✈️';
    case ItemTypes.PERSON:
      return '👤';
    default:
      return '❓';
  }
};

const DropArea = ({ name, onDrop, droppedItems }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.AIRPLANE, ItemTypes.PERSON],
    drop: (item) => {
      onDrop(item, name);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#f2f2f2';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      <p>{name}</p>
      <ul>
        {droppedItems.map((item, index) => (
          <li key={index}>
            {getEmojiByType(item.type)} {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropArea;
