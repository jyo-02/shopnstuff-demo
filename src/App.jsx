import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService from './connectServer/auth.js'
import { login,logout } from './store/authSlice'
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  //introduce loading state if the fetching from the appwrite dB takes time
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      }
      else {
        dispatch(logout())

      }
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return !loading ? (
    <>
    <ToastContainer/>
        <div className='min-h-screen flex flex-col bg-[#fbfafb]'>
      <div className='w-full block'>
        <Header/>
        <main className='flex-grow overflow-auto'>
        <Outlet />
        </main>
        <Footer/>
      </div>
    </div>
    </>
  ) : null
}

export default App