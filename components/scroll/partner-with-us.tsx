"use client";

export default function PartnerWithUs() {
  return (
    <section className="w-full relative max-w-5xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 bg-gray-50 rounded-3xl">
      
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Partner with LEAD
        </h2>

        <p className="text-gray-600 text-lg mb-6 max-w-xl">
          LEAD connects organizations with high-potential students who are already
          developing leadership, technical, and execution skills through real initiatives.
        </p>

        <p className="text-gray-600 text-lg max-w-xl">
          If your organization believes in investing early in future leaders,
          we’d love to explore how we can work together.
        </p>
      </div>

      <form className="bg-white rounded-2xl shadow-xl p-8 space-y-5">
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
          className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-black/90 transition"
        >
          Contact LEAD
        </button>
      </form>

    </section>
  );
}
