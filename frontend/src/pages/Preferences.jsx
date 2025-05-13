import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../apiConfig";

export default function Preferences() {
  const { user, setUser } = useUser();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [unit, setUnit] = useState("fahrenheit");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const locationQuery = `${city}, ${state}`;
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        locationQuery
      )}`
    );
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
      // Optional: store prefs in user context if you expand its structure
      setUser({
        ...user,
        preferences: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
          temp_unit: unit,
        },
      });
    } else {
      setMessage("Failed to save preferences.");
    }

    navigate("/");
  };

  if (!user) return <p className="glass-card weather-container">You must be logged in to access this page.</p>;

  return (
    <div className="glass-card weather-container">
      <form onSubmit={handleSave}>
        <h2>Set Your Preferences</h2>

        <input
          className="search_box"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
          required
        />
        <input
          className="search_box"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
          required
        />

        <div style={{ margin: "1rem 0" }}>
          <label style={{ marginRight: "1rem" }}>
            <input
              type="radio"
              name="unit"
              value="fahrenheit"
              checked={unit === "fahrenheit"}
              onChange={() => setUnit("fahrenheit")}
            />
            Fahrenheit
          </label>
          <label>
            <input
              type="radio"
              name="unit"
              value="celsius"
              checked={unit === "celsius"}
              onChange={() => setUnit("celsius")}
            />
            Celsius
          </label>
        </div>

        <button type="submit" className="search_button">
          Save Preferences
        </button>

        {message && <p>{message}</p>}
      </form>

      <button onClick={handleLogout} className="search_button" style={{ marginTop: "1rem" }}>
        Log Out
      </button>
    </div>
  );
}
