import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Discover", href: "/#featured" },
  { label: "Upload", href: "/upload" },
  { label: "About", href: "/#how-it-works" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "SoundCloud", href: "https://soundcloud.com/" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand" href="/" aria-label="SONORA home">
            <span className="sonora-mark" aria-hidden="true"><span /><span /><span /><span /></span>
            <span className="brand-word">SONORA<span className="brand-period">.</span></span>
          </Link>
          <p>The world has a sound.<br />Come a little closer.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <span className="footer-nav-label">THE ATLAS</span>
          {footerLinks.map((link) => <Link href={link.href} key={link.label}>{link.label}<ArrowUpRight size={12} /></Link>)}
        </nav>
        <nav className="footer-nav footer-legal" aria-label="Legal">
          <span className="footer-nav-label">SMALL PRINT</span>
          <Link href="/privacy">Privacy<ArrowUpRight size={12} /></Link>
          <Link href="/terms">Terms<ArrowUpRight size={12} /></Link>
          <Link href="mailto:hello@sonora.world?subject=SONORA%20hello">Contact<ArrowUpRight size={12} /></Link>
        </nav>
        <div className="footer-socials">
          <span className="footer-nav-label">ELSEWHERE ON THE INTERNET</span>
          {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={12} /></a>)}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© SONORA</span>
        <span className="footer-status"><i /> A WORLD IN SOUND</span>
        <span>Made with ears open.</span>
      </div>
      <div className="footer-credit">
        Globe imagery: NASA Blue Marble. Featured recordings retain their original credits and licenses in each preview.
        <a href="https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map/" target="_blank" rel="noreferrer"> NASA source <ArrowUpRight size={11} /></a>
      </div>
    </footer>
  );
}
