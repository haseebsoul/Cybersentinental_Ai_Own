import aiDetectionImage from "../assets/carousel/ai-detection (1).jpg";
import ipAnalysisImage from "../assets/carousel/ip-analysis.png";
import socDashboardImage from "../assets/carousel/soc-dashboard.jpg";
import threatDetectionImage from "../assets/carousel/threat-detection (2).jpg";
import wafImage from "../assets/carousel/waf (2).jpg";

const slides = [
  {
    title: "Web Application Firewall",
    text: "Inspect incoming web requests and help protect applications from common security threats.",
    image: wafImage,
    alt: "Web application firewall security illustration",
  },
  {
    title: "Real-Time Threat Detection",
    text: "Identify suspicious requests and security events as they happen.",
    image: threatDetectionImage,
    alt: "Real-time threat detection dashboard illustration",
  },
  {
    title: "AI-Based Anomaly Detection",
    text: "Analyze unusual behavior and identify patterns that may indicate security threats.",
    image: aiDetectionImage,
    alt: "AI-based anomaly detection visual",
  },
  {
    title: "SOC Security Monitoring",
    text: "Monitor security events, threat activity, and system information through a centralized view.",
    image: socDashboardImage,
    alt: "SOC security monitoring dashboard illustration",
  },
  {
    title: "IP Risk & Security Analysis",
    text: "Analyze IP activity and identify potentially risky sources.",
    image: ipAnalysisImage,
    alt: "IP risk and security analysis illustration",
  },
];

function Carousel() {
  return (
    <section className="carousel-section" id="about">
      <div className="container">
        <div className="section-heading text-center">
          <span className="section-badge">Security Intelligence</span>
          <h2>CyberSentinel-AI Protection Layers</h2>
        </div>

        <div
          id="cyberSentinelCarousel"
          className="carousel slide cyber-carousel"
          data-bs-ride="carousel"
          data-bs-interval="5000"
          data-bs-pause="hover"
        >
          <div className="carousel-indicators">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                data-bs-target="#cyberSentinelCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-label={`Slide ${index + 1}`}
                aria-current={index === 0 ? "true" : undefined}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={slide.title}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div className="row g-0 align-items-center slide-row">
                  <div className="col-lg-6">
                    <div className="carousel-image-wrap">
                      <img
                        src={slide.image}
                        className="d-block w-100 carousel-image"
                        alt={slide.alt}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="carousel-content">
                      <span className="content-tag">Security Layer</span>
                      <h3>{slide.title}</h3>
                      <p>{slide.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#cyberSentinelCarousel"
            data-bs-slide="prev"
            aria-label="Previous slide"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#cyberSentinelCarousel"
            data-bs-slide="next"
            aria-label="Next slide"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
