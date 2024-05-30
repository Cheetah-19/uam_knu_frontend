import React from 'react';
import vertiport from "../assets/Vertiport.jpg";
import '../styles/Result.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import anime from 'animejs';

function Result() {
    const zones = [
        { id: 'waitingArea', top: 0, left: 2, width: 227, height: 675 },
        { id: 'gate', top: 0, left: 249, width: 227, height: 675 },
        { id: 'pathIn', top: 135, left: 475, width: 500, height: 153 },
        { id: 'pathOut', top: 387, left: 475, width: 500, height: 153 },
        { id: 'fato', top: 0, left: 975, width: 224, height: 675 },
    ];

    const handleViewCurrentSituation = () => {
        createElements('waitingArea', 'person', 10);
        createElements('fato', 'plane', 4);
        createElements('pathIn', 'plane', 4);
        createElements('pathOut', 'plane', 2);
        createElements('gate', 'plane', 8);
    };

    const createElements = (zoneId, className, count) => {
        const zone = document.getElementById(zoneId);
        zone.innerHTML = ''; // 기존 요소들을 초기화

        const countElem = document.createElement('div');
        countElem.className = 'count';
        countElem.textContent = '0'; // 초기 텍스트는 0으로 설정
        zone.appendChild(countElem);

        for (let i = 0; i < count; i++) {
            const elem = document.createElement('div');
            elem.className = className;
            zone.appendChild(elem);
        }

        let animationSettings;
        if (zoneId === 'waitingArea' || zoneId === 'gate' || zoneId === 'fato') {
            // 대합실, Gate, Fato의 경우
            animationSettings = {
                targets: `#${zoneId} .${className}`,
                translateX: (el, i) => Math.floor(i / Math.floor(600 / 23)) * 40,
                translateY: (el, i) => (i % Math.floor(600 / 23)) * 23,
                scale: [0, 1],
                delay: anime.stagger(100),
                duration: 1000,
                easing: 'easeOutElastic(1, .8)'
            };
        } else if (zoneId === 'pathIn' || zoneId === 'pathOut') {
            // pathIn, pathOut의 경우
            animationSettings = {
                targets: `#${zoneId} .${className}`,
                translateX: (el, i) => (i % Math.floor(300 / 23)) * 23,
                translateY: (el, i) => Math.floor(i / Math.floor(300 / 23)) * 30,
                scale: [0, 1],
                delay: anime.stagger(100),
                duration: 1000,
                easing: 'easeOutElastic(1, .8)'
            };
        }

        anime(animationSettings);

        // 숫자 애니메이션 추가
        anime({
            targets: countElem,
            innerHTML: [0, count],
            round: 1, // 숫자를 정수로 반올림
            easing: 'easeInOutExpo',
            duration: 1000, // 숫자 애니메이션 지속 시간
        });
    };

    return (
        <div className="vertiport-container">
            <img src={vertiport} alt="Vertiport" className="vertiport" />
            {zones.map(zone => (
                <div
                    key={zone.id}
                    id={zone.id}
                    className="zone"
                    style={{
                        top: zone.top,
                        left: zone.left,
                        width: zone.width,
                        height: zone.height,
                    }}
                >
                    {zone.label}
                </div>
            ))}
            <div className="button-group">
                <Button variant="primary" onClick={handleViewCurrentSituation}>현재 상황 보기</Button>
                <Button variant="secondary">최적화 후 상황 보기</Button>
            </div>
        </div>
    );
}

export default Result;
