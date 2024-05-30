import React from 'react';
import vertiport from "../assets/Vertiport.jpg";
import '../styles/Result.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function Result() {
    const zones = [
      { id: 'waitingArea', label: '대합실', top: 20, left: 20, width: 222, height: 600 },
      { id: 'gate', label: 'GATE', top: 20, left: 257, width: 222, height: 600 },
      { id: 'pathIn', label: 'Path_in', top: 135, left: 478, width: 475, height: 144},
      { id: 'pathOut', label: 'Path_out', top: 360, left: 478, width: 475, height: 144 },
      { id: 'fato', label: 'Fato', top: 20, left: 952, width: 222, height: 600 },
    ];

    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '500px' }}>
        <img src={vertiport} alt="Vertiport" className="vertiport" />
        {zones.map(zone => (
          <div
            key={zone.id}
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
          <Button variant="primary">현재 상황 보기</Button>
          <Button variant="secondary">최적화 후 상황 보기</Button>
        </div>
      </div>
    );
}

export default Result;
