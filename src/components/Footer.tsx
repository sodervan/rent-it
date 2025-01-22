import { footer_data } from "@/page_data/footer_data";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-neutral-200 py-12 mt-20">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Branding and Description */}
        <div className="flex-shrink-0 max-w-xs">
          <h2 className="text-white text-2xl font-extrabold mb-4">RentIT</h2>
          <p className="text-neutral-300 text-sm">
            Your trusted rental solution platform.
          </p>
          {/* Trustpilot Section */}
          <div className="mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <p className="text-neutral-300 text-sm mt-1">
              TrustScore 4.6 | 5,943 reviews
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footer_data.links.map((section) => (
            <div key={"footer_" + section.title} className="flex flex-col">
              <h2 className="text-neutral-400 font-semibold text-lg mb-3">
                {section.title}
              </h2>
              <div className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <Link
                    key={"footer_links_" + link.title}
                    to={link.url || "/"}
                    className="text-neutral-300 hover:text-purple-400 transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Get the App and Payment Options */}
        <div className="flex flex-col gap-4">
          <h2 className="text-neutral-400 font-semibold text-lg">
            Get the App
          </h2>
          <div className="flex gap-2">
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              App Store
            </button>
            <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
              Google Play
            </button>
          </div>
          <h2 className="text-neutral-400 font-semibold text-lg mt-4">
            Payment Options
          </h2>
          <div className="flex gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
              alt="Visa"
              className="h-8"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
              alt="MasterCard"
              className="h-8"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-gray-700 w-full my-8"></div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-neutral-400">
          © 2024 RentIT. All Rights Reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700 hover:bg-purple-500 transition-colors duration-300"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.733 0 1.325-.592 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700 hover:bg-purple-500 transition-colors duration-300"
            aria-label="Twitter"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-700 hover:bg-purple-500 transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
