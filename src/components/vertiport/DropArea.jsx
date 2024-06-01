import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import { Card } from 'react-bootstrap';
import '../../styles/DropArea.css';

const DropArea = ({ name, onDrop, droppedItems }) => {
  const [{ isOver }, drop] = useDrop({
    accept: [ItemTypes.AIRPLANE, ItemTypes.PERSON],
    drop: (item) => {
      onDrop(item, name);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const isActive = isOver;

  return (
    <Card ref={drop} className={`dropArea ${isActive ? "active" : ""}`}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <div className="statusContainer">
          <span className="statusItem">비행기: {droppedItems.filter(item => item.type === ItemTypes.AIRPLANE).length}</span>
          <span className="statusItem">사람: {droppedItems.filter(item => item.type === ItemTypes.PERSON).length}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DropArea;
