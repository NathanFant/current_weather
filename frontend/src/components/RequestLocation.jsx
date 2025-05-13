import { useEffect, useState } from "react";
import { useCoords } from "../context/CoordsContext";


export default function RequestLocation() {
    const [error, setError] = useState("");
    const { setCoords } = useCoords();

    useEffect(() =>  {
        if (!("geolocation" in navigator)) {
            setError("Geolocation not supported by your browser, please search for your location.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCoords((prev) => prev ?? { latitude, longitude });
            },
            (err) => {
                console.error("Location permission denied or unavailable, please search for your location");
                setCoords((prev) => prev ?? null);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0}
        );
    }, []);

    return error ? <p className="locationErrror">{error}</p> : null;
}
