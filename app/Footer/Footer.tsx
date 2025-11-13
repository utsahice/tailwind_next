import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTiktok, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
<div className="max-w-7xl mx-auto px-4">
  {/* ------------------ Section 1: Social Media Movement ------------------ */}
  <div className="text-center py-12 flex flex-col items-center">
    <h1 className="text-4xl font-semibold mb-6">
      JOIN OUR MOVEMENT ON SOCIAL
    </h1>

    {/* ✅ FULLY CENTERED GRID CONTAINER */}
    <div className="flex justify-center items-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center place-items-center mx-auto" style={{ width: "fit-content" }}>
        
        {/* 1st Column */}
        <div>
          <Image
            src="/Footer/1.png"
            alt="Image 1"
            width={200}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>

        {/* 2nd Column */}
        <div className="flex flex-col gap-4">
          <Image
            src="/Footer/4.png"
            alt="Image 2"
            width={200}
            height={150}
            className="object-cover rounded-lg"
          />
          <Image
            src="/Footer/5.png"
            alt="Image 3"
            width={200}
            height={150}
            className="object-cover rounded-lg"
          />
        </div>

        {/* 3rd Column */}
        <div>
          <Image
            src="/Footer/3.png"
            alt="Image 4"
            width={200}
            height={300}
            className="object-cover rounded-lg"
          />
        </div>

        {/* 4th Column */}
        <div className="flex flex-col gap-4">
          <Image
            src="/Footer/2.png"
            alt="Image 6"
            width={200}
            height={150}
            className="object-cover rounded-lg"
          />
          <Image
            src="/Footer/6.png"
            alt="Image 7"
            width={200}
            height={150}
            className="object-cover rounded-lg"
          />
        </div>

      </div>
    </div>
  </div>

      {/* ------------------ Section 2: Newsletter + Explore (from image) ------------------ */}
      <div className="bg-[#f8f6f2] py-12 px-6 md:px-16 lg:px-24 text-[#4a3f35]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {/* LEFT: Newsletter */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider mb-3">JOIN OUR NEWSLETTER</h3>
            <p className="text-sm text-gray-600 mb-4">
              Download your Free Beauty Content Calendar when you sign up
            </p>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full border-b border-gray-400 bg-transparent py-2 focus:outline-none"
              />
              <div className="flex items-center border-b border-gray-400">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-transparent py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#d8ff33] text-black text-sm font-semibold px-4 py-2 rounded-md ml-3 hover:bg-lime-400 transition"
                >
                  SUBSCRIBE
                </button>
              </div>
            </form>
          </div>

          {/* MIDDLE: Logo */}
          <div className="flex flex-col items-center justify-center">
            <img
              src="/logo.png" // replace with your logo path
              alt="Glazed Gloss Logo"
              className="w-24 mb-2"
            />
            <p className="text-xs uppercase tracking-widest">Glazed Gloss Creative Collective</p>
          </div>

          {/* RIGHT: Explore Links */}
          <div className="grid grid-cols-2 text-sm gap-y-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-[13px] mb-2">EXPLORE GLAZED GLOSS</h4>
              <p>About</p>
              <p>Contact</p>
              <p>Podcast</p>
              <p>Social Media Creatives</p>
            </div>

            <div className="space-y-2 mt-6 md:mt-0">
              <p>Corporate Careers</p>
              <p>Privacy Policy</p>
              <p>Download Content Calendar</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-12 pt-6 text-center">
          <div className="flex justify-center gap-5 mb-4 text-[#5c473a]">
            <FaInstagram className="hover:text-black transition" size={18} />
            <FaFacebookF className="hover:text-black transition" size={18} />
            <FaTiktok className="hover:text-black transition" size={18} />
            <FaTwitter className="hover:text-black transition" size={18} />
            <FaYoutube className="hover:text-black transition" size={18} />
            <FaLinkedinIn className="hover:text-black transition" size={18} />
          </div>

          <p className="text-xs text-gray-600">
            <span className="mr-2">♡ // TECHYSCOUTS</span> © 2024 Glazed Gloss Creative
          </p>
        </div>
      </div>

      {/* ------------------ Section 3: Existing White Footer ------------------ */}
      <footer className="py-12 text-center bg-white">
        <p className="text-gray-500 text-sm">© 2024 Glazed Gloss Creative Collective</p>
      </footer>
    </div>
  );
};

export default Footer;
