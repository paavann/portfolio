import { GithubLogo, LinkedinLogo, EnvelopeSimple, Phone, WhatsappLogo } from "phosphor-react";
import MagneticWrap from "@/components/MagneticWrap";

const socialLinks = [
  { icon: GithubLogo, href: "https://github.com/paavann", label: "GitHub" },
  { icon: LinkedinLogo, href: "https://www.linkedin.com/in/h-pavan-489020250/", label: "LinkedIn" },
  { icon: EnvelopeSimple, href: "mailto:pavanh.22826@gmail.com", label: "Email" },
  { icon: Phone, href: "tel:+919113202057", label: "Phone" },
  { icon: WhatsappLogo, href: "https://wa.me/919113202057", label: "WhatsApp" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F2F2F2] py-12 px-8 flex flex-col items-center gap-6">
      <div className="flex row gap-6 items-center justify-center">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <MagneticWrap key={label}>
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[rgb(0_21_36)] hover:text-[rgb(53_211_153)] transition-colors duration-300 block"
            >
              <Icon size={32} weight="bold" />
            </a>
          </MagneticWrap>
        ))}
      </div>
      
      <div className="flex flex-col items-center gap-4">
        <button 
          onClick={scrollToTop}
          className="group relative overflow-hidden border-2 border-[rgb(0_21_36)] rounded-full px-6 py-2 cursor-pointer transition-colors duration-300"
        >
          <span className="absolute top-0 bottom-0 left-0 right-0 bg-[rgb(0_21_36)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
          <span className="relative z-10 font-bold text-sm text-[rgb(0_21_36)] group-hover:text-[#F2F2F2] transition-colors duration-300">
            Back to top
          </span>
        </button>
        
        <p className="font-semibold text-sm text-gray-500">
          © 2026 Pavan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
