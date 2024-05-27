import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableComponent from '../components/vertiport/DraggableComponent';
import DropArea from '../components/vertiport/DropArea';
import { ItemTypes } from '../components/vertiport/ItemTypes';

const Vertiport = () => {
  const [boxContents, setBoxContents] = useState({
    Box1: [],
    Box2: [],
    Box3: []
  });

  const handleDrop = (item, boxName) => {
    const newContents = { ...boxContents, [boxName]: [...boxContents[boxName], item] };
    setBoxContents(newContents);
    console.log(`Dropped ${item.type} in ${boxName}`);
  };

  // 각 박스에 Airplane과 Person의 수를 계산하는 함수
  const countItems = (boxItems) => {
    const counts = { AIRPLANE: 0, PERSON: 0 };
    boxItems.forEach(item => {
      counts[item.type] += 1;
    });
    return `✈️: ${counts.AIRPLANE}, 👤: ${counts.PERSON}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <DraggableComponent name="Airplane" type={ItemTypes.AIRPLANE} />
        <DraggableComponent name="Person" type={ItemTypes.PERSON} />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {Object.keys(boxContents).map((boxName) => (
          <div key={boxName} style={{ float: 'left', margin: '1rem' }}>
            <DropArea 
              name={boxName} 
              onDrop={handleDrop} 
              droppedItems={boxContents[boxName]} 
            />
            <div>{countItems(boxContents[boxName])}</div>
          </div>
        ))}
      </div>
    </DndProvider>
  );
};

export default Vertiport;
