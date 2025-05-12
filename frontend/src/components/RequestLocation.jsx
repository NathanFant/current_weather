import { useState } from "react";

export default function RequestLocation({ onCoordsRecieved }) {
    const [error, setError] = useState("");

    const requestLocation = () => {
        if (!("geolocation" in navigator)) {
            setError("Geolocation not surpported by your browser, please enter your location in order to retrieve weather.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onCoordsRecieved(latitude, longitude);
            },
            (err) => {
                console.error("Geolocation error:", err);
                setError("Location permission denied or unavailable.");
            }
        );
    };

    return (
        <div>
            <button onClick={requestLocation}>Use My Location</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}
