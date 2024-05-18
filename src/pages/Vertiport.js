import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Label, Tag, Text } from 'react-konva';
import vertiportImageSrc from '../assets/Vertiport.png';
import personImageSrc from '../assets/heechan.png';

const Vertiport = () => {
  const [vertiportImage, setVertiportImage] = useState(null);
  const [personImages, setPersonImages] = useState([]); // 이미지 배열 상태
  const [labels, setLabels] = useState([]); // 라벨 배열 상태

  useEffect(() => {
    const imgVertiport = new window.Image();
    imgVertiport.src = vertiportImageSrc;
    imgVertiport.onload = () => {
      setVertiportImage(imgVertiport);
    };
  }, []);

  // 이미지를 추가하는 함수
  const addImage = () => {
    const imgDraggable = new window.Image();
    imgDraggable.src = personImageSrc;
    imgDraggable.onload = () => {
      setPersonImages([...personImages, imgDraggable]); // 이미지 배열에 추가
    };
  };

  // 라벨을 추가하는 함수
  const addLabel = () => {
    setLabels([...labels, { x: 100, y: 100 + labels.length * 60, text: "Aircraft " + (labels.length + 1) }]); // 항공기 라벨 배열에 추가
  };

  return (
    <div>
      <button onClick={addImage}>+ 사람</button> {/* 사람 이미지 추가 버튼 */}
      <button onClick={addLabel}>+ 항공기</button> {/* 항공기 라벨 추가 버튼 */}
      <div>사람 수: {personImages.length}</div> {/* 사람 이미지 수 표시 */}
      <div>항공기 수: {labels.length}</div> {/* 항공기 라벨 대수 표시 */}
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {vertiportImage && (
            <KonvaImage image={vertiportImage} x={100} y={100} />
          )}
          {personImages.map((image, index) => (
            <KonvaImage
              key={index}
              image={image}
              x={200}
              y={200 + index * 60} // 이미지 위치 조정
              width={80} // 이미지 크기 조정
              height={100}
              draggable
            />
          ))}
          {labels.map((label, index) => (
            <Label
              key={index}
              x={label.x}
              y={label.y}
              draggable
            >
              <Tag
                fill="black"
                pointerDirection="down"
                pointerWidth={10}
                pointerHeight={10}
                lineJoin="round"
                shadowColor="black"
                shadowBlur={10}
                shadowOffsetX={10}
                shadowOffsetY={10}
                shadowOpacity={0.5}
              />
              <Text
                text={label.text}
                fontFamily="Calibri"
                fontSize={18}
                padding={5}
                fill="white"
              />
            </Label>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Vertiport;
