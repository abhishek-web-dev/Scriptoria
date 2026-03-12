import React, { useState } from "react";

function Home() {

    const [popup, setPopup] = useState(null);

    const openPopup = (article) => {
        setPopup(article);
    };

    const closePopup = () => {
        setPopup(null);
    };

    return (
    <>
            {/* Hero Section */}
            <section className="relative w-full h-[30vh] md:h-[50vh] lg:h-[70vh]">

                <img
                    src="/hero.jpg"
                    alt="hero"
                    className="absolute w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute left-6 bottom-16 md:left-12 md:bottom-24 lg:left-20 lg:bottom-32 text-white max-w-xl">

                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        Open for multidisciplinary submissions in pharma and life sciences
                    </h1>

                    <button className="border border-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-white hover:text-black transition">
                        Read Blog
                    </button>

                </div>

            </section>


            {/* About Section */}
            <section className="bg-gray-100 py-20">

                <div className="max-w-5xl mx-auto text-center px-6">

                    <h2 className="text-4xl font-semibold text-gray-800 mb-8">
                        About us
                    </h2>

                    <p className="text-gray-600 leading-8 text-lg">
                        Inaugurated by “Honourable Shripad Yesso Naik Ji” Minister of State for New & Renewable Energy, Government of India Scientific Era is a prominent platform that supports global academic and research excellence through its key services.
                    </p>

                </div>

            </section>


            {/* New Articles Section */}
            <section className="bg-gray-100 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-4xl font-semibold text-center mb-12">
                        New Articles
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Card 1 */}
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">

                            <img src="/article1.jpg" className="w-full h-64 object-cover" />

                            <div className="p-6">

                                <h3 className="text-xl font-semibold mb-4">
                                    Structured like a magazine for broader readability and impact
                                </h3>

                                <button
                                    onClick={() => openPopup("article1")}
                                    className="border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white transition"
                                >
                                    Read More
                                </button>

                            </div>

                        </div>


                        {/* Card 2 */}
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">

                            <img src="/article2.jpg" className="w-full h-64 object-cover" />

                            <div className="p-6">

                                <h3 className="text-xl font-semibold mb-4">
                                    Freely Accessible and Reader Friendly Format
                                </h3>

                                <button
                                    onClick={() => openPopup("article2")}
                                    className="border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white transition"
                                >
                                    Read More
                                </button>

                            </div>

                        </div>


                        {/* Card 3 */}
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">

                            <img src="/article3.jpg" className="w-full h-64 object-cover" />

                            <div className="p-6">

                                <h3 className="text-xl font-semibold mb-4">
                                    Promotes academic publishing with industry relevance
                                </h3>

                                <button
                                    onClick={() => openPopup("article3")}
                                    className="border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white transition"
                                >
                                    Read More
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Popup Modal */}
            {popup === "article1" && (

                <div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

                    <div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

                        {/* Close Button */}
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-xl"
                        >
                            ✖
                        </button>

                        {/* Title */}
                        <h2 className="text-3xl font-semibold mb-4">
                            Structured like a magazine for broader readability and impact
                        </h2>

                        {/* Meta */}
                        <div className="text-gray-500 flex gap-6 mb-6 text-sm">

                            <span>👤 subadmin</span>

                            <span>📁 Pharmacy/ Drug Discovery & Innovation</span>

                            <span>📅 2025-07-26</span>

                            <span>👁 2502</span>

                        </div>

                        {/* Image */}
                        <img
                            src="/article1.jpg"
                            className="w-full h-[400px] object-cover rounded"
                        />

                        {/* Content Layout */}
                        <div className="grid md:grid-cols-3 gap-10 mt-8">

                            {/* Left Content */}
                            <div className="md:col-span-2 space-y-4 text-gray-700">

                                <p>
                                    Our platform is structured like a modern scientific magazine,
                                    designed to make cutting-edge pharmaceutical and life science research accessible,
                                    engaging, and impactful.
                                </p>

                                <p>
                                    We blend academic rigor with reader-friendly formats to reach a diverse audience—
                                    researchers, practitioners, students, and innovators alike.
                                </p>

                                <p>
                                    Each issue features a curated mix of original research,
                                    expert reviews, insightful case studies, and short communications presented
                                    in a clear, concise, and visually appealing manner.
                                </p>

                                <p>
                                    Interdisciplinary content that merges science,
                                    technology, and healthcare innovation is especially encouraged.
                                </p>

                                <p>
                                    Every submission undergoes peer review to ensure quality and credibility.
                                </p>

                                <p>
                                    Our mission is to amplify scientific voices and inspire innovation for global health impact.
                                </p>

                                {/* Comments */}
                                <div className="mt-10">

                                    <h3 className="text-xl font-semibold mb-4">
                                        Comments (0)
                                    </h3>

                                    <p className="text-gray-500 mb-6">
                                        No comments found.
                                    </p>

                                    <h3 className="text-xl font-semibold mb-4">
                                        Leave a Comment
                                    </h3>

                                    <form className="space-y-4">

                                        <div className="grid md:grid-cols-2 gap-4">

                                            <input
                                                type="text"
                                                placeholder="Name"
                                                className="border p-3 rounded w-full"
                                            />

                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border p-3 rounded w-full"
                                            />

                                        </div>

                                        <textarea
                                            placeholder="Message"
                                            className="border p-3 rounded w-full h-32"
                                        />

                                        <button className="border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white">
                                            Submit
                                        </button>

                                    </form>

                                </div>

                            </div>

                            {/* Sidebar */}
                            <div>

                                <h3 className="text-xl font-semibold mb-4">
                                    Recent Articles
                                </h3>

                                <ul className="space-y-3 text-gray-600">

                                    <li>• Open for multidisciplinary submissions in pharma and life sciences</li>

                                    <li>• Ideal platform for innovative thinkers and emerging voices</li>

                                    <li>• Promotes academic publishing with industry relevance</li>

                                    <li>• Freely Accessible and Reader Friendly Format</li>

                                    <li>• Structured like a magazine for broader readability and impact</li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

            )}

  {popup === "article2" && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

<div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

<button
onClick={closePopup}
className="absolute top-4 right-4 text-xl"
>
✖
</button>

<h2 className="text-3xl font-semibold mb-4">
Freely Accessible and Reader-Friendly Format
</h2>

<div className="text-gray-500 flex gap-6 mb-6 text-sm">

<span>👤 admin</span>
<span>📁 Pharmacy / Open Access Publications</span>
<span>📅 2021-06-30</span>
<span>👁 2058</span>

</div>

<img
src="/article2.jpg"
className="w-full h-[400px] object-cover rounded"
/>

<div className="grid md:grid-cols-3 gap-10 mt-8">

{/* Article Content */}
<div className="md:col-span-2 space-y-4 text-gray-700">

<p>
Our platform is designed to be completely open access,
ensuring that high-quality pharmaceutical and life science research
is freely available to everyone.
</p>

<p>
We believe in breaking down paywall barriers so that students,
professionals, and researchers around the world can benefit equally.
</p>

<p>
All articles are published in a clean, readable layout with
minimal distractions and mobile-friendly design.
</p>

<p>
Our reader-first approach ensures content is easy to navigate,
understand, and cite for academic or practical use.
</p>

<p>
We support both HTML and downloadable PDF formats to enhance
accessibility across devices and preferences.
</p>

<p>
Whether you’re a seasoned researcher or a curious learner,
our content is crafted to engage and inform without complexity.
</p>

<p>
Join us in building a global knowledge community that values
transparency, accessibility, and user-friendly science communication.
</p>


{/* Comments */}
<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Comments (3)
</h3>

<div className="space-y-6 text-gray-600">

<p>
Cras sit amet nibh libero, in gravida nulla.
</p>

<p className="text-sm text-gray-500">
By Anuj at 2021-11-20
</p>

<hr/>

<p>This is sample text for testing.</p>

<p className="text-sm text-gray-500">
By Test user at 2021-11-20
</p>

<hr/>

<p>It is good to read this blog section.</p>

<p className="text-sm text-gray-500">
By Om Niranjan
</p>

</div>

</div>


{/* Comment Form */}
<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Leave a Comment
</h3>

<div className="grid md:grid-cols-2 gap-4">

<input
placeholder="Name"
className="border p-3 rounded"
/>

<input
placeholder="Email"
className="border p-3 rounded"
/>

</div>

<textarea
placeholder="Message"
className="border p-3 rounded w-full h-32 mt-4"
/>

<button className="mt-4 border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white">
Submit
</button>

</div>

</div>


{/* Sidebar */}
<div>

<h3 className="text-xl font-semibold mb-4">
Recent Articles
</h3>

<ul className="space-y-3 text-gray-600">

<li>• Open for multidisciplinary submissions in pharma and life sciences</li>
<li>• Ideal platform for innovative thinkers and emerging voices</li>
<li>• Promotes academic publishing with industry relevance</li>
<li>• Freely Accessible and Reader Friendly Format</li>
<li>• Structured like a magazine for broader readability and impact</li>

</ul>

</div>

</div>

</div>

</div>

)}

{popup === "article3" && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

<div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

<button
onClick={closePopup}
className="absolute top-4 right-4 text-xl"
>
✖
</button>

<h2 className="text-3xl font-semibold mb-4">
Promotes Academic Publishing with Industry Relevance
</h2>

<div className="text-gray-500 flex gap-6 mb-6 text-sm">

<span>👤 admin</span>
<span>📁 Pharmacy / Translational Research and Industrial Applications</span>
<span>📅 2021-06-30</span>
<span>👁 332</span>

</div>

<img
src="/article3.jpg"
className="w-full h-[400px] object-cover rounded"
/>

<div className="grid md:grid-cols-3 gap-10 mt-8">

{/* Article Content */}
<div className="md:col-span-2 space-y-4 text-gray-700">

<h3 className="text-xl font-semibold">
Promotes Academic Publishing with Industry Relevance
</h3>

<p>
Our platform is committed to advancing academic research that holds strong
relevance for the pharmaceutical and biotechnology industries. We encourage
submissions that bridge theoretical knowledge with real-world applications.
</p>

<p>
From formulation technologies to regulatory strategies, we welcome research
that solves practical challenges faced by industry professionals.
</p>

<p>
Our goal is to foster collaboration between academia and industry,
promoting innovation that directly impacts healthcare, manufacturing,
and patient outcomes.
</p>

<p>
Case studies, translational research, and applied science are especially
encouraged. We value interdisciplinary approaches that drive efficiency,
sustainability, and technological advancement in pharma.
</p>

<p>
Each submission is evaluated for both scientific quality and industrial
significance. We believe meaningful research should go beyond publication—
it should lead to action and innovation.
</p>


{/* Comments */}
<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Comments (0)
</h3>

<p className="text-gray-500 mb-6">
No comments found.
</p>

<h3 className="text-xl font-semibold mb-4">
Leave a Comment
</h3>

<div className="grid md:grid-cols-2 gap-4">

<input
placeholder="Name"
className="border p-3 rounded"
/>

<input
placeholder="Email"
className="border p-3 rounded"
/>

</div>

<textarea
placeholder="Message"
className="border p-3 rounded w-full h-32 mt-4"
/>

<button className="mt-4 border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white">
Submit
</button>

</div>

</div>


{/* Sidebar */}
<div>

<h3 className="text-xl font-semibold mb-4">
Recent Articles
</h3>

<ul className="space-y-3 text-gray-600">

<li>• Open for multidisciplinary submissions in pharma and life sciences</li>
<li>• Ideal platform for innovative thinkers and emerging voices</li>
<li>• Promotes academic publishing with industry relevance</li>
<li>• Freely Accessible and Reader Friendly Format</li>
<li>• Structured like a magazine for broader readability and impact</li>

</ul>

</div>
</div>
</div>
</div>

)}
                </>
            );
}

            export default Home;