import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import { AuthContext } from "../../Authintication/AuthProvider/AuthProvider";
import PublicNavbar from "../../Shared/Navbar/PublicNavbar";

const ScrollToTop = () => {
  
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-sky-400 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          aria-label="Scroll to top"
        >
          ▲
        </button>
      )}
    </div>
  );
};
 
const PublicLayout = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      {/* Navbar */}
      <div className="bg-base-300 z-10 sticky top-0">
        <div className="max-w-screen-xl mx-auto">
    {user ?<Navbar /> : <PublicNavbar/>}
          
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto min-h-[700px]">
        <Outlet />
      </div>

      {/* Footer */}
      <div className="bg-base-300">
        <div className="max-w-screen-xl mx-auto">
          <Footer />
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default PublicLayout;












// import React from "react";
// import Navbar from "../../Shared/Navbar/Navbar";
// import { Outlet } from "react-router-dom";
// import Footer from "./../../Shared/Footer/Footer";

// const PublicLayout = () => {
//   return (
//     <div>
//       <div className="bg-base-300 z-10 sticky top-0">
//         <div className="max-w-screen-xl mx-auto">
//           <Navbar />
//         </div>
//       </div>
//       <div className="max-w-screen-xl mx-auto min-h-screen">
//         <Outlet />
//       </div>
//       <div className="bg-base-300 ">
//         <div className="max-w-screen-xl mx-auto">
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PublicLayout;
