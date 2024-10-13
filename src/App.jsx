import { useEffect, useState } from 'react'
import './App.css'
import conf from './conf/conf';
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import { Header , Footer} from './components/index'
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata)); // Passing userdata directly, instead of {userdata}
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error); // Handle or log error
      })
      .finally(() => {
        setLoading(false); // Corrected setLoading syntax
      });
  }, [dispatch]);
  debugger;
  return !loading ? (
    <div className='min-h-screen flex flex-wrap'>
      <div className='w-full block bg-blue-500'>
      <Header/>
        <main>
          TODO: {/* <Outlet /> */}
        </main>
        <Footer/>
        </div>

      </div>
  ) : (
    <div>
      {/* Render your app when not loading */}
      <h1>Welcome to the Blog App</h1>
    </div>
  );
}

export default App;
