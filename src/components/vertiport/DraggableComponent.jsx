import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmojiByType } from './utils';
import { Form, InputGroup } from 'react-bootstrap';
import '../../styles/DraggableComponent.css';

const DraggableComponent = ({ name, type }) => {
  const [quantity, setQuantity] = useState(1);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name, type, quantity },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [quantity]);

  const emoji = getEmojiByType(type);

  return (
    <div ref={drag} className={`draggableComponent ${isDragging ? "dragging" : ""}`}>
      <InputGroup>
        <InputGroup.Text>{emoji} {name}</InputGroup.Text>
        <Form.Control
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
        />
      </InputGroup>
    </div>
  );
};

export default DraggableComponent;