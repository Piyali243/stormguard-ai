import { useMemo, useState } from "react";

function StormSimulator({ onSimulationUpdate }) {
  const [wind, setWind] = useState(84);
  const [rainfall, setRainfall] = useState(42);
  const [surge, setSurge] = useState(2.1);

  const [simulation, setSimulation] = useState({
    risk: 68,
    category: "Elevated",
    power: 89,
    roads: 81,
    buildings: 93,
  });

  /* ================= RISK CALCULATION ================= */

  const calculatedRisk = useMemo(() => {
    const windScore = ((wind - 40) / 110) * 100;
    const rainScore = ((rainfall - 10) / 140) * 100;
    const surgeScore = ((surge - 0.5) / 4.5) * 100;

    const risk =
      windScore * 0.45 +
      rainScore * 0.3 +
      surgeScore * 0.25;

    return Math.max(5, Math.min(99, Math.round(risk)));
  }, [wind, rainfall, surge]);

  /* ================= RUN SIMULATION ================= */

  const runSimulation = () => {
    const risk = calculatedRisk;

    let category = "Low";

    if (risk >= 75) {
      category = "Critical";
    } else if (risk >= 55) {
      category = "Elevated";
    } else if (risk >= 35) {
      category = "Moderate";
    }

    /* ================= INFRASTRUCTURE IMPACT ================= */

    const power = Math.max(
      40,
      Math.min(99, Math.round(100 - risk * 0.16))
    );

    const roads = Math.max(
      30,
      Math.min(98, Math.round(100 - risk * 0.28))
    );

    const buildings = Math.max(
      45,
      Math.min(99, Math.round(100 - risk * 0.1))
    );

    const result = {
      risk,
      category,
      power,
      roads,
      buildings,
    };

    setSimulation(result);

    if (onSimulationUpdate) {
      onSimulationUpdate(result);
    }
  };

  return (
    <section className="simulator">
      {/* ================= HEADER ================= */}

      <div className="simulator-heading">
        <div>
          <p className="panel-label">SCENARIO ANALYSIS</p>

          <h2>What-If Storm Simulator</h2>
        </div>

        <span className="simulation-badge">
          INTERACTIVE
        </span>
      </div>

      {/* ================= CONTROLS ================= */}

      <div className="simulator-controls">
        {/* WIND */}

        <div className="control">
          <div className="control-header">
            <label htmlFor="wind-slider">
              Wind Speed
            </label>

            <strong>{wind} km/h</strong>
          </div>

          <input
            id="wind-slider"
            type="range"
            min="40"
            max="150"
            value={wind}
            onChange={(event) =>
              setWind(Number(event.target.value))
            }
            aria-label="Wind speed"
          />
        </div>

        {/* RAINFALL */}

        <div className="control">
          <div className="control-header">
            <label htmlFor="rainfall-slider">
              Rainfall
            </label>

            <strong>{rainfall} mm</strong>
          </div>

          <input
            id="rainfall-slider"
            type="range"
            min="10"
            max="150"
            value={rainfall}
            onChange={(event) =>
              setRainfall(Number(event.target.value))
            }
            aria-label="Rainfall"
          />
        </div>

        {/* STORM SURGE */}

        <div className="control">
          <div className="control-header">
            <label htmlFor="surge-slider">
              Storm Surge
            </label>

            <strong>{surge.toFixed(1)} m</strong>
          </div>

          <input
            id="surge-slider"
            type="range"
            min="0.5"
            max="5"
            step="0.1"
            value={surge}
            onChange={(event) =>
              setSurge(Number(event.target.value))
            }
            aria-label="Storm surge"
          />
        </div>
      </div>

      {/* ================= LIVE PREVIEW ================= */}

      <div className="simulation-preview">
        <span>SCENARIO RISK</span>

        <strong>{calculatedRisk}%</strong>

        <small>
          Adjust conditions and run the simulation
        </small>
      </div>

      {/* ================= SIMULATE BUTTON ================= */}

      <button
        type="button"
        className="simulate-button"
        onClick={runSimulation}
      >
        <span>↻</span>
        Run Impact Simulation
      </button>

      {/* ================= RESULT ================= */}

      <div className="simulation-result">
        <div className="result-main">
          <span>SIMULATED IMPACT</span>

          <strong>
            {simulation.risk}% — {simulation.category}
          </strong>
        </div>

        <div className="result-items">
          {/* POWER */}

          <div>
            <span>Power Grid</span>

            <strong>{simulation.power}%</strong>
          </div>

          {/* ROADS */}

          <div>
            <span>Road Network</span>

            <strong>{simulation.roads}%</strong>
          </div>

          {/* BUILDINGS */}

          <div>
            <span>Critical Buildings</span>

            <strong>{simulation.buildings}%</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StormSimulator;