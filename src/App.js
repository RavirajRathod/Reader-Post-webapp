import './App.css';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Login from './pages/Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Rootpage from './pages/Rootpage';
import { PostContextProvider } from './Context/Context';
import { lazy, Suspense } from 'react';
import PrivateRoute from './pages/PrivateRoute';
import Errorpage from './pages/Errorpage';
import Postdetail from './pages/Postdetail';



const ExplorePost = lazy(() => import('./Components/Explorepost'))

function App() {

  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/',
      errorElement: <Errorpage />,
      element: <PrivateRoute><Rootpage /></PrivateRoute>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'create_post',
          element: <CreatePost />
        },
        {
          path: 'explore_post',
          element: <Suspense fallback={<div className='loading'>Data is loading, please wait..</div>}><ExplorePost /></Suspense>
        },
        {
          path: '/post/:postId',
          element: <Postdetail />
        }
      ]
    }
  ])


  return (
    <>
      <PostContextProvider>
        <RouterProvider router={router} />

      </PostContextProvider>

    </>
  );
}

export default App;
