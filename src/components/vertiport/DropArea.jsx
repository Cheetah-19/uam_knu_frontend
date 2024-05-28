import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; 
import '../../styles/DropArea.css'; 

const DropArea = ({ name, onDrop, droppedItems }) => {
  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.AIRPLANE, ItemTypes.PERSON],
    drop: (item) => {
      onDrop(item, name); // 드롭된 후 부모 컴포넌트에 알림
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const isActive = isOver;

  return (
    <div ref={drop} className={`dropArea ${isActive ? "active" : ""}`}>
      <p>{name}</p>
      <p>Airplanes: {droppedItems.filter(item => item.type === ItemTypes.AIRPLANE).length}, Persons: {droppedItems.filter(item => item.type === ItemTypes.PERSON).length}</p>
    </div>
  );
};

export default DropArea;
