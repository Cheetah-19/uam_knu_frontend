import React from 'react';
import { useDrag } from 'react-dnd';
import { getEmojiByType } from './utils';
import '../../styles/DraggableComponent.css'; 

const DraggableComponent = ({ name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const emoji = getEmojiByType(type);

  return (
    <div ref={drag} className={`draggableComponent ${isDragging ? "dragging" : ""}`}>
      {emoji} {name}
    </div>
  );
};

export default DraggableComponent;
