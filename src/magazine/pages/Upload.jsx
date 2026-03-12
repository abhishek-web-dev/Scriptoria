import React from "react";

function Upload() {
  return (
    <div className="bg-gray-100 min-h-screen py-20">

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-10">

        <h1 className="text-3xl font-bold text-center mb-10">
          Upload Your Article
        </h1>

        <form className="space-y-6">

          {/* Title */}
          <div>
            <label className="block mb-2 font-medium">Article Title</label>
            <input
              type="text"
              placeholder="Enter article title"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block mb-2 font-medium">Author Name</label>
            <input
              type="text"
              placeholder="Enter author name"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">Category</label>

            <select className="w-full border p-3 rounded">
              <option>Pharmacy</option>
              <option>Drug Discovery</option>
              <option>Life Sciences</option>
              <option>Research Innovation</option>
            </select>

          </div>

          {/* Upload Image */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Article Image
            </label>

            <input
              type="file"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Upload PDF */}
          <div>
            <label className="block mb-2 font-medium">
              Upload Article PDF
            </label>

            <input
              type="file"
              className="w-full border p-3 rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-medium">
              Article Description
            </label>

            <textarea
              placeholder="Write short description..."
              className="w-full border p-3 rounded h-32"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">

            <button
              type="submit"
              className="bg-green-500 text-white px-8 py-3 rounded hover:bg-green-600 transition"
            >
              Submit Article
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default Upload;