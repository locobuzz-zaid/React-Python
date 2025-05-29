import React, { useState, useCallback, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  HeatmapLayer,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px", // adjust as needed
};

const options = {
  fullscreenControl: true,
  gestureHandling: "greedy",
  styles: [
    /* your dark theme JSON from before */
  ],
};

const gradient = [
  "rgba(0, 255, 255, 0)",
  "blue",
  "green",
  "green",
  "green",
  "green",
  "green",
  "green",
  "red",
  "red",
  "red",
  "red",
  "red",
  "red",
];

const GoogleHeatmap = ({
  data,
  trands,
  center = { lat: 20, lng: 77 },
  sentimentType,
  mapCount,
}) => {
  const mapRef = useRef();
  const [isMapReady, setIsMapReady] = useState(false);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    setIsMapReady(true);
    // console.log("Map loaded");
  }, []);

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDGqipm4Lsoq2WkGQDoH1_Iu6eXPjiuE5A"
      libraries={["visualization"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        options={options}
        onLoad={onLoad}
      >
        {isMapReady && !trands && data?.length && (
          <HeatmapLayer
            data={data.map(
              (pos) => new window.google.maps.LatLng(pos.lat, pos.lng)
            )}
            options={{ radius: 20, opacity: 1, gradient }}
          />
        )}

        {trands &&
          data?.map((el, i) => (
            <Marker
              key={`marker-${i}`}
              position={el}
              title={mapCount?.[i]?.toString()}
              // icon={{ url: ..., scaledSize: ... }} // uncomment if needed
            />
          ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleHeatmap;
