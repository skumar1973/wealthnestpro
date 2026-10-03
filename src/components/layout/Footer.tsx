"use client";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { use, useState } from "react";

import Container from "../ui/Container";
import VisitorCounter from "@/components/visitor-counter";

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };
  return (
    <footer className="bg-slate-50 text-slate-600 dark:bg-slate-900 dark:text-slate-300 py-12 px-6 transition-colors duration-200">
      <Container>
         {/* 3-Column Grid Container  */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-200 dark:border-slate-800 pb-8">
           {/* Column 1: Company Info & Copyright  */}
          <div className="flex flex-col justify-between">
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
              <Image 
                src="/logo.svg" 
                alt="Company Logo" 
                width={80} 
                height={80} 
                priority
              />
              </Link>
              <div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold mb-3">WealthNestPro.in</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                    Trusted loan guidance with expert support and lender access.
                  </p>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 md:mt-0"> © {year} WealthNestPro.in - All rights reserved.</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 md:mt-0">Goverment of India, Ministry of Micro, Small amd Medium Experprise</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 md:mt-0">Registration : UDYAM-HR-05-0101024</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 md:mt-0">GST : 06AXKPR8594B1Z0</p>
              <VisitorCounter />
          </div> 

        
         {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</a></li>
              <li><a href="/services" className="hover:text-slate-900 dark:hover:text-white transition-colors">Services</a></li>
              <li><a href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="/disclaimer" className="hover:text-slate-900 dark:hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
          {/* Column 3: Follow Us */}
              <div>
                <h3 className="text-slate-900 dark:text-white font-semibold mb-4 text-sm uppercase tracking-wider">Follow Us</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Stay connected on our social channels.</p>
                <div className="flex gap-x-4">
                  {/* Twitter/X Icon  */}
                  <a href="https://twitter.com" className="p-2 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white rounded-full transition-colors" aria-label="Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                <p >Office Location</p>
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-location" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="#0a3d62" d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/>
                </svg> */}
                <a href="https://www.google.com/maps/search/?api=1&query=Emerald+Plaza%2C+Golf+Course+Ext+Rd%2C+Sector+65%2C+Gurugram%2C+Haryana+122101" target="_blank" rel="noopener">Unit no 418, Emerald Plaza, Golf Course Ext Rd, Sector-65, Gurugram, Haryana - 122101 (INDIA)</a>
                
                <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Emerald+Plaza%2C+Golf+Course+Ext+Rd%2C+Sector+65%2C+Gurugram%2C+Haryana+122101" target="_blank" rel="noopener" aria-label="Open map">
                  {/* <!-- map icon --> */}
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-map" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path fill="#0a3d62" d="M20.5 3l-5.5 2.2L9 3 3.5 5v14l6-2.2 6 2.2 5.5-2.2V3zM9 19.8l-4.5 1.6V6.2L9 4.6v15.2zM15 19.8V4.6l4.5 1.6v15.2L15 19.8z"/>
                  </svg> */}
                </a>
                <p>
                Mobile: 
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-phone" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path fill="#0a3d62" d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 01.99-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24.99l-2.21 2.25z"/>
                </svg> */}
                <a href="tel:+919818933958">+91 981-893-3958</a>
              </p>
              <p>
                Email: support@wealthnestpro.in
              </p>
                </div>
              </div>
            </div>
          <div>
          </div>
            <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
                  <div className="mt-6 flex justify-center">
                  <span>Developed By Northstar Engineering.</span>
                    <a href="https://engineering-services-site.onrender.com/" target="_blank"> click here to visit website</a> 
                  </div>
            </div>

</Container>
</footer>
);
}
