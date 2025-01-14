import axios from "axios";
import { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authintication/AuthProvider/AuthProvider";


 const axiosSecure = axios.create({
    baseURL:`${import.meta.env.VITE_BASE_URL}`,
})
const useAxiosSecure = () => {
  const {logoutUser} = useContext(AuthContext)
  const navigate = useNavigate()

    axiosSecure.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token')
        // console.log('token', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    },function(error){
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
      }, async (error) => {
        const status = error.response.status
        console.log(status)
        if(status === 401 || status === 403){
         await logoutUser() 
         navigate('/login')
        }
        return Promise.reject(error);
      });
    return axiosSecure;
};

export default useAxiosSecure;