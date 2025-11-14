import Image from "next/image";
import {
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function ExploreGlazedGloss() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-ivy text-black font-semibold mb-6">
          JOIN OUR MOVEMENT ON SOCIAL
        </h1>
      </div>
      <div className="w-full px-12">
        <div
          className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-4 
    mx-auto
  ">
          <div>
            <Image
              src="/Footer/1.png"
              alt="Image 1"
              width={500}
              height={700}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Image
              src="/Footer/4.png"
              alt="Image 2"
              width={500}
              height={350}
              className="w-full h-full object-cover rounded-lg"
            />
            <Image
              src="/Footer/5.png"
              alt="Image 3"
              width={500}
              height={350}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div>
            <Image
              src="/Footer/3.png"
              alt="Image 4"
              width={500}
              height={700}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Image
              src="/Footer/2.png"
              alt="Image 6"
              width={500}
              height={350}
              className="w-full h-full object-cover rounded-lg"
            />
            <Image
              src="/Footer/6.png"
              alt="Image 7"
              width={500}
              height={350}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="py-12 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-semibold text-[20px] text-sm font-ivy tracking-wider mb-3">
              JOIN OUR NEWSLETTER
            </h3>
            <p className="text-black text-[14px] font-termina mb-4">
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
                  className="btn-primary font-termina px-4 py-2 rounded-md ml-3 ">
                  SUBSCRIBE
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/logo.png"
              alt="Glazed Gloss Logo"
              className="w-140 mb-2"
            />
          </div>

          <div className="grid grid-cols-2 font-termina uppercase text-[8px]  text-black gap-y-2">
            <div className="space-y-2 mr-9">
              <h4 className="font-ivy  text-[12px]  text-2XL mb-2">
                EXPLORE GLAZED GLOSS
              </h4>
              <p>About</p>
              <p>Contact</p>
              <p>Podcast</p>
              <p>Social Media Creatives</p>
            </div>

            <div className="space-y-2 mt-4 md:mt-8">
              <p>Corporate Careers</p>
              <p>Privacy Policy</p>
              <p>Download Content Calendar</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-20 px-10 flex justify-between items-center">
        <p className="flex items-center gap-2 text-black uppercase font-termina text-[10px]">
          <FaHeart className="inline-block w-3.5 h-3.5 md-3" />
          <span>//Techysouts</span>
          2024 Glazed Gloss. All Rights Reserved.
        </p>

        <div className="flex items-center gap-3">
          {[
            FaInstagram,
            FaFacebookF,
            FaTiktok,
            FaTwitter,
            FaYoutube,
            FaLinkedinIn,
          ].map((Icon, i) => (
            <div
              key={i}
              className="w-10 h-10 rounded-full bg-sm flex items-center justify-center">
              <Icon
                className="text-white hover:text-black transition"
                size={18}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
