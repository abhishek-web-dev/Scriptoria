import React, { useState } from "react";

function Magazine() {

    const [search, setSearch] = useState("")
    const [popup, setPopup] = useState(null)

    const articles = [
        {
            id: 1,
            title: "Structured like a magazine for broader readability and impact",
            image: "/article1.jpg"
        },
        {
            id: 2,
            title: "Freely Accessible and Reader Friendly Format",
            image: "/article2.jpg"
        },
        {
            id: 3,
            title: "Promotes academic publishing with industry relevance",
            image: "/article3.jpg"
        },
        {
            id: 4,
            title: "Ideal platform for innovative thinkers and emerging voices",
            image: "/article4.jpg"
        },
        {
            id: 5,
            title: "Open for multidisciplinary submissions in pharma and life sciences",
            image: "/article5.jpg"
        }
    ]

    const filtered = articles.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase())
    )

    return (

        <div className="bg-gray-100">

            {/* HERO */}

            <section className="relative h-[40vh]">

                <img
                    src="/magazine.jpg"
                    className="absolute w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="absolute inset-0 flex items-center justify-center">

                    <h1 className="text-white text-5xl font-semibold">
                        E-Magazine
                    </h1>

                </div>

            </section>



            {/* CONTENT */}

            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-10">

                {/* LEFT SIDE ARTICLES */}

                <div className="lg:col-span-2">

                    {search && filtered.length === 0 && (

                        <h2 className="text-3xl font-semibold mb-10">
                            Search Results again the keyword "{search}"
                        </h2>

                    )}

                    <div className="grid md:grid-cols-2 gap-8">

                        {(search ? filtered : articles).map(article => (

                            <div
                                key={article.id}
                                className="bg-white rounded shadow overflow-hidden"
                            >

                                <img
                                    src={article.image}
                                    className="w-full h-60 object-cover"
                                />

                                <div className="p-6">

                                    <h3 className="text-xl font-semibold mb-4">
                                        {article.title}
                                    </h3>

                                    <button
                                        onClick={() => setPopup(article)}
                                        className="border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white"
                                    >
                                        Read More
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>



                {/* SIDEBAR */}

                <div>

                    {/* SEARCH */}

                    <h3 className="text-xl font-semibold mb-4">
                        Search
                    </h3>

                    <div className="flex mb-10">

                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search for..."
                            className="border p-3 flex-1"
                        />

                        <button className="bg-gray-200 px-6">
                            Go!
                        </button>

                    </div>



                    {/* POPULAR */}

                    <h3 className="text-xl font-semibold mb-4">
                        Popular Articles
                    </h3>

                    <ul className="space-y-3 text-gray-700">

                        <li>• Structured like a magazine for broader readability and impact</li>
                        <li>• Open for multidisciplinary submissions in pharma and life sciences</li>
                        <li>• Freely Accessible and Reader Friendly Format</li>
                        <li>• Ideal platform for innovative thinkers and emerging voices</li>
                        <li>• Promotes academic publishing with industry relevance</li>

                    </ul>



                    {/* CATEGORIES */}

                    <h3 className="text-xl font-semibold mt-10 mb-4">
                        Categories
                    </h3>

                    <ul>

                        <li>• Pharmacy (5)</li>

                    </ul>

                </div>

            </div>



            {/* POPUP */}

            {popup && (

                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

                    <div className="bg-white max-w-3xl p-10 rounded relative">

                        <button
                            onClick={() => setPopup(null)}
                            className="absolute top-4 right-4"
                        >
                            ✖
                        </button>

                        <img
                            src={popup.image}
                            className="w-full h-72 object-cover rounded mb-6"
                        />

                        <h2 className="text-2xl font-semibold mb-4">
                            {popup.title}
                        </h2>

                        <p className="text-gray-600">
                            Article details will appear here. You can place full article content,
                            comments section and sidebar exactly like Home popup.
                        </p>

                    </div>

                </div>

            )}

            {popup?.id === 1 && (

                <div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

                    <div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

                        {/* Close Button */}
                        <button
                            onClick={() => setPopup(null)}
                            className="absolute top-4 right-4 text-xl"
                        >
                            ✖
                        </button>


                        {/* Title */}
                        <h2 className="text-3xl font-semibold mb-4">
                            Structured like a magazine for broader readability and impact
                        </h2>


                        {/* Meta */}
                        <div className="flex gap-6 text-gray-500 mb-6 text-sm">

                            <span>👤 subadmin</span>

                            <span>📁 Pharmacy / Drug Discovery & Innovation</span>

                            <span>📅 2025-07-26</span>

                            <span>👁 2502</span>

                        </div>


                        {/* Image */}
                        <img
                            src="/article1.jpg"
                            className="w-full h-[420px] object-cover rounded"
                        />


                        {/* Content Layout */}
                        <div className="grid md:grid-cols-3 gap-10 mt-10">


                            {/* LEFT ARTICLE CONTENT */}
                            <div className="md:col-span-2 space-y-6 text-gray-700">

                                <p>
                                    Our platform is structured like a modern scientific magazine,
                                    designed to make cutting-edge pharmaceutical and life science research
                                    accessible, engaging, and impactful.
                                </p>

                                <p>
                                    We blend academic rigor with reader-friendly formats to reach a diverse audience
                                    — researchers, practitioners, students, and innovators alike.
                                </p>

                                <p>
                                    Each issue features a curated mix of original research, expert reviews,
                                    insightful case studies, and short communications presented in a clear,
                                    concise, and visually appealing manner.
                                </p>

                                <p>
                                    Interdisciplinary content that merges science, technology,
                                    and healthcare innovation is especially encouraged.
                                    We aim to break down silos and spark collaboration across fields.
                                </p>

                                <p>
                                    With an emphasis on real-world relevance and scientific storytelling,
                                    we make knowledge more usable and discoverable.
                                </p>

                                <p>
                                    Every submission undergoes peer review to ensure quality and credibility.
                                </p>

                                <p>
                                    Our mission is to amplify scientific voices and inspire innovation
                                    for global health impact.
                                </p>


                                {/* COMMENTS */}
                                <div className="mt-10">

                                    <h3 className="text-xl font-semibold mb-4">
                                        Comments (0)
                                    </h3>

                                    <p className="text-gray-500 mb-6">
                                        No comments found.
                                    </p>


                                    {/* COMMENT FORM */}

                                    <h3 className="text-xl font-semibold mb-4">
                                        Leave a Comment
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-4 mb-4">

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
                                        className="border p-3 rounded w-full h-32"
                                    />

                                    <button className="mt-4 border border-green-500 text-green-600 px-6 py-2 rounded-full hover:bg-green-500 hover:text-white">
                                        Submit
                                    </button>

                                </div>

                            </div>


                            {/* SIDEBAR */}
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

            {popup?.id === 2 && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

<div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

{/* Close Button */}
<button
onClick={() => setPopup(null)}
className="absolute top-4 right-4 text-xl"
>
✖
</button>

{/* Title */}
<h2 className="text-3xl font-semibold mb-4">
Freely Accessible and Reader-Friendly Format
</h2>

{/* Meta */}
<div className="text-gray-500 flex gap-6 mb-6 text-sm">
<span>👤 admin</span>
<span>📁 Pharmacy / Open Access Publications</span>
<span>📅 2021-06-30</span>
<span>👁 2058</span>
</div>

{/* Image */}
<img
src="/article2.jpg"
className="w-full h-[400px] object-cover rounded"
/>

{/* Content Layout */}
<div className="grid md:grid-cols-3 gap-10 mt-8">

{/* LEFT CONTENT */}
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
All articles are published in a clean, readable layout with minimal distractions
and mobile-friendly design.
</p>

<p>
Our reader-first approach ensures content is easy to navigate,
understand, and cite for academic or practical use.
</p>

<p>
We support both HTML and downloadable PDF formats to enhance accessibility
across devices and preferences.
</p>

<p>
Whether you’re a seasoned researcher or a curious learner,
our content is crafted to engage and inform without complexity.
</p>

<p>
Join us in building a global knowledge community that values transparency,
accessibility, and user-friendly science communication.
</p>

{/* COMMENTS */}
<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Comments (3)
</h3>

<div className="space-y-6 text-gray-600">

<div>
<p>Cras sit amet nibh libero, in gravida nulla.</p>
<p className="text-sm text-gray-500">By Anuj at 2021-11-20</p>
</div>

<hr/>

<div>
<p>This is sample text for testing.</p>
<p className="text-sm text-gray-500">By Test user at 2021-11-20</p>
</div>

<hr/>

<div>
<p>It is good to read this blog section.</p>
<p className="text-sm text-gray-500">By Om Niranjan</p>
</div>

</div>

{/* COMMENT FORM */}
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

</div>

{/* SIDEBAR */}
<div>

<h3 className="text-xl font-semibold mb-4">
Recent Articles
</h3>

<ul className="space-y-3 text-gray-600">

<li>• Open for multidisciplinary submissions in pharma and life sciences</li>
<li>• Ideal platform for innovative thinkers and emerging voices</li>
<li>• Promotes academic publishing with industry relevance</li>
<li>• Freely Accessible and Reader-Friendly Format</li>
<li>• Structured like a magazine for broader readability and impact</li>

</ul>

</div>

</div>

</div>

</div>

)}

    {popup?.id === 3 && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

<div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

{/* Close Button */}
<button
onClick={()=>setPopup(null)}
className="absolute top-4 right-4 text-xl"
>
✖
</button>

{/* Title */}
<h2 className="text-3xl font-semibold mb-4">
Promotes academic publishing with industry relevance
</h2>

{/* Meta */}
<div className="text-gray-500 flex gap-6 mb-6 text-sm">

<span>👤 admin</span>

<span>📁 Pharmacy / Translational Research and Industrial Applications</span>

<span>📅 2021-06-30</span>

<span>👁 332</span>

</div>

{/* Image */}
<img
src="/article3.jpg"
className="w-full h-[400px] object-cover rounded"
/>

{/* Content Layout */}
<div className="grid md:grid-cols-3 gap-10 mt-8">

{/* Left Content */}
<div className="md:col-span-2 space-y-4 text-gray-700">

<h3 className="font-semibold text-lg">
Promotes Academic Publishing with Industry Relevance
</h3>

<p>
Our platform is committed to advancing academic research that holds strong relevance for the pharmaceutical and biotechnology industries. We encourage submissions that bridge theoretical knowledge with real-world applications.
</p>

<p>
From formulation technologies to regulatory strategies, we welcome research that solves practical challenges faced by industry professionals. Our goal is to foster collaboration between academia and industry, promoting innovation that directly impacts healthcare, manufacturing, and patient outcomes.
</p>

<p>
Case studies, translational research, and applied science are especially encouraged. We value interdisciplinary approaches that drive efficiency, sustainability, and technological advancement in pharma.
</p>

<p>
Each submission is evaluated for both scientific quality and industrial significance. We believe meaningful research should go beyond publication—it should lead to action and innovation.
</p>


{/* Comments */}
<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Comments (0)
</h3>

<p className="text-gray-500">
No comments found.
</p>

{/* Comment Form */}

<div className="mt-8">

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

<li>• Freely Accessible and Reader-Friendly Format</li>

<li>• Structured like a magazine for broader readability and impact</li>

</ul>

</div>

</div>

</div>

</div>

)}

{popup?.id === 4 && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

<div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

{/* Close Button */}
<button
onClick={()=>setPopup(null)}
className="absolute top-4 right-4 text-xl"
>
✖
</button>

{/* Title */}
<h2 className="text-3xl font-semibold mb-4">
Ideal platform for innovative thinkers and emerging voices
</h2>

{/* Meta */}
<div className="text-gray-500 flex gap-6 mb-6 text-sm">

<span>👤 admin</span>

<span>📁 Pharmacy / Young Researcher Spotlight</span>

<span>📅 2021-06-30</span>

<span>👁 353</span>

</div>

{/* Image */}
<img
src="/article4.jpg"
className="w-full h-[400px] object-cover rounded"
/>

{/* Content Layout */}
<div className="grid md:grid-cols-3 gap-10 mt-8">

{/* LEFT CONTENT */}
<div className="md:col-span-2 space-y-4 text-gray-700">

<p>
Our platform is an ideal space for innovative thinkers,
emerging voices, and bold scientific explorers who challenge
conventional boundaries.
</p>

<p>
We welcome fresh perspectives and pioneering work in pharmaceutical
and life sciences, aiming to spotlight novel ideas and transformative research.
</p>

<p>
This is a stage for early-career researchers, young scientists,
and cross-disciplinary innovators to share their insights with a global audience.
</p>

<p>
Submissions that introduce unique methodologies, new conceptual frameworks,
or address unmet challenges are especially encouraged.
</p>

<p>
We strive to nurture creativity, collaboration,
and the spirit of discovery across all levels of scientific experience.
</p>

<p>
Articles are curated to ensure clarity, originality,
and relevance, making scientific communication both impactful and inclusive.
</p>

<p>
Join a community that values bold ideas and fosters the next generation
of scientific leaders.
</p>


{/* Comments */}
<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Comments (0)
</h3>

<p className="text-gray-500">
No comments found.
</p>

{/* Comment Form */}
<div className="mt-8">

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

</div>


{/* SIDEBAR */}
<div>

<h3 className="text-xl font-semibold mb-4">
Recent Articles
</h3>

<ul className="space-y-3 text-gray-600">

<li>• Open for multidisciplinary submissions in pharma and life sciences</li>

<li>• Ideal platform for innovative thinkers and emerging voices</li>

<li>• Promotes academic publishing with industry relevance</li>

<li>• Freely Accessible and Reader-Friendly Format</li>

<li>• Structured like a magazine for broader readability and impact</li>

</ul>

</div>

</div>

</div>

</div>

)}

{popup?.id === 5 && (

<div className="fixed inset-0 bg-black/60 flex justify-center items-start overflow-y-auto z-50 p-10">

<div className="bg-white max-w-6xl w-full rounded-lg p-8 relative">

{/* Close Button */}
<button
onClick={()=>setPopup(null)}
className="absolute top-4 right-4 text-xl"
>
✖
</button>

{/* Title */}
<h2 className="text-3xl font-semibold mb-4">
Open for multidisciplinary submissions in pharma and life sciences
</h2>

{/* Meta */}
<div className="text-gray-500 flex gap-6 mb-6 text-sm">

<span>👤 admin</span>

<span>📁 Pharmacy / Drug Discovery and Development</span>

<span>📅 2021-07-07</span>

<span>👁 2215</span>

</div>

{/* Image */}
<img
src="/article5.jpg"
className="w-full h-[400px] object-cover rounded"
/>

{/* Content Layout */}
<div className="grid md:grid-cols-3 gap-10 mt-8">

{/* LEFT CONTENT */}
<div className="md:col-span-2 space-y-4 text-gray-700">

<p>
We are open for multidisciplinary submissions in the fields of
pharmaceutical and life sciences, inviting original research,
reviews, case studies, and short communications.
</p>

<p>
Our platform welcomes work spanning pharmacology, drug discovery,
biotechnology, clinical research, pharmacovigilance, toxicology,
and regulatory sciences.
</p>

<p>
We encourage innovative studies that bridge the gap between medicine,
biology, and technology. Interdisciplinary approaches that combine
chemistry, bioinformatics, or material science with pharmaceutical
applications are highly appreciated.
</p>

<p>
Submissions focusing on novel drug delivery systems,
personalized medicine, and healthcare innovation are also welcome.
The goal is to foster collaboration and knowledge exchange across
diverse scientific disciplines.
</p>

<p>
All manuscripts undergo rigorous peer review to maintain high
academic standards. Join us in advancing the future of healthcare
through scientific excellence.
</p>


{/* COMMENTS */}
<div className="mt-10">

<h3 className="text-xl font-semibold mb-4">
Comments (2)
</h3>

<div className="space-y-6 text-gray-600">

<div>
<p>This is a test comment.</p>
<p className="text-sm text-gray-500">
By Anuj at 2022-03-26 10:10:51
</p>
</div>

<hr/>

<div>
<p>This is a test comment.</p>
<p className="text-sm text-gray-500">
By Test user at 2022-03-28 17:25:59
</p>
</div>

</div>


{/* COMMENT FORM */}
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

</div>


{/* SIDEBAR */}
<div>

<h3 className="text-xl font-semibold mb-4">
Recent Articles
</h3>

<ul className="space-y-3 text-gray-600">

<li>• Open for multidisciplinary submissions in pharma and life sciences</li>

<li>• Ideal platform for innovative thinkers and emerging voices</li>

<li>• Promotes academic publishing with industry relevance</li>

<li>• Freely Accessible and Reader-Friendly Format</li>

<li>• Structured like a magazine for broader readability and impact</li>

</ul>

</div>

</div>

</div>

</div>

)}

        </div>

    )

}

export default Magazine