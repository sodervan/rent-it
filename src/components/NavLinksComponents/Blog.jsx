import React from "react";

const blogs = [
  {
    id: 1,
    title: "5 Tips for Better Renting Experience",
    description:
      "Learn how to make the most out of your rentals with these actionable tips.",
    image: "https://via.placeholder.com/400x250",
    date: "October 10, 2023",
    author: "Admin",
  },
  {
    id: 2,
    title: "The Future of Rental Platforms",
    description:
      "Explore how technology is reshaping the way we rent and share resources.",
    image: "https://via.placeholder.com/400x250",
    date: "October 5, 2023",
    author: "John Doe",
  },
  {
    id: 3,
    title: "How to Choose the Right Property for Rent",
    description:
      "Struggling to find the perfect rental property? Here's what you need to know.",
    image: "https://via.placeholder.com/400x250",
    date: "September 25, 2023",
    author: "Jane Smith",
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-purple-600 mb-4">
            Welcome to Our Blog
          </h1>
          <p className="text-gray-700 text-lg">
            Stay updated with the latest industry tips, insights, and news.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="px-4 py-6">
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {blog.date} • By {blog.author}
                </p>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <button className="text-purple-600 hover:text-purple-800 font-medium transition">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 py-8 px-6 bg-purple-600 text-white rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-3">
            Want to stay updated with our latest posts?
          </h2>
          <p className="text-sm mb-6">
            Subscribe to our newsletter to never miss an update!
          </p>
          <button className="bg-white text-purple-600 px-4 py-2 rounded shadow hover:bg-gray-50 transition duration-300">
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
