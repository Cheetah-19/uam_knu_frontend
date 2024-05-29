import React, { useState, useRef } from 'react';
import anime from 'animejs';
import vertiport from "../assets/Vertiport.jpg";
import person from "../assets/person.png";

function Result() {
  const [peopleCount, setPeopleCount] = useState(0); // 사람 수를 상태로 관리
  const peopleRefs = useRef([]); // 여러 사람 이미지에 대한 참조를 배열로 관리

  // 폼 제출 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지
    setPeopleCount(event.target.elements.peopleCount.value); // 입력받은 사람 수를 상태로 설정
  };

  // 사람 이미지를 움직이기 위한 함수
  const movePerson = (index) => {
    if (peopleRefs.current[index]) {
      anime({
        targets: peopleRefs.current[index],
        translateX: 10,
        translateY: 25,
        easing: 'easeInOutQuad',
        duration: 2000
      });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>

      <img src={vertiport} alt="Vertiport" style={{ width: '60%', height: '80%', position: 'absolute', left: 0, top: 0 }} />

      {Array.from({ length: peopleCount }, (_, index) => (
        <img
          key={index}
          ref={el => peopleRefs.current[index] = el}
          src={person}
          style={{
            position: 'absolute',
            width: '50px',
            height: '50px',
            top: 100 + index * 45, // 사람 이미지 간격 조정
            left: 0,
          }}
          alt="Person"
          onLoad={() => movePerson(index)} // 이미지가 로드되면 해당 사람을 움직임
        />
      ))}
    </div>
  );
}

export default Result;
