import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common/index';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()

  const fetchUserDetails = async()=>{
      const dataResponse = await fetch(SummaryApi.current_user.url,{
        method : SummaryApi.current_user.method,
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }
   useEffect(()=>{   
    /**user Details */
    fetchUserDetails()
  
  })
 

  return (
    <div>
       <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
         
      }}>
      <ToastContainer /> {/* Thêm ToastContainer để hiển thị thông báo */}
      <Header /> {/* Hiển thị Header */}
      <main>
        <Outlet /> {/* Hiển thị nội dung component con dựa trên router */}
      </main>
      <Footer /> {/* Hiển thị Footer */}
     
      </Context.Provider>
    </div>
  );
}

export default App;