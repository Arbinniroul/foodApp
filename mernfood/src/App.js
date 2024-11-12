import './App.css';
import { CartProvider } from './components/ContextReducer';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MyOrder from './screens/MyOrder'; 
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min"; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/createuser',
    element: <SignUp />
  },
  {
    path: '/myorders',
    element: <MyOrder />
  }
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export default App;
