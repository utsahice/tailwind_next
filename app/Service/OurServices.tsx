import Image from "next/image";

export default function OurServices() {
  return (
    <section className="w-full py-10 px-10 bg-lime flex justify-center">
      <div className="max-w-7xl w-full grid items-center justify-center grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <p className="text-[var(--text-14)] tracking-wide text-text font-termina">
            HOW WE HELP
          </p>

          <h2 className="font-ivy leading-none text-[52px]">OUR SERVICES</h2>

          <p className="font-termina max-w-md text-text leading-6">
            Glazed Gloss Creative Collective was founded by a seasoned brand
            builder driven by a singular purpose: to accelerate your brand
            vision from inception to fruition and to accelerate brand growth.
          </p>

          <div className="flex gap-4 mt-4">
            <button className="btn-primary font-termina">HIRE GLAZED</button>
            <button className="btn-outline font-termina">VIEW ALL SERVICES</button>
          </div>
        </div>
        {/* RIGHT SIDE IMAGES (EXACT SAME DESIGN AS REFERENCE) */}
<div className="relative w-full">
  <div className="grid grid-cols-2 gap-5 relative w-[85%]">

    {/* 1 — TOP-LEFT LARGE */}
    <div>
      <Image
        src="/service_1.jpg"
        alt="service 1"
        width={500}
        height={400}
        className="w-full h-[240px] object-cover rounded-2xl"
      />
    </div>

    {/* 2 — TOP-RIGHT GROUP PHOTO */}
    <div className="relative top-4 w-[120%]">
      <Image
        src="/service_4.jpg"
        alt="service 2"
        width={500}
        height={400}
        className="w-full h-[180px] object-cover rounded-2xl"
      />
    </div>

    {/* 3 — BOTTOM-LEFT FRUITS PHOTO + WHITE CARD */}
    <div className="relative left-17 -top-2 w-[85%]">
      <Image
        src="/service_6.jpg"
        alt="service 3"
        width={500}
        height={400}
        className="w-full h-[200px] object-cover rounded-2xl"
      />

      {/* White floating card */}
      <div className="absolute -top-7 -left-15 bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
        <Image
          src="/service_5.jpg"
          alt="avatar"
          width={55}
          height={55}
          className="rounded-md"
        />
        <div className="text-[10px] leading-tight">
          <p className="text-text font-ivy">LOREM IPSUM</p>
          <p className="text-text font-termina">Lorem Ipsum</p>
        </div>
      </div>
    </div>

    {/* 4 — BOTTOM-RIGHT HAND + PHONE (SHIFTED UP & RIGHT EXACTLY LIKE DESIGN) */}
    <div className="relative -top-[48px] left-[41px] w-[85%]">
      <Image
        src="/service_2.jpg"
        alt="service 4"
        width={500}
        height={400}
        className="w-full h-[200px] object-cover rounded-2xl"
      />
    </div>

  </div>
          <div className="flex flex-wrap gap-4 mt-8">
            {[
              "CREATIVE & MARKETING",
              "FORMULATION IDEATION & ASSORTMENT CONCEPT",
              "THE SHOWROOM/PRODUCTION",
              "SALES & DISTRIBUTION",
              "FULFILMENT & OPERATIONS",
            ].map((item, i) => (
              <button
                key={i}
                className="border border-gray-400 text-[10px] text-black font-termina rounded-10 px-5 py-2 hover:bg-gray-100 transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



// import Image from "next/image";

// export default function OurServices() {
//   return (
//     <section className=" w-full px-10 pb-15 bg-[var(--color-bg)] flex justify-center">
//       <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
//         <div className="flex flex-col gap-6">
//           <p className="text-[var(--text-14)] tracking-wide text-text font-termina">
//             HOW WE HELP
//           </p>

//           <h2 className="font-ivy leading-none text-[52px] ">
//             OUR SERVICES
//           </h2>

//           <p className=" font-termina max-w-md text-text leading-6">
//             Glazed Gloss Creative Collective was founded by a seasoned brand
//             builder driven by a singular purpose: to accelerate your brand
//             vision from inception to fruition and to accelerate brand growth.
//           </p>

//           <div className="flex gap-4 mt-4">
//             <button className="btn-primary font-termina">HIRE GLAZED</button>
//             <button className="btn-outline font-termina">VIEW ALL SERVICES</button>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-6 relative">
//           <div className="card">
//             <Image
//               src="/service_1.jpg"
//               width={500}
//               height={400}
//               alt="service 1"
//               className="w-full h-160 object-cover rounded-10"
//             />
//           </div>

//           <div className="card flex items-center justify-center">
//             <Image
//               src="/service_4.jpg"
//               width={500}
//               height={400}
//               alt="service 2"
//               className="w-full h-130 object-cover rounded-10"
//             />
//           </div>

//           <div className="relative card">
//             <Image
//               src="/service_6.jpg"
//               width={500}
//               height={400}
//               alt="service 3"
//               className="w-200 h-130 object-cover rounded-10"
              
//             />
//             <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-md p-3 flex items-center gap-3">
//               <Image
//                 src="/service_5.jpg"
//                 alt="avatar"
//                 width={60}
//                 height={60}
//                 className="rounded-4 "
//               />
//               <div className="text-[10px]">
//                 <p className="text-text font-ivy">Lorem Ipsum</p>
//                 <p className="text-text font-termina">Lorem ipsum</p>
//               </div>
//             </div>
//           </div>

//           <div className="card">
//             <Image
//               src="/service_2.jpg"
//               width={500}
//               height={400}
//               alt="service 4"
//               className="w-200 h-130 object-cover rounded-10"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
