import "./HowItWorks.css";

const processSteps = [
  {
    icon: "🔍",
    title: "Inspect",
    description:
      "Incoming requests are examined for suspicious patterns, payloads, and security indicators.",
  },
  {
    icon: "🤖",
    title: "Detect",
    description:
      "Security rules and anomaly analysis help identify potentially malicious behavior.",
  },
  {
    icon: "🛡️",
    title: "Respond",
    description:
      "Threats c gan be blocked or flagged while security events are recorded for monitoring.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <span className="section-badge">HOW CYBERSENTINEL WORKS</span>
            <h2 className="section-title">From Suspicious Request to Security Response</h2>
            <p className="section-description">
              CyberSentinel-AI inspects web requests, analyzes behavior, detects
              threats, and records security events to help protect modern web
              applications from malicious activity.
            </p>
          </div>
        </div>

        <div className="row g-4 process-grid">
          {processSteps.map((step) => (
            <div className="col-md-4" key={step.title}>
              <article className="process-card">
                <div className="process-icon" aria-hidden="true">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="info-panel">
          <div className="info-panel-inner">
            <h3>Built for Security Learning</h3>
            <p>
              CyberSentinel-AI combines WAF protection, intrusion detection,
              anomaly analysis, IP risk assessment, and SOC-style monitoring into
              one learning-focused platform.
            </p>
                <div className="cta-wrap text-center">
                <a href="#features" className="btn cta-button">
                    Explore Security Features
                </a>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
