import { useState } from "react";
import "./Settings.css";

function Settings() {
  const [settings, setSettings] = useState({
    threatAlerts: true,
    emailNotifications: true,
    anomalyDetection: true,
    automaticBlocking: true,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleSetting = (key) => {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "cybersentinel_admin_settings",
      JSON.stringify(settings)
    );

    setSaved(true);
  };

  return (
    <section className="settings-module">
      <div className="settings-grid">
        <div className="settings-card">
          <span className="panel-kicker">MONITORING</span>
          <h2>Security Monitoring</h2>

          <div className="setting-row">
            <div>
              <strong>Threat Alerts</strong>
              <span>Show new threat notifications</span>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                settings.threatAlerts ? "on" : ""
              }`}
              onClick={() => toggleSetting("threatAlerts")}
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>AI Anomaly Detection</strong>
              <span>Enable anomaly analysis pipeline</span>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                settings.anomalyDetection ? "on" : ""
              }`}
              onClick={() => toggleSetting("anomalyDetection")}
            >
              <span />
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>Automatic Blocking</strong>
              <span>Allow security rules to block requests</span>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                settings.automaticBlocking ? "on" : ""
              }`}
              onClick={() => toggleSetting("automaticBlocking")}
            >
              <span />
            </button>
          </div>
        </div>

        <div className="settings-card">
          <span className="panel-kicker">NOTIFICATIONS</span>
          <h2>Notification Preferences</h2>

          <div className="setting-row">
            <div>
              <strong>Email Notifications</strong>
              <span>Receive security notification emails</span>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                settings.emailNotifications ? "on" : ""
              }`}
              onClick={() => toggleSetting("emailNotifications")}
            >
              <span />
            </button>
          </div>

          <div className="setting-static">
            <label htmlFor="severityThreshold">
              Alert severity threshold
            </label>

            <select id="severityThreshold" defaultValue="High">
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        <div className="settings-card">
          <span className="panel-kicker">SYSTEM</span>
          <h2>Platform Controls</h2>

          <div className="setting-static">
            <label htmlFor="refreshInterval">
              Dashboard refresh interval
            </label>

            <select id="refreshInterval" defaultValue="30">
              <option value="10">10 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
            </select>
          </div>

          <div className="setting-row setting-danger">
            <div>
              <strong>Maintenance Mode</strong>
              <span>Temporarily restrict application access</span>
            </div>

            <button
              type="button"
              className={`settings-toggle ${
                settings.maintenanceMode ? "on" : ""
              }`}
              onClick={() => toggleSetting("maintenanceMode")}
            >
              <span />
            </button>
          </div>
        </div>

        <div className="settings-card settings-info-card">
          <span className="panel-kicker">ARCHITECTURE</span>
          <h2>Integration Readiness</h2>

          <div className="integration-row">
            <span>React Frontend</span>
            <strong>Ready</strong>
          </div>

          <div className="integration-row">
            <span>FastAPI Backend</span>
            <strong>Planned</strong>
          </div>

          <div className="integration-row">
            <span>MongoDB</span>
            <strong>Planned</strong>
          </div>

          <div className="integration-row">
            <span>WAF / IDS / AI</span>
            <strong>Planned</strong>
          </div>
        </div>
      </div>

      <div className="settings-save-bar">
        {saved && (
          <span className="settings-saved">
            ✓ Settings saved locally
          </span>
        )}

        <button
          type="button"
          className="btn save-settings-button"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>
    </section>
  );
}

export default Settings;