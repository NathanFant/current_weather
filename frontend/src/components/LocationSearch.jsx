import { useState } from "react";

export default function LocationSearch({ onCoordsFound }) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
            const data = await res.json();

            if (data.length === 0) {
                setError("Location not found.");
                return;
            }

            const { lat, lon } = data[0];
            onCoordsFound(parseFloat(lat), parseFloat(lon));
            setError("");

        } catch (err) {
            console.error("Geocoding failed:", err);
            setError("Failed to find location");

        }
    };

    return (
        <form onSubmit={handleSearch} className="search_form">
            <input type="text" value={query} placeholder="Search location..." onChange={(e) => setQuery(e.target.value)} className="search_box"/>
            <button type="submit" className="search_button">Go</button>
            {error && <p className="search_error">{error}</p>}
        </form>
    )
}
