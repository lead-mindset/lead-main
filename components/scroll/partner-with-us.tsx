"use client";

export default function PartnerWithUs() {
  return (
    <>

<div className=" relative flex flex-col text-white text-center  justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Partner with LEAD
        </h2>

        <p className=" text-lg">
          If your organization believes in investing early in high-potential future leaders,
          we’d love to explore how we can work together.
        </p>
      </div>

    <section className="w-full relative max-w-5xl mx-auto px-6 py-24 flex gap-16 text-white rounded-3xl">
      <div className="flex flex-col basis-2/5  justify-center">
</div>
      

      <form className="bg-white/10 rounded-2xl basis-3/5 shadow-xl p-8 space-y-5">
        <div>
          <label className="text-sm font-medium">Organization Name</label>
          <input
            type="text"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Subject</label>
          <input
            type="text"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            rows={4}
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          className="w-fit px-5 bg-black text-white py-3 rounded-xl font-semibold hover:bg-black/90 transition"
        >
          Send Message
        </button>
      </form>

    </section>
     </>
  );
}
