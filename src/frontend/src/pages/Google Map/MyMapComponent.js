// src/pages/Google Map/MyMapComponent.js
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Kích thước của bản đồ
const mapContainerStyle = {
    width: "100%",
    height: "400px",
};

// Vị trí trung tâm của bản đồ (vị trí mặc định là Trà Vinh)
const center = {
    lat: 10.0389, // Vĩ độ
    lng: 105.7883, // Kinh độ
};

const MyMapComponent = () => {
    return (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> {/* Thay YOUR_GOOGLE_MAPS_API_KEY bằng API Key của bạn */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
            >
                {/* Đánh dấu vị trí trên bản đồ */}
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default MyMapComponent;
