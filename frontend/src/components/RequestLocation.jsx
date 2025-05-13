import { useEffect, useState } from "react";


export default function RequestLocation({ onCoordsRecieved }) {
    const [error, setError] = useState("");

    useEffect(() =>  {
        if (!("geolocation" in navigator)) {
            setError("Geolocation not supported by your browser, please search for your location.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                onCoordsRecieved(latitude, longitude);
                console.log("Coords from browser:", latitude, longitude)
            },
            (err) => {
                console.error("Location permission denied or unavailable, please search for your location");
                onCoordsRecieved(null, null);
            },
            {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
            }
        );
    }, []);

    return (
        <>
            {error && <p className="locationError">{error}</p>}
        </>
    );
}
