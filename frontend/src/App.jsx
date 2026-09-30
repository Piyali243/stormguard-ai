import { useState } from "react";
import "./App.css";
import StormSimulator from "./StormSimulator";

function App() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [forecastRange, setForecastRange] = useState("24 hours");

  // ================= SIMULATION STATE =================

  const [stormData, setStormData] = useState({
    risk: 68,
    category: "Elevated",
    power: 89,
    roads: 81,
    buildings: 93,
    wind: 84,
    rainfall: 42,
    surge: 2.1,
  });

  // ================= NAVIGATION =================

  const scrollToSection = (section, id) => {
    setActiveSection(section);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ================= SIMULATION UPDATE =================

  const handleSimulationUpdate = (result) => {
    setStormData(result);

    // Keep currently selected map location synchronized
    setSelectedLocation((current) => {
      if (!current) {
        return null;
      }

      let locationRisk = result.risk;
      let locationLevel = result.category;

      if (current.name === "Digha") {
        locationRisk = Math.min(99, result.risk + 14);

        locationLevel =
          result.risk >= 65
            ? "High"
            : result.risk >= 35
            ? "Elevated"
            : "Moderate";
      }

      if (current.name === "Haldia") {
        locationRisk = Math.min(99, result.risk + 6);

        locationLevel =
          result.risk >= 70
            ? "High"
            : result.category;
      }

      return {
        ...current,
        risk: locationRisk,
        level: locationLevel,
      };
    });
  };

  // ================= RISK LABEL =================

  const getRiskColorClass = () => {
    if (stormData.risk >= 75) {
      return "critical";
    }

    if (stormData.risk >= 55) {
      return "elevated";
    }

    if (stormData.risk >= 35) {
      return "moderate";
    }

    return "low";
  };

  // ================= ALERT TEXT =================

  const getAlertText = () => {
    if (stormData.risk >= 75) {
      return {
        title: "Critical storm conditions",
        message:
          "High-impact conditions are being simulated across the monitored region.",
      };
    }

    if (stormData.risk >= 55) {
      return {
        title: "Elevated storm conditions",
        message:
          "Cyclonic activity is being monitored over the Bay of Bengal.",
      };
    }

    if (stormData.risk >= 35) {
      return {
        title: "Moderate weather conditions",
        message:
          "Storm-related conditions are being monitored across the region.",
      };
    }

    return {
      title: "Low storm risk",
      message:
        "Current simulated conditions indicate relatively low regional impact.",
    };
  };

  const alert = getAlertText();

  // ================= PRESSURE =================

  const pressure = Math.max(
    950,
    1000 - stormData.risk * 0.265
  ).toFixed(0);

  return (
    <div className="app">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-mark">
            S
          </div>

          <div>
            <h2>StormGuard</h2>
            <span>AI RESILIENCE</span>
          </div>

        </div>


        <nav className="navigation">

          <a
            href="#dashboard"
            className={`nav-item ${
              activeSection === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={(event) => {
              event.preventDefault();

              scrollToSection(
                "dashboard",
                "dashboard"
              );
            }}
          >
            <span>⌂</span>
            Dashboard
          </a>


          <a
            href="#storm-monitor"
            className={`nav-item ${
              activeSection === "storm"
                ? "active"
                : ""
            }`}
            onClick={(event) => {
              event.preventDefault();

              scrollToSection(
                "storm",
                "storm-monitor"
              );
            }}
          >
            <span>◉</span>
            Storm Monitor
          </a>


          <a
            href="#risk-map"
            className={`nav-item ${
              activeSection === "map"
                ? "active"
                : ""
            }`}
            onClick={(event) => {
              event.preventDefault();

              scrollToSection(
                "map",
                "risk-map"
              );
            }}
          >
            <span>⌁</span>
            Risk Map
          </a>


          <a
            href="#infrastructure"
            className={`nav-item ${
              activeSection === "infrastructure"
                ? "active"
                : ""
            }`}
            onClick={(event) => {
              event.preventDefault();

              scrollToSection(
                "infrastructure",
                "infrastructure"
              );
            }}
          >
            <span>▣</span>
            Infrastructure
          </a>

        </nav>


        <div className="sidebar-bottom">

          <div className="system-status">

            <span className="status-dot"></span>

            Systems operational

          </div>


          <div className="profile">

            <div className="profile-avatar">
              PG
            </div>

            <div>
              <strong>Admin</strong>
              <small>Control Center</small>
            </div>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        className="main-content"
        id="dashboard"
      >

        {/* ================= TOP BAR ================= */}

        <header className="topbar">

          <div>

            <p className="eyebrow">
              LIVE MONITORING
            </p>

            <h1>
              Storm intelligence
            </h1>

          </div>


          <div className="top-actions">

            <button
              className="location-btn"
              type="button"
            >
              <span>⌖</span>
              Kolkata
            </button>


            <button
              className="icon-btn"
              type="button"
              title="System status"
            >
              ◔
            </button>


            <button
              className="avatar-btn"
              type="button"
              title="Admin"
            >
              P
            </button>

          </div>

        </header>


        {/* ================= ALERT ================= */}

        <section className="alert-banner">

          <div className="alert-icon">
            !
          </div>


          <div className="alert-content">

            <strong>
              {alert.title}
            </strong>

            <span>
              {alert.message}
            </span>

          </div>


          <div className="alert-time">
            Updated just now
          </div>

        </section>


        {/* =====================================================
            OVERVIEW CARDS
        ===================================================== */}

        <section className="overview-grid">

          {/* STORM RISK */}

          <div className="metric-card">

            <div className="metric-top">

              <span>
                STORM RISK
              </span>

              <span className="metric-icon">
                ◉
              </span>

            </div>


            <div className="metric-value">

              {stormData.risk}

              <span>
                %
              </span>

            </div>


            <div
              className={`risk-label ${getRiskColorClass()}`}
            >

              <span className="risk-dot"></span>

              {stormData.category}

            </div>

          </div>


          {/* WIND */}

          <div className="metric-card">

            <div className="metric-top">

              <span>
                WIND SPEED
              </span>

              <span className="metric-icon">
                ↝
              </span>

            </div>


            <div className="metric-value">

              {stormData.wind}

              <span>
                {" "}km/h
              </span>

            </div>


            <div className="metric-sub">

              <span className="up">
                ↑ 12%
              </span>{" "}
              from yesterday

            </div>

          </div>


          {/* RAINFALL */}

          <div className="metric-card">

            <div className="metric-top">

              <span>
                RAINFALL
              </span>

              <span className="metric-icon">
                ⌁
              </span>

            </div>


            <div className="metric-value">

              {stormData.rainfall}

              <span>
                {" "}mm
              </span>

            </div>


            <div className="metric-sub">
              Next 6 hours
            </div>

          </div>


          {/* INFRASTRUCTURE */}

          <div className="metric-card">

            <div className="metric-top">

              <span>
                INFRASTRUCTURE
              </span>

              <span className="metric-icon">
                ▤
              </span>

            </div>


            <div className="metric-value">

              {stormData.buildings}

              <span>
                %
              </span>

            </div>


            <div className="metric-sub">
              Resilience score
            </div>

          </div>

        </section>


        {/* =====================================================
            MAP + STORM PROFILE
        ===================================================== */}

        <section className="dashboard-grid">


          {/* ================= RISK MAP ================= */}

          <div
            className="panel map-panel"
            id="risk-map"
          >

            <div className="panel-header">

              <div>

                <p className="panel-label">
                  REGIONAL OVERVIEW
                </p>

                <h2>
                  Risk map
                </h2>

              </div>


              <button
                className="view-btn"
                type="button"
                onClick={() =>
                  scrollToSection(
                    "map",
                    "risk-map"
                  )
                }
              >
                View map →
              </button>

            </div>


            <div className="map">

              <div className="map-grid"></div>

              <div
                className="storm-circle circle-one"
                style={{
                  transform: `scale(${
                    0.9 +
                    stormData.risk / 350
                  })`,
                  opacity:
                    0.45 +
                    stormData.risk / 180,
                }}
              ></div>


              <div
                className="storm-circle circle-two"
                style={{
                  transform: `scale(${
                    0.9 +
                    stormData.risk / 450
                  })`,
                  opacity:
                    0.5 +
                    stormData.risk / 200,
                }}
              ></div>


              <div
                className="storm-core"
                style={{
                  transform: `scale(${
                    0.8 +
                    stormData.risk / 250
                  })`,
                  opacity:
                    0.65 +
                    stormData.risk / 300,
                }}
              ></div>


              {/* KOLKATA */}

              <div
                className="map-point point-one"
                onClick={() =>
                  setSelectedLocation({
                    name: "Kolkata",
                    risk: stormData.risk,
                    level: stormData.category,
                    exposure: "High",
                    concern: "Urban flooding",
                    assets: "32 assets monitored",
                  })
                }
              >

                <span></span>

                Kolkata

              </div>


              {/* DIGHA */}

              <div
                className="map-point point-two"
                onClick={() =>
                  setSelectedLocation({
                    name: "Digha",
                    risk: Math.min(
                      99,
                      stormData.risk + 14
                    ),
                    level:
                      stormData.risk >= 65
                        ? "High"
                        : stormData.risk >= 35
                        ? "Elevated"
                        : "Moderate",
                    exposure: "High",
                    concern: "Storm surge",
                    assets: "18 assets monitored",
                  })
                }
              >

                <span></span>

                Digha

              </div>


              {/* HALDIA */}

              <div
                className="map-point point-three"
                onClick={() =>
                  setSelectedLocation({
                    name: "Haldia",
                    risk: Math.min(
                      99,
                      stormData.risk + 6
                    ),
                    level:
                      stormData.risk >= 70
                        ? "High"
                        : stormData.category,
                    exposure: "Moderate",
                    concern:
                      "Coastal & industrial exposure",
                    assets: "24 assets monitored",
                  })
                }
              >

                <span></span>

                Haldia

              </div>


              <div className="map-label bay">
                BAY OF BENGAL
              </div>


              <div className="map-controls">

                <button
                  type="button"
                  aria-label="Zoom in"
                >
                  +
                </button>

                <button
                  type="button"
                  aria-label="Zoom out"
                >
                  −
                </button>

              </div>

            </div>


            {/* LOCATION DETAILS */}

            {selectedLocation && (

              <div className="location-details">

                <div className="location-details-top">

                  <div>

                    <p className="panel-label">
                      SELECTED LOCATION
                    </p>

                    <h3>
                      {selectedLocation.name}
                    </h3>

                  </div>


                  <button
                    className="close-location"
                    type="button"
                    onClick={() =>
                      setSelectedLocation(null)
                    }
                    aria-label="Close location details"
                  >
                    ×
                  </button>

                </div>


                <div className="location-risk">

                  <strong>
                    {selectedLocation.risk}%
                  </strong>

                  <span>
                    {selectedLocation.level}
                  </span>

                </div>


                <div className="location-details-grid">

                  <div>

                    <span>
                      Infrastructure exposure
                    </span>

                    <strong>
                      {selectedLocation.exposure}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Primary concern
                    </span>

                    <strong>
                      {selectedLocation.concern}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Monitoring
                    </span>

                    <strong>
                      {selectedLocation.assets}
                    </strong>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* ================= STORM PROFILE ================= */}

          <div
            className="panel storm-panel"
            id="storm-monitor"
          >

            <div className="panel-header">

              <div>

                <p className="panel-label">
                  CURRENT SYSTEM
                </p>

                <h2>
                  Storm profile
                </h2>

              </div>


              <span className="live-badge">

                <span></span>

                LIVE

              </span>

            </div>


            <div className="storm-visual">

              <div
                className="storm-ring ring-one"
                style={{
                  transform: `scale(${
                    0.85 +
                    stormData.risk / 500
                  })`,
                  opacity:
                    0.25 +
                    stormData.risk / 150,
                }}
              ></div>


              <div
                className="storm-ring ring-two"
                style={{
                  transform: `scale(${
                    0.9 +
                    stormData.risk / 600
                  })`,
                  opacity:
                    0.35 +
                    stormData.risk / 180,
                }}
              ></div>


              <div
                className="storm-ring ring-three"
                style={{
                  transform: `scale(${
                    0.95 +
                    stormData.risk / 700
                  })`,
                  opacity:
                    0.45 +
                    stormData.risk / 200,
                }}
              ></div>


              <div
                className="storm-eye"
                style={{
                  transform: `scale(${
                    0.9 +
                    stormData.risk / 400
                  })`,
                }}
              ></div>


              <div className="storm-info">

                <strong>
                  {stormData.risk}%
                </strong>

                <span>
                  Risk probability
                </span>

              </div>

            </div>


            <div className="storm-details">

              <div>

                <span>
                  Category
                </span>

                <strong>
                  {stormData.category}
                </strong>

              </div>


              <div>

                <span>
                  Movement
                </span>

                <strong>
                  NE ↗
                </strong>

              </div>


              <div>

                <span>
                  Pressure
                </span>

                <strong>
                  {pressure} hPa
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            STORM SIMULATOR
        ===================================================== */}

        <StormSimulator
          onSimulationUpdate={
            handleSimulationUpdate
          }
        />


        {/* =====================================================
            BOTTOM SECTION
        ===================================================== */}

        <section className="bottom-grid">


          {/* ================= RISK TRAJECTORY ================= */}

          <div className="panel chart-panel">

            <div className="panel-header">

              <div>

                <p className="panel-label">
                  FORECAST
                </p>

                <h2>
                  Risk trajectory
                </h2>

              </div>


              <select
                value={forecastRange}
                onChange={(event) =>
                  setForecastRange(
                    event.target.value
                  )
                }
              >

                <option value="24 hours">
                  24 hours
                </option>

                <option value="48 hours">
                  48 hours
                </option>

                <option value="7 days">
                  7 days
                </option>

              </select>

            </div>


            <div className="chart">

              <div className="chart-lines">

                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>


              <svg
                viewBox="0 0 700 220"
                preserveAspectRatio="none"
              >

                <defs>

                  <linearGradient
                    id="area"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopOpacity="0.25"
                    />

                    <stop
                      offset="100%"
                      stopOpacity="0"
                    />

                  </linearGradient>

                </defs>


                {forecastRange === "24 hours" && (
                  <>
                    <path
                      d={`M0 ${
                        205 - stormData.risk * 0.3
                      } C80 175 100 155 170 160 C240 165 260 125 330 135 C400 145 410 75 480 90 C550 105 590 45 700 ${
                        60 - stormData.risk * 0.25
                      } L700 220 L0 220 Z`}
                      fill="url(#area)"
                    />

                    <path
                      d={`M0 ${
                        205 - stormData.risk * 0.3
                      } C80 175 100 155 170 160 C240 165 260 125 330 135 C400 145 410 75 480 90 C550 105 590 45 700 ${
                        60 - stormData.risk * 0.25
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </>
                )}


                {forecastRange === "48 hours" && (
                  <>
                    <path
                      d={`M0 ${
                        205 - stormData.risk * 0.25
                      } C80 180 120 165 180 170 C250 175 280 145 350 150 C420 155 450 110 520 120 C590 130 630 80 700 ${
                        80 - stormData.risk * 0.22
                      } L700 220 L0 220 Z`}
                      fill="url(#area)"
                    />

                    <path
                      d={`M0 ${
                        205 - stormData.risk * 0.25
                      } C80 180 120 165 180 170 C250 175 280 145 350 150 C420 155 450 110 520 120 C590 130 630 80 700 ${
                        80 - stormData.risk * 0.22
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </>
                )}


                {forecastRange === "7 days" && (
                  <>
                    <path
                      d={`M0 ${
                        205 - stormData.risk * 0.2
                      } C70 180 100 165 150 175 C210 185 250 155 310 165 C370 175 400 140 460 150 C520 160 560 105 620 120 C660 130 680 100 700 ${
                        105 - stormData.risk * 0.15
                      } L700 220 L0 220 Z`}
                      fill="url(#area)"
                    />

                    <path
                      d={`M0 ${
                        205 - stormData.risk * 0.2
                      } C70 180 100 165 150 175 C210 185 250 155 310 165 C370 175 400 140 460 150 C520 160 560 105 620 120 C660 130 680 100 700 ${
                        105 - stormData.risk * 0.15
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </>
                )}

              </svg>


              <div className="chart-labels">

                {forecastRange === "24 hours" && (
                  <>
                    <span>Now</span>
                    <span>6h</span>
                    <span>12h</span>
                    <span>18h</span>
                    <span>24h</span>
                  </>
                )}


                {forecastRange === "48 hours" && (
                  <>
                    <span>Now</span>
                    <span>12h</span>
                    <span>24h</span>
                    <span>36h</span>
                    <span>48h</span>
                  </>
                )}


                {forecastRange === "7 days" && (
                  <>
                    <span>Today</span>
                    <span>Day 2</span>
                    <span>Day 3</span>
                    <span>Day 5</span>
                    <span>Day 7</span>
                  </>
                )}

              </div>

            </div>

          </div>


          {/* ================= INFRASTRUCTURE ================= */}

          <div
            className="panel infrastructure-panel"
            id="infrastructure"
          >

            <div className="panel-header">

              <div>

                <p className="panel-label">
                  ASSET HEALTH
                </p>

                <h2>
                  Infrastructure
                </h2>

              </div>


              <button
                className="more-btn"
                type="button"
                aria-label="More options"
              >
                •••
              </button>

            </div>


            {/* POWER GRID */}

            <div className="asset">

              <div className="asset-icon">
                ⌁
              </div>

              <div className="asset-info">

                <strong>
                  Power grid
                </strong>

                <span>
                  32 monitored assets
                </span>

              </div>

              <div className="asset-score good">
                {stormData.power}%
              </div>

            </div>


            {/* ROAD NETWORK */}

            <div className="asset">

              <div className="asset-icon">
                ◇
              </div>

              <div className="asset-info">

                <strong>
                  Road network
                </strong>

                <span>
                  48 monitored routes
                </span>

              </div>

              <div className="asset-score warning">
                {stormData.roads}%
              </div>

            </div>


            {/* CRITICAL BUILDINGS */}

            <div className="asset">

              <div className="asset-icon">
                ⌂
              </div>

              <div className="asset-info">

                <strong>
                  Critical buildings
                </strong>

                <span>
                  16 monitored sites
                </span>

              </div>

              <div className="asset-score good">
                {stormData.buildings}%
              </div>

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer>

          StormGuard AI

          <span>•</span>

          Predict. Prepare. Protect.

        </footer>

      </main>

    </div>
  );
}

export default App;