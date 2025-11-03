import React from "react";
import { AiFillChrome, AiFillHome } from "react-icons/ai"; // Using AiFillHome for the home icon

// --- Component for a single blog card ---
// Notice it now accepts { post } as a prop
const BlogPostCard = ({ post }) => {
  // The blogPosts data array should NOT be here
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        {/* These 'post.' variables will now work correctly */}
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3 bg-gray-800 bg-opacity-75 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {post.category}
        </div>
        {post.rating && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full flex items-center">
            ⭐ {post.rating}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-7 h-7 rounded-full mr-2 object-cover"
          />
          <span>{post.authorName}</span>
          <span className="mx-2">·</span>
          <span>{post.date}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-3">{post.excerpt}</p>
      </div>
    </div>
  );
};

// --- Main Blog Grid Page Component ---
export default function BlogGridPage() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Breadcrumb Navigation */}
      <div className="bg-white shadow-sm py-4 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-600">
          <AiFillChrome className="mr-2 text-gray-500" />
          <a href="/" className="hover:text-gray-800">
            Home
          </a>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Blog Grid</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="max-w-7xl mx-auto py-8 px-6 md:px-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Blog Grid</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* This .map() will now work because 'blogPosts' is imported at the top */}
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
