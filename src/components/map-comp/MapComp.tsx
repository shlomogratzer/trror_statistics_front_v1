import { useRef, useEffect, useState, useContext } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./map.css";
import configData from "../../config";
import Box from "@mui/material/Box";
import { TAttackContext } from "../../context/ContextProvider";

export default function MapComp() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const center = { lng: -157.858677, lat: 21.3067 };
  const map = useRef<maptilersdk.Map | null>(null);
  const [zoom] = useState(9.79);
  maptilersdk.config.apiKey = configData.MAPTILER_API_KEY;

  const AttackListContext = useContext(TAttackContext);
  const ganarateMarker = () => {
    const tAttacks = AttackListContext?.tAttacks;
    tAttacks &&
      tAttacks.map((attack) => {
        new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([attack.longitude, attack.latitude])
          .addTo(map.current!);
      });
  };
  useEffect(() => {
    if (mapContainer.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [center.lng, center.lat],
        zoom: zoom,
      });
      new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([-157.858677, 21.3067])
        .addTo(map.current);
    }
    ganarateMarker();
  }, [center.lng, center.lat, zoom, AttackListContext?.tAttacks]);

  return (
    <Box sx={{}}>
      <div className="container">
        <div ref={mapContainer} id="map" className="map" />
      </div>
    </Box>
  );
}
