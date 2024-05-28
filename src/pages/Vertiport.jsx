import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableComponent from '../components/vertiport/DraggableComponent';
import DropArea from '../components/vertiport/DropArea';
import { ItemTypes } from '../components/vertiport/ItemTypes';
import { v4 as uuidv4 } from 'uuid';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <Container>
        <Row className="my-4">
          <Col>
            <h1 className="text-center">Vertiport Resource Customizing Page</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Header>추가 가능한 리소스</Card.Header>
              <Card.Body>
                <DraggableComponent name="Airplane" type={ItemTypes.AIRPLANE} />
                <DraggableComponent name="Person" type={ItemTypes.PERSON} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {Object.keys(boxContents).map((boxName) => (
            <Col key={boxName} md={6} className="mb-4">
              <Card>
                <Card.Header>{boxName}</Card.Header>
                <Card.Body>
                  <DropArea
                    name={boxName}
                    onDrop={handleDrop}
                    droppedItems={boxContents[boxName]}
                  />
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <Button onClick={handleSendStatus} variant="primary">전송</Button>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default Vertiport;
