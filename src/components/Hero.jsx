import { Link } from "react-router";

import "./Hero.css";

const features = [
  {
    icon: "🛡️",
    title: "Web Application Firewall",
    description:
      "Inspect and protect web requests against common application attacks.",
  },
  {
    icon: "⚡",
    title: "Real-Time Threat Detection",
    description:
      "Identify suspicious requests and security threats as they happen.",
  },
  {
    icon: "🤖",
    title: "AI-Based Anomaly Detection",
    description:
      "Detect unusual behavior using intelligent anomaly analysis.",
  },
  {
    icon: "📊",
    title: "SOC Security Dashboard",
    description:
      "Monitor security events and threat activity from one interface.",
  },
  {
    icon: "🔍",
    title: "IP Risk & Security Analysis",
    description:
      "Analyze IP activity and identify potentially risky sources.",
  },
];

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-shell">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <div className="hero-badge">AI-POWERED WEB SECURITY</div>

            <h1 className="hero-title">
              Protect. Detect. Analyze.
            </h1>

            <p className="hero-text">
              CyberSentinel-AI is an intelligent Web Application
              Firewall and Intrusion Detection System designed to
              detect threats, analyze suspicious behavior, and help
              secure modern web applications.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn hero-primary">
                Get Started
              </Link>

              <Link to="/login" className="btn hero-secondary">
                Explore Features
              </Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div
              className="hero-panel"
              aria-label="Cybersecurity overview panel"
            >
              <div className="panel-header">
                <span className="status-dot"></span>
                <span>Threat Monitoring</span>
              </div>

              <div className="panel-metrics">
                <div className="metric-box">
                  <small>Blocked</small>
                  <strong>2,340</strong>
                </div>

                <div className="metric-box accent">
                  <small>Threats</small>
                  <strong>18</strong>
                </div>
              </div>

              <div className="signal-card">
                <div className="signal-row">
                  <span>Firewall</span>
                  <span className="signal-good">
                    99.8%
                  </span>
                </div>

                <div className="progress-bar">
                  <span
                    className="progress-fill"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>

              <div className="signal-card light">
                <div className="signal-row">
                  <span>Detection</span>
                  <span className="signal-good">
                    96.4%
                  </span>
                </div>

                <div className="progress-bar alt">
                  <span
                    className="progress-fill alt-fill"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-grid" id="features">
          {features.map((feature) => (
            <article
              className="feature-card"
              key={feature.title}
            >
              <div
                className="feature-icon"
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;