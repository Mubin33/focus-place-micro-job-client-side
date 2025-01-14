import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"; 
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosPublic from './../../Hooks/useAxiosPublic/useAxiosPublic';

const Register = () => {
    const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { registerUser, updateUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    registerUser(data?.email, data?.password)
      .then((result) => {
        console.log(result);
        updateUser(data?.name, data?.photo)
          .then(() => {
            console.log(result)
            const userInfo = { name: data?.name, email: data?.email };
            axiosPublic.post("/users/add", userInfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Wow!",
                  text: "Successfully joined.",
                  icon: "success",
                });
              }
            });
            reset();
            // navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSubmit=(e)=>{
  //     e.preventDefault()

  //     let form = e.target
  //     let name = form.name.value
  //     let email = form.email.value
  //     let password = form.password.value

  //     registerUser(email, password)
  //     .then((result)=>{
  //         console.log(result)
  //     }).catch((error)=>{
  //         console.log(error)
  //     })

  // }
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
                  type="photo"
                  placeholder="photo"
                  {...register("photo", { required: true })}
                  name="photo"
                  className="input input-bordered"
                />
                {errors.photo && (
                  <span className="text-[12px] text-red-600">
                    This field is required
                  </span>
                )}
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
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover">
                    Have already account
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn bg-sky-300 text-black"
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
