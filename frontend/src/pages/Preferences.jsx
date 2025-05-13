import { useUser } from "../context/UserContext";
import { useState } from "react";
import API_BASE_URL from "../apiConfig";

export default function Preferences() {
  const { user } = useUser();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [unit, setUnit] = useState("fahrenheit");
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();

    const locationQuery = `${city}, ${state}`;
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}`);
    const geoData = await geoRes.json();

    if (!geoData.length) {
      setMessage("Location not found.");
      return;
    }

    const { lat, lon } = geoData[0];

    const res = await fetch(`${API_BASE_URL}/preferences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        temp_unit: unit,
      }),
    });

    if (res.ok) {
      setMessage("Preferences saved!");
    } else {
      setMessage("Failed to save preferences.");
    }
  };

  if (!user) return <p>You must be logged in to access this page.</p>;

  return (
    <form onSubmit={handleSave}>
      <h2>Set Your Preferences</h2>

      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
      <input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />

      <div>
        <label>
          <input type="radio" name="unit" value="fahrenheit" checked={unit === "fahrenheit"} onChange={() => setUnit("fahrenheit")} />
          Fahrenheit
        </label>
        <label>
          <input type="radio" name="unit" value="celsius" checked={unit === "celsius"} onChange={() => setUnit("celsius")} />
          Celsius
        </label>
      </div>

      <button type="submit">Save Preferences</button>
      {message && <p>{message}</p>}
    </form>
  );
}
