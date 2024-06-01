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

        { id: 'result_waitingArea', top: 0, left: 2, width: 227, height: 675 },
        { id: 'result_gate', top: 0, left: 249, width: 227, height: 675 },
        { id: 'result_pathIn', top: 135, left: 475, width: 500, height: 153 },
        { id: 'result_pathOut', top: 387, left: 475, width: 500, height: 153 },
        { id: 'result_fato', top: 0, left: 975, width: 224, height: 675 },
    ];

        // 모든 zone의 id를 포함하는 배열
    const allZoneIds = zones.map(zone => zone.id);

    const clearAllZones = () => {
        // 모든 zone을 순회하며 내부 요소 초기화
        allZoneIds.forEach(zoneId => {
            const zone = document.getElementById(zoneId);
            if (zone) {
                zone.innerHTML = ''; // zone 내부를 초기화
            }
        });
    };

    const handleViewCurrentSituation = () => {
        clearAllZones(); // 현재 상황을 보기 전에 모든 zone 초기화
        // 현재 상황 설정 - 추후 백엔드에서 받아올 것
        createElements('waitingArea', 'person', 100);
        createElements('fato', 'plane', 100);
        createElements('pathIn', 'plane', 100);
        createElements('pathOut', 'plane', 100);
        createElements('gate', 'plane', 100);
    };

    const handleViewOptimizedSituation = () => {
        clearAllZones(); // 최적화 후 상황을 보기 전에 모든 zone 초기화
        // 최적화 후 상황 설정 - 추후 백엔드에서 받아올 것
        createElements('result_waitingArea', 'person', 50);
        createElements('result_fato', 'plane', 30);
        createElements('result_pathIn', 'plane', 40);
        createElements('result_pathOut', 'plane', 20);
        createElements('result_gate', 'plane', 10);
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
        if (zoneId === 'waitingArea' || zoneId === 'gate' || zoneId === 'fato' || zoneId === 'result_waitingArea' || zoneId === 'result_gate' || zoneId === 'result_fato') {
            animationSettings = {
                targets: `#${zoneId} .${className}`,
                translateX: (el, i) => -75 + Math.floor(i / Math.floor(600 / 23)) * 40,
                translateY: (el, i) => -315 + (i % Math.floor(600 / 23)) * 25.5,
                scale: [0, 1],
                delay: anime.stagger(100),
                duration: 1000,
                easing: 'easeOutElastic(1, .8)'
            };
        } else if (zoneId === 'pathIn' || zoneId === 'pathOut' || zoneId === 'result_pathIn' || zoneId === 'result_pathOut') {
            animationSettings = {
                targets: `#${zoneId} .${className}`,
                translateX: (el, i) => -230 + (i % Math.floor(500 / 23)) * 23,
                translateY: (el, i) => -50 + Math.floor(i / Math.floor(500 / 23)) * 30,
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
                <Button variant="secondary" onClick={handleViewOptimizedSituation}>최적화 후 상황 보기</Button>
            </div>
        </div>
    );
}

export default Result;
