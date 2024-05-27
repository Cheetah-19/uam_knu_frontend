import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const DraggableComponent = ({ name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // 이모지를 type에 따라 매핑
  const emoji = type === ItemTypes.AIRPLANE ? '✈️' : '👤';

  return (
    <div ref={drag} style={{ ...style, opacity: isDragging ? 0.5 : 1 }}>
      {emoji} {name}
    </div>
  );
};

export default DraggableComponent;
