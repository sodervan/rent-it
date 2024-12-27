import React from "react";

const blogs = [
  {
    id: 1,
    title: "5 Tips for a Better Renting Experience",
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
  {
    id: 4,
    title: "10 Must-Have Features for Rental Websites",
    description:
        "Discover the key features that make rental websites successful.",
    image: "https://via.placeholder.com/400x250",
    date: "October 15, 2023",
    author: "Alex Green",
  },
];

const Blog = () => {
  return (
      <div className="bg-gray-50">
        {/* Header Section */}
        <div className="bg-purple-600 text-white py-12 px-6 text-center">
          <h1 className="text-4xl font-semibold">Your Blog Title Here</h1>
          <p className="mt-4 text-base">
            Stay informed with the latest updates, tips, and insights in the industry.
          </p>
        </div>

        {/* Blog Section */}
        <div className="container mx-auto max-w-7xl py-12 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {blogs.map((blog) => (
                <div
                    key={blog.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
                >
                  <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-lg font-medium text-purple-700 hover:underline">
                      {blog.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-2">
                      {blog.date} • By {blog.author}
                    </p>
                    <p className="text-sm text-gray-600 mt-4">{blog.description}</p>
                    <button className="mt-4 inline-block text-purple-600 hover:text-purple-800 font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
            ))}
          </div>

          {/* Subscription CTA */}
          <div className="mt-16 bg-purple-600 text-white py-10 text-center rounded-lg">
            <h2 className="text-2xl font-semibold">
              Subscribe for More Updates
            </h2>
            <p className="text-sm mt-4">
              Join our mailing list and never miss a post!
            </p>
            <button className="mt-6 bg-white text-purple-600 px-5 py-2 rounded shadow hover:bg-gray-100 transition">
              Subscribe Now
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gray-900 text-gray-400 py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </div>
  );
};

export default Blog;
