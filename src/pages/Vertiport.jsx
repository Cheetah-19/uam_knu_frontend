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
    대합실: [],
    GATE: [],
    path_in: [],
    path_out: [],
    FATO: []
  });

  const handleDrop = (item, boxName) => {
    const newItems = [];

    if (boxName === "대합실" && item.type === ItemTypes.PERSON) {
      newItems.push(...Array.from({ length: item.quantity }, () => ({ 
        ...item, 
        id: uuidv4()
      })));
    } else if (["GATE", "path_in", "path_out", "FATO"].includes(boxName) && item.type === ItemTypes.AIRPLANE) {
      newItems.push(...Array.from({ length: item.quantity }, () => ({ 
        ...item, 
        id: uuidv4()
      })));
      newItems.push(...Array.from({ length: item.quantity * 4 }, () => ({ 
        type: ItemTypes.PERSON, 
        name: "Person", 
        id: uuidv4()
      })));
    } else {
      console.log(`Invalid drop: ${item.type} cannot be dropped in ${boxName}`);
      return;
    }

    const newContents = {
      ...boxContents,
      [boxName]: [...boxContents[boxName], ...newItems],
    };
    setBoxContents(newContents);

    console.log(`Dropped ${item.quantity} ${item.type}(s) in ${boxName}`);
  };

  const handleSendStatus = () => {
    const status = Object.keys(boxContents).map((boxName) => {
      const items = boxContents[boxName];
      const itemCounts = items.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});

      return {
        boxName,
        airplanes: itemCounts[ItemTypes.AIRPLANE] || 0,
        persons: itemCounts[ItemTypes.PERSON] || 0,
      };
    });

    console.log('박스 현황:');
    status.forEach(box => {
      console.log(`${box.boxName} - 비행기: ${box.airplanes}, 사람: ${box.persons}`);
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
            </div>
          ))}
        </div>
        <button onClick={handleSendStatus}>전송</button>
      </div>
    </DndProvider>
  );
};

export default Vertiport;
