import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableComponent from '../components/vertiport/DraggableComponent';
import DropArea from '../components/vertiport/DropArea';
import { ItemTypes } from '../components/vertiport/ItemTypes';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Vertiport.css';

const Vertiport = () => {
  const [boxContents, setBoxContents] = useState({
    Box1: [],
    Box2: [],
    Box3: [],
    Box4: [],
  });

  const handleDrop = (item, boxName) => {
    const newItem = { ...item, id: uuidv4() }; // 아이템에 고유 ID 추가
    const newContents = {
      ...boxContents,
      [boxName]: [...boxContents[boxName], newItem],
    };
    setBoxContents(newContents);

    console.log(`Dropped ${item.type} in ${boxName}`);
  };

  const countItems = (items) => {
    const itemCounts = items.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});
  };

  const handleSendStatus = () => {
    const status = Object.keys(boxContents).map((boxName) => {
      const items = boxContents[boxName];
      const itemCounts = items.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});
  
      console.log('박스 현황:');
      status.forEach(box => {
        console.log(`${box.boxName} - 비행기: ${box.airplanes}, 사람: ${box.persons}`);
      });
    });
  };  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div className="dragComponents">
          <DraggableComponent name="Airplane" type={ItemTypes.AIRPLANE} />
          <DraggableComponent name="Person" type={ItemTypes.PERSON} />
        </div>
        <div className="dropAreas">
          {Object.keys(boxContents).map((boxName) => (
            <div key={boxName} className="dropAreaContainer">
              <DropArea
                name={boxName}
                onDrop={handleDrop}
                droppedItems={boxContents[boxName]}
              />
              <div>{countItems(boxContents[boxName])}</div>
            </div>
          ))}
        </div>
        <button onClick={handleSendStatus}>전송</button>
      </div>
    </DndProvider>
  );
};

export default Vertiport;
