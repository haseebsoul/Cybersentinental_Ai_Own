import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer" id="get-started">
      <div className="container footer-shell">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <div className="brand-block">
              <div className="brand-mark" aria-hidden="true">🛡️</div>
              <div>
                <h3>CyberSentinel-AI</h3>
              </div>
            </div>
            <p className="footer-description">
              AI-powered Web Application Firewall and Intrusion Detection System for
              cybersecurity learning, threat detection, and security research.
            </p>
          </div>

          <div className="col-lg-3">
            <h4 className="footer-title">Navigate</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#how-it-works">How It Works</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 text-lg-end ">
            <div className="footer-tagline">Protect. Detect. Analyze.</div>
            <p className="copyright">© 2026 CyberSentinel-AI. All rights reserved.</p>
           </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
