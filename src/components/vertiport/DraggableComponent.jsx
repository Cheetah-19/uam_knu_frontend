import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmojiByType } from './utils';
import '../../styles/DraggableComponent.css';

const DraggableComponent = ({ name, type }) => {
  const [quantity, setQuantity] = useState(1);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name, type, quantity }, // 수량 정보를 포함
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [quantity]); // quantity가 변경될 때마다 useDrag가 업데이트 되도록 의존성 배열에 추가

  const emoji = getEmojiByType(type);

  return (
    <div ref={drag} className={`draggableComponent ${isDragging ? "dragging" : ""}`}>
      {emoji} {name}
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

export default DraggableComponent;
