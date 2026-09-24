import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg cyber-navbar">
      <div className="container">
        <a className="navbar-brand cyber-brand" href="#home">
          <span className="brand-mark">🛡️</span>
          CyberSentinel-AI
        </a>

        <button
          className="navbar-toggler cyber-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto cyber-nav">
            <li className="nav-item">
              <a className="nav-link cyber-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link cyber-link" href="#features">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link cyber-link" href="#how-it-works">
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link cyber-link" href="#about">About</a>
            </li>
          </ul>

          <a className="btn cyber-btn" href="#get-started">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;