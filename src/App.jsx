import { useEffect, useState } from 'react'
import './App.css'
import conf from './conf/conf';
import authService from './appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';

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
  return loading ? (
    <div className='min-h-sc'>
      <h1>Blog App with Appwrite</h1>
      <p>Loading...</p>
    </div>
  ) : (
    <div>
      {/* Render your app when not loading */}
      <h1>Welcome to the Blog App</h1>
    </div>
  );
}

export default App;
