import React from "react";

function Contact() {
  return (

    <div>

      {/* HERO SECTION */}
      <div
        className="h-[350px] flex flex-col justify-center items-center text-center mt-16"
        style={{
          backgroundImage: "url('/contact-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >

        <h1 className="text-5xl font-semibold">
          Contact Us
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          we love conversations. let us talk!
        </p>

      </div>



      {/* CONTACT INFO SECTION */}
      <div className="bg-[#4656A9] py-20 px-10 mt-16">

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT SIDE TEXT */}
          <div className="text-white space-y-6 text-lg">

            <p>
              <span className="font-semibold">Address :</span> Bahadurgarh, Haryana 124507
            </p>

            <p>
              <span className="font-semibold">Phone Number :</span> (+91) 7068507857
            </p>

            <p>
              <span className="font-semibold">Email-id :</span> contact@scientisticera.com
            </p>

          </div>


          {/* RIGHT IMAGE */}
          <div>

            <img
              src="/contact.jpg"
              className="rounded-lg w-full h-[260px] object-cover"
            />

          </div>
        </div>
      </div>
    </div>

    

  );
}

export default Contact;