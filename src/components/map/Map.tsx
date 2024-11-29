import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";


interface MapComponentProps {
    restaurants: Restaurant[];
}

const MapComponent = ({ restaurants }: MapComponentProps) => {

    return (
        <div style={{ height: "500px", width: "100%" }}>
            <MapContainer center={[31.9461, 34.8516]} zoom={9} style={{ height: "100vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <MarkerClusterGroup
                    showCoverageOnHover={false}
                    spiderfyOnMaxZoom={true}
                    maxClusterRadius={40}
                >
                    {restaurants.map((restaurant) => (
                        <Marker
                            key={restaurant.id}
                            position={[restaurant.lat, restaurant.lng]}
                            icon={new L.Icon({ iconUrl: restaurant.icon, iconSize: [25, 41], iconAnchor: [12, 41] })}
                        >
                            <Popup>{restaurant.name}</Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div>
    );
};

export default MapComponent;