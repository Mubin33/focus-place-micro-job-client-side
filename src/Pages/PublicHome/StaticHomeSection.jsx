import React from 'react';

const StaticHomeSection = () => {
    return (
        <div>
            <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Welcome to MicroJobHub</h1>
          <p className="mt-4 text-lg">
            The platform where Buyers and Workers connect to get tasks done efficiently.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">For Buyers</h3>
              <p>Post your task and set a budget. Watch as workers complete your task quickly!</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">For Workers</h3>
              <p>Browse tasks, accept jobs, and earn money by completing them professionally.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Safe Payments</h3>
              <p>Secure payment system ensures both buyers and workers are protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Task Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white shadow rounded-lg">Writing</div>
            <div className="p-6 bg-white shadow rounded-lg">Graphic Design</div>
            <div className="p-6 bg-white shadow rounded-lg">Data Entry</div>
            <div className="p-6 bg-white shadow rounded-lg">Programming</div>
            <div className="p-6 bg-white shadow rounded-lg">Marketing</div>
            <div className="p-6 bg-white shadow rounded-lg">Translation</div>
            <div className="p-6 bg-white shadow rounded-lg">SEO</div>
            <div className="p-6 bg-white shadow rounded-lg">Virtual Assistance</div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="/images/writing-job.jpg" alt="Writing Job" className="rounded-md mb-4" />
              <h3 className="text-xl font-semibold">Content Writing</h3>
              <p>Earn $50 by writing a high-quality article.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="/images/design-job.jpg" alt="Design Job" className="rounded-md mb-4" />
              <h3 className="text-xl font-semibold">Logo Design</h3>
              <p>Get paid $100 for creating an eye-catching logo.</p>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="/images/seo-job.jpg" alt="SEO Job" className="rounded-md mb-4" />
              <h3 className="text-xl font-semibold">SEO Optimization</h3>
              <p>Complete an SEO task and earn $75.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="/images/success1.jpg" alt="Success Story 1" className="rounded-md mb-4" />
              <p className="italic">"I started as a worker and now I earn $500 monthly!"</p>
              <h3 className="font-bold mt-4">- Emily, Worker</h3>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="/images/success2.jpg" alt="Success Story 2" className="rounded-md mb-4" />
              <p className="italic">"Outsourcing my work has never been easier."</p>
              <h3 className="font-bold mt-4">- Jack, Buyer</h3>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="/images/success3.jpg" alt="Success Story 3" className="rounded-md mb-4" />
              <p className="italic">"MicroJobHub helped me grow my freelance career."</p>
              <h3 className="font-bold mt-4">- Sophia, Worker</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Join MicroJobHub Today!</h2>
          <p className="mt-4 text-lg">
            Whether you're looking to get work done or earn money, we have something for you.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
        </div>
    );
};

export default StaticHomeSection;