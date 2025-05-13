import { useState } from "react";
import { useCoords } from "../context/CoordsContext";

export default function LocationSearch() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const { setCoords } = useCoords();

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (data.length === 0) {
                setError("Location not found.");
                return;
            }

            const [rawCity, rawState] = query.split(",").map(s => s.trim().toLowerCase());

            const match = data.find(loc => {
                const address = loc.address || {};
                const cityMatch = [address.city, address.town, address.village].some(val => val?.toLowerCase() === rawCity);

                const stateMatch = rawState ? address.state?.toLowerCase().includes(rawState) : true;

                return cityMatch && stateMatch;
            }) || data[0]; // Fallback to first search result if no found better location.

            if (match) {
                const { lat, lon } = match;
                setCoords({ latitude: parseFloat(lat), longitude: parseFloat(lon) })
                setError("");
            }

        } catch (err) {
            console.error("Geocoding failed:", err);
            setError("Failed to find location");

        }
    };

    return (
        <form onSubmit={handleSearch} className="search_form glass-card floating-box">
            <input type="text" value={query} placeholder="Search Location..." onChange={(e) => setQuery(e.target.value)} className="search_box" />
            <button type="submit" className="search_button">Go</button>
            {error && <p className="search_error">{error}</p>}
        </form>
    )
}
