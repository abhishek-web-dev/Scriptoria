import React from "react";

function About() {
  return (

    <div className="px-10 py-16">
        

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-10">
        About Universal E-Magazine
      </h1>

      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto py-16">

  {/* Left Content */}
  <div>

    <h1 className="text-4xl font-semibold leading-snug mb-6">
      Webinar, Journal, Academician & Researcher Awards and E-Magazine
    </h1>

    <p className="text-gray-600 leading-relaxed">
      Inaugurated by “Honourable Shripad Yesso Naik Ji” Minister of State for
      New & Renewable Energy, Government of India Scientific Era is a prominent
      platform that supports global academic and research excellence through its
      key services.
    </p>

    <p className="text-gray-600 mt-4 leading-relaxed">
      It offers Webinars for real-time knowledge sharing, hosts Academician &
      Researcher Awards to recognize outstanding achievements, and publishes an
      E-Magazine to disseminate the latest research and insights.
    </p>

    <p className="text-gray-600 mt-4 leading-relaxed">
      These services foster collaboration, celebrate innovation, and help connect
      the academic community worldwide.
    </p>

  </div>


  {/* Right Image */}
  <div>

    <img
      src="/about.jpg"
      alt="Research"
      className="rounded-lg w-full h-[300px] object-cover"
    />

  </div>

</div>

      {/* Intro Section */}
      <div className="max-w-5xl mx-auto text-gray-700 space-y-6 text-lg">

        <p>
          Universal E-Magazine is a modern digital platform dedicated to 
          sharing knowledge, research, and innovative ideas in the fields of 
          pharmaceutical and life sciences.
        </p>

        <p>
          Our goal is to provide a space where researchers, students, 
          professionals, and innovators can publish and explore valuable 
          scientific content in an easy-to-read magazine format.
        </p>

        <p>
          We believe that knowledge should be accessible to everyone. 
          Our platform promotes open communication, academic collaboration, 
          and innovative thinking across multiple disciplines.
        </p>

        <p>
          Through our E-Magazine we encourage submissions including research 
          articles, reviews, case studies, and scientific discussions that 
          contribute to the advancement of healthcare and pharmaceutical science.
        </p>

      </div>

      {/* Mission Section */}
      <div className="max-w-5xl mx-auto mt-16">

        <h2 className="text-2xl font-semibold mb-4">
          Our Mission
        </h2>

        <p className="text-gray-700 text-lg">
          Our mission is to create a global platform that connects scientific 
          communities, encourages innovation, and promotes the sharing of 
          reliable knowledge that can positively impact healthcare and society.
        </p>

      </div>

      {/* Vision Section */}
      <div className="max-w-5xl mx-auto mt-10">

        <h2 className="text-2xl font-semibold mb-4">
          Our Vision
        </h2>

        <p className="text-gray-700 text-lg">
          We aim to become a trusted source of academic and scientific content 
          where readers can easily discover meaningful research and authors can 
          showcase their ideas to a global audience.
        </p>
      </div>
    </div>

  );
}

export default About;