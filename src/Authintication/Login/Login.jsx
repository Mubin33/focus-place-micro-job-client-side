import { useContext } from 'react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';  
import SocialLogin from '../SocialLogin/SocialLogin';
import { AuthContext } from '../AuthProvider/AuthProvider';

const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate() 

 

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        let email = form.email.value;
        let password = form.password.value; 


        loginUser(email, password)
                .then((result) => {
                    console.log(result);
                    // navigate(location?.state?.from?.pathname || "/")
                    navigate("/dashboard/home")
                })
                .catch((error) => {
                    console.log(error);
                });
 
    };

    return (
        <> 
            <div 
                className="hero bg-base-200 min-h-screen"
            >
                <div className="hero-content flex-col  ">
                    <div className="text-center    ">
                        <h1 className="text-5xl text-center font-bold">Login now!</h1>
 
                    </div>
                    <div  className="card-body bg-base-100  max-w-sm shadow-2xl">
                        <form
                           
                            onSubmit={handleSubmit}
                            className=" "
                        >
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <Link to="/register" className="label-text-alt link link-hover">
                                        Create a new account
                                    </Link>
                                </label>
                            </div> 
                            <div className="form-control mt-6">
                                <input className="btn bg-sky-300 text-black" type="submit" value="Login" name="login" />
                            </div>
                        </form>
                        <div className='flex justify-center '>
                        <SocialLogin/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
