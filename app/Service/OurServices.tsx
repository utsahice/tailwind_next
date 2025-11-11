import Image from "next/image";

export default function OurServices() {
  return (
    <section className="w-full px-10 py-0 bg-[var(--color-bg)] flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-6">
          <p className="text-[var(--text-14)] tracking-wide text-text font-termina">
            HOW WE HELP
          </p>

          <h2 className="font-ivy leading-none text-[52px] ">
            OUR SERVICES
          </h2>

          <p className=" font-termina max-w-md text-text leading-6">
            Glazed Gloss Creative Collective was founded by a seasoned brand
            builder driven by a singular purpose: to accelerate your brand
            vision from inception to fruition and to accelerate brand growth.
          </p>

          <div className="flex gap-4 mt-4">
            <button className="btn-primary font-termina">HIRE GLAZED</button>
            <button className="btn-outline font-termina">VIEW ALL SERVICES</button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 relative">
          <div className="card">
            <Image
              src="/service_1.jpg"
              width={500}
              height={400}
              alt="service 1"
              className="w-full h-160 object-cover rounded-10"
            />
          </div>

          <div className="card flex items-center justify-center">
            <Image
              src="/service_4.jpg"
              width={500}
              height={400}
              alt="service 2"
              className="w-full h-130 object-cover rounded-10"
            />
          </div>

          <div className="relative card">
            <Image
              src="/service_6.jpg"
              width={500}
              height={400}
              alt="service 3"
              className="w-200 h-130 object-cover rounded-10"
              
            />
            <div className="absolute -top-6 -left-6 bg-white rounded-xl shadow-md p-3 flex items-center gap-3">
              <Image
                src="/service_5.jpg"
                alt="avatar"
                width={60}
                height={60}
                className="rounded-4 "
              />
              <div className="text-[10px]">
                <p className="text-text font-ivy">Lorem Ipsum</p>
                <p className="text-text font-termina">Lorem ipsum</p>
              </div>
            </div>
          </div>

          <div className="card">
            <Image
              src="/service_2.jpg"
              width={500}
              height={400}
              alt="service 4"
              className="w-200 h-130 object-cover rounded-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
