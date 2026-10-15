import { Github, Instagram, Linkedin, Mail, Youtube } from 'lucide-react';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-1">
      <a className="icon-button" href="mailto:ashishp.292007@gmail.com" aria-label="Email Ashish"><Mail size={15} /></a>
      <a className="icon-button" href="https://github.com/ashish200729" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={15} /></a>
      <a className="icon-button" href="https://x.com/Ashishx29" target="_blank" rel="noopener noreferrer" aria-label="X — @Ashishx29">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l7.3-8.5L.8 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L6.3 3.9H4.5L17.8 20Z" /></svg>
      </a>
      <a className="icon-button" href="https://www.linkedin.com/in/ashish-prajapati-95a77036a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a>
      <button className="icon-button" type="button" disabled aria-label="YouTube — profile not yet linked" title="YouTube — profile not yet linked"><Youtube size={15} /></button>
      <button className="icon-button" type="button" disabled aria-label="Instagram — profile not yet linked" title="Instagram — profile not yet linked"><Instagram size={15} /></button>
    </div>
  );
}
