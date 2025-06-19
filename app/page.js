// app/page.js
"use client";
import { useRouter } from "next/navigation";
import styles from './Landing.module.css';
import './page.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div id="top" className={styles.landing}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logoRow}>
          <img src="/logo_image.svg" alt="Logo" className={styles.logo} />
          <span className={styles.brand}>Image-Template-Filler</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrap}>
          <img src="/landing_image.png" alt="Hero" className={styles.heroImage} />
        </div>
        <div className={styles.heroText}>
          <h1>
            Convert CSV to <br />
            Custom Images in <br />
            <span className={styles.accent}>Seconds</span>
          </h1>
          <p>
            Transform your CSV data into stunning, personalized images effortlessly. Our intuitive platform allows you to upload your CSV, customize templates, and generate high-quality visuals in bulk.
          </p>
          <button
            className={styles.cta}
            onClick={() => router.push('/upload')}
          >
            Upload CSV &amp; Template
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>How it works</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.icon}><img src="/upload_image.svg" alt="Upload" /></span>
            <h3>Upload</h3>
            <p>Upload your CSV file and select a template.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}><img src="/edit_image.svg" alt="Edit" /></span>
            <h3>Edit Placeholders</h3>
            <p>Customize your template by mapping CSV columns to image placeholders.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.icon}><img src="/download_image.svg" alt="Download" /></span>
            <h3>Download ZIP</h3>
            <p>Download a ZIP file containing your generated images.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <h3 className={styles.featuresTitle}>
          Powerful Features to Enhance Your Workflow
        </h3>
        <p className={styles.featuresDesc}>
          Our platform is designed to streamline your image generation process, offering a range of features to meet your needs.
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <img src="/content_image.svg" alt="Content Editing" className={styles.cardImage} />
            <h4>Content Editing</h4>
            <p>Generate hundreds of images from a single CSV file.</p>
          </div>
          <div className={styles.card}>
            <img src="/batch_image.svg" alt="Batch Generation" className={styles.cardImage} />
            <h4>Batch Generation</h4>
            <p>Edit the contents of the uploaded CSV file.</p>
          </div>
          <div className={styles.card}>
            <img src="/eye_image.svg" alt="Instant Previews" className={styles.cardImage} />
            <h4>Instant Previews</h4>
            <p>Preview your images in real-time before downloading.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Data?</h2>
        <p className={styles.ctaDesc}>Start creating stunning images from your CSV files today.</p>
        <button className={styles.ctaButton}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        >
          Go Up
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <img src="/logo_image.svg" alt="Logo" className={styles.footerLogo} />
          <span className={styles.footerBrand}>Image-Template-Filler</span>
        </div>
        <a href="https://github.com/alvin-dennis/Image-Template-Filler" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
          Github
        </a>
      </footer>
    </div>
  );
}
