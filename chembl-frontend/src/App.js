import React, { useState } from "react";
import "./App.css";

function App() {
  const [targetId, setTargetId] = useState("");
  const [activityType, setActivityType] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!targetId) {
      setError("Target ID is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let url = `http://localhost:8080/api/chembl/activities?targetId=${targetId}`;

      if (activityType) {
        url += `&activityType=${activityType}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Server error");
      }

      const result = await response.json();

      let filteredData = result.data || [];

      // 🔥 Extra filtering (frontend side)
      filteredData = filteredData.filter((item) => {
        const value = parseFloat(item.value);

        if (minValue && value < minValue) return false;
        if (maxValue && value > maxValue) return false;

        return true;
      });

      setData(filteredData);
    } catch (err) {
      setError("Failed to fetch data. Check Target ID or server.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>🧪 ChEMBL Activity Explorer</h1>

        <div className="inputs">
          <input
            type="text"
            placeholder="Target ID (CHEMBL204)"
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Activity Type (IC50, Ki...)"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          />

          <input
            type="number"
            placeholder="Min Value"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Value"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
          />

          <button onClick={fetchData}>
            {loading ? "Loading..." : "Fetch Data"}
          </button>
        </div>

        {/* ERROR */}
        {error && <p className="error">{error}</p>}
      </div>

      {/* LOADING */}
      {loading && <p className="loading">Fetching data...</p>}

      {/* TABLE */}
      {!loading && data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Molecule ID</th>
              <th>Type</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.moleculeId}</td>
                <td>{item.type}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* NO DATA */}
      {!loading && data.length === 0 && (
        <p className="no-data">No data found</p>
      )}
    </div>
  );
}

export default App;