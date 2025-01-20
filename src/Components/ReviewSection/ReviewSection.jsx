// ReviewSection.jsx
import React from "react";

const reviews = [
  {
    name: "Md. Rahim",
    photo: "https://i.ibb.co.com/JpQyn5K/images.jpg",
    review:
      "This platform is amazing! It has helped me find work effortlessly. Highly recommend it to everyone.",
    rating: 5,
  },
  {
    name: "Sara Islam",
    photo: "https://i.ibb.co.com/ZmVVvdn/ANGELAPERSON-1447-300x300.jpg",
    review:
      "I really enjoy using this site. It's user-friendly and offers great opportunities.",
    rating: 4,
  },
  {
    name: "Kamal Hasan",
    photo: "https://i.ibb.co.com/FY4pJvy/why-are-you-the-best-person-for-this-job-724x450-1.webp",
    review:
      "Good platform for freelancers and clients. Could use some more features, but overall great!",
    rating: 4,
  },
];

const ReviewSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
            >
              <img
                src={review.photo}
                alt={review.name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {review.name}
              </h3>
              <p className="text-gray-600 mb-4">{review.review}</p>
              <div className="flex">
                {Array.from({ length: review.rating }, (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.358 2.45a1 1 0 00-.364 1.118l1.286 3.951c.3.921-.755 1.688-1.54 1.118l-3.358-2.451a1 1 0 00-1.175 0l-3.358 2.451c-.784.57-1.838-.197-1.539-1.118l1.285-3.95a1 1 0 00-.364-1.119l-3.358-2.45c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z"></path>
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
