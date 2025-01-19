import React, { useContext } from 'react';
import { AuthContext } from './../../Authintication/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const StaticHomeSection = () => {
  const {user} = useContext(AuthContext)
    return (
        <div>
            <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-sky-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Welcome to Focus-Place</h1>
          <p className="mt-4 text-lg">
            The platform where Buyers and Workers connect to get tasks done efficiently.
          </p>
          {user ?<Link to='dashboard/home'>
          <button className="mt-6 px-6 py-3 bg-white text-sky-500 font-semibold rounded-md hover:bg-gray-200">
            Get Started
          </button>
          </Link> : <Link to='/login'>
          <button className="mt-6 px-6 py-3 bg-white text-sky-500 font-semibold rounded-md hover:bg-gray-200">
            Get Started
          </button>
          </Link>
          }
          
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
      {[
        "Writing",
        "Graphic Design",
        "Data Entry",
        "Programming",
        "Marketing",
        "Translation",
        "SEO",
        "Virtual Assistance",
      ].map((category, index) => (
        <div
          key={index}
          className="p-6 bg-white shadow rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100"
        >
          <p className="text-lg font-semibold text-gray-800">{category}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Featured Jobs Section */}
      <section className="py-16">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-6">Featured Jobs</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          image: "https://i.ibb.co.com/2q4N5Vm/1635025508800.png",
          title: "Content Writing",
          description: "Earn $50 by writing a high-quality article.",
        },
        {
          image: "https://i.ibb.co.com/PhqFTkr/Logo-design-anatomy-2.webp",
          title: "Logo Design",
          description: "Get paid $100 for creating an eye-catching logo.",
        },
        {
          image: "https://i.ibb.co.com/fVJPyKh/1603954182-seo-article-header.webp",
          title: "SEO Optimization",
          description: "Complete an SEO task and earn $75.",
        },
      ].map((job, index) => (
        <div
          key={index}
          className="p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-sky-500 hover:shadow-2xl"
        >
          <img
            src={job.image}
            alt={job.title}
            className="rounded-md mb-4 transition-transform duration-300 hover:scale-105"
          />
          <h3 className="text-xl font-semibold text-gray-800 hover:text-white transition-colors duration-300">
            {job.title}
          </h3>
          <p className="text-gray-600 hover:text-gray-200 transition-colors duration-300">
            {job.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Success Stories Section */}
      <section className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="https://i.ibb.co.com/Sr74qQx/360-F-243123463-z-Tooub557x-EWABDLk0j-Jkl-Dy-LSGl2jrr.jpg" alt="Success Story 1" className="rounded-md mb-4" />
              <p className="italic">"I started as a worker and now I earn $500 monthly!"</p>
              <h3 className="font-bold mt-4">- Emily, Worker</h3>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="https://i.ibb.co.com/C2N6gVM/Person-icon-Graphics-43204353-1.jpg" alt="Success Story 2" className="rounded-md mb-4" />
              <p className="italic">"Outsourcing my work has never been easier."</p>
              <h3 className="font-bold mt-4">- Jack, Buyer</h3>
            </div>
            <div className="p-6 bg-white shadow rounded-lg">
              <img src="https://i.ibb.co.com/cCmtc8d/csm-Person-Yury-Prof-Foto-An-LI-Footgrafie-2-JPG-94f12fbf25.jpg" alt="Success Story 3" className="rounded-md mb-4" />
              <p className="italic">"MicroJobHub helped me grow my freelance career."</p>
              <h3 className="font-bold mt-4">- Sophia, Worker</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-sky-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Join MicroJobHub Today!</h2>
          <p className="mt-4 text-lg">
            Whether you're looking to get work done or earn money, we have something for you.
          </p>
          <button className="mt-6 px-6 py-3 bg-white text-sky-500 font-semibold rounded-md hover:bg-gray-100">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
        </div>
    );
};

export default StaticHomeSection;