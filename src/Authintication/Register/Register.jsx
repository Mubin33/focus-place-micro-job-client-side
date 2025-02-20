import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "../AuthProvider/AuthProvider"; 
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { imageUpload } from "../../api/utlis";

const Register = () => { 
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate();

  const { registerUser, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedRole = watch("role");

  const onSubmit =async (data) => {
    //console.log(data);
    const image = data.image[0]
    const photo = await imageUpload(image)
    registerUser(data?.email, data?.password)
      .then((result) => {
        //console.log(result);
        updateUser(data?.name, photo)
          .then(() => {
            //console.log(result);
            const userInfo = {
              name: data?.name,
              email: data?.email,
              image: photo,
              role: data?.role,
              amount: parseInt( `${selectedRole === 'worker'? 10: 50}`)
            };
            axiosSecure.post("/users/add", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Wow!",
                  text: "Successfully joined.",
                  icon: "success",
                });
              }
            });
            reset();
            navigate("/dashboard/home");
          })
          .catch((error) => {
            //console.log(error);
          });
      })
      .catch((error) => {
        Swal.fire({
          icon:'error',
          title:`Email already used to create account`
      })  
      });
  };
 
  
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col  ">
          <div className="text-center  lg:text-left">
            <h1 className="text-5xl text-center font-bold">Register now!</h1>
          </div>
          <div className="card-body bg-base-100 md:w-19/12  shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className=" ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  placeholder="name"
                  {...register("name", { required: true })}
                  name="name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-[12px] text-red-600">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
          type="file"
          id="image"
          accept="image/*" 
          {...register("image",{ required: true,})}
          className="file-input file-input-bordered w-full max-w-xs"
        />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  name="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-[12px] text-red-600">
                    This field is required
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                  name="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-[12px] text-red-600">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-[12px] text-red-600">
                    password must be 6 character{" "}
                  </p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-[12px] text-red-600">
                    Maximum 20 character set
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-[12px] text-red-600">
                    Add any uppercase and lowercase character
                  </p>
                )}
                <p className="text-sm mt-2">Role:</p>
                <div className="flex justify-around mt-1">
                  <label>
                    <input
                      type="radio"
                      value="worker"
                      {...register("role", { required: true })}
                    />
                    <span className="text-sm">Worker</span>
                  </label>

                  {/* Radio Button for Buyer */}
                  <label>
                    <input
                      type="radio"
                      value="buyer"
                      {...register("role", { required: true })}
                    />
                    <span className="text-sm">Buyer</span>
                  </label>
                </div>

                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Have already account
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="w-full bg-sky-400 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
                  type="submit"
                  value="Sign up"
                  name="sign-ip"
                />
              </div>
            </form>
            <div className="flex justify-center ">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
