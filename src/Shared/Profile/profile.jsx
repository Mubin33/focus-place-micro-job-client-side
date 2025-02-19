 
import { Helmet } from 'react-helmet-async'  
import { useContext } from 'react'
import { AuthContext } from '../../Authintication/AuthProvider/AuthProvider'
import useUserData from '../../Hooks/useUserData/useUserData'
import Loading from '../../Components/Loading/Loading'
const Profile = () => {
  const { user } = useContext(AuthContext)
  const [userData, isPending] = useUserData() 
  const {name, email, image, amount, role}=userData

  if(isPending) return <Loading/>
      console.log(user)

  console.log(user)
  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
         <h1 className='text-5xl text-center font-bold mb-20'>Welcome{name}</h1>
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-white bg-sky-500 rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user.uid}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user.email}</span>
              </p>

              <div>
                <button className='bg-sky-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-sky-800 block mb-1'>
                  Update Profile
                </button>
                <button className='bg-sky-500 px-7 py-1 rounded-lg text-black cursor-pointer hover:bg-sky-800'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
