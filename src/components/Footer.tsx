import { footer_data } from "@/page_data/footer_data";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-neutral-300 py-12 mt-20">
      {" "}
      {/* Ensure light text */}
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
        {/* Branding */}
        <div className="flex-shrink-0">
          <h2 className="text-white text-2xl font-extrabold">Rentit</h2>{" "}
          {/* White text */}
          <p className="text-neutral-400 text-sm mt-2">
            Your trusted rental solution platform.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row gap-12">
          {footer_data.links.map((section) => (
            <div
              key={"footer_" + section.title}
              className="flex flex-col text-gray-300 capitalize"
            >
              {/* Section Title */}
              <h2 className="text-gray-500 font-semibold text-lg mb-3">
                {" "}
                {/* Adjust title contrast */}
                {section.title}
              </h2>
              <div className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <Link
                    key={"footer_links_" + link.title}
                    to={link.url || "/"}
                    className="hover:text-purple-400 transition-colors duration-300 text-white"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Divider */}
      <div className="h-[1px] bg-gray-700 w-full my-8"></div>
      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-gray-500">
          {" "}
          {/* Subtle neutral color */}© 2024 RentIT. All Rights Reserved.
        </p>

        {/* Social Icons (Optional Example) */}
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
              <path d="Your Facebook Icon Path Here" />
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
              <path d="Your Twitter Icon Path Here" />
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
              <path d="Your Instagram Icon Path Here" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
