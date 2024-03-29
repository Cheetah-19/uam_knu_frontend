import React, { useCallback, useEffect, useRef } from "react";

function Home() {
  const mapRef = useRef(null);

  const initMap = useCallback(() => {
    new window.google.maps.Map(mapRef.current, {
      center: { lat: 35.8889, lng: 128.610 },
      zoom: 16,
    });
  }, [mapRef]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <div
      className="map"
      style={{ width: "100%", height: "100vh" }} // 화면을 꽉 채우는 스타일 적용
      ref={mapRef}
    ></div>
  );
}

export default Home;