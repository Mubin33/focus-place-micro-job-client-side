import React, { useContext } from "react"; 
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider"; 
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { googleLogin } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const googlePopup = () => {
    googleLogin()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          name: result.user.displayName,
          image: result.user.photoURL, 
          role:'worker',
          amount:10
        };
        console.log(userInfo);
        axiosSecure.post("/users/add", userInfo).then((res) => {
          if (res) {
              Swal.fire({
                  title: "Wow!",
                  text: "Successfully joined.",
                  icon: "success",
                });
                navigate("/dashboard/home");
            }
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Opps....!",
          text: " Something wrong",
        });
      });
  };
  return (
    <div>
      <div className="mt-5 space-y-3">
        <div className=" :w-full mx-auto items-center flex space-x-2">
          <p className="border-2 w-full py-[1px] bg-black"></p>
          <p>or,</p>
          <p className="border-2 w-full py-[1px] bg-black"></p>
        </div>
        <div>
          <button onClick={googlePopup} className="btn btn-outline">
            <img
              className="h-4 w-4"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              alt=""
            />{" "}
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
