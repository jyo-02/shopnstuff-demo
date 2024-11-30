import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import { AuthLayout, Login } from './components/index.js'
import Signup from './pages/Signup'
import ShoppingBag from './pages/ShoppingBag.jsx'
import Checkout from './pages/Checkout.jsx'
import PaymentSuccess from './pages/PaymentSuccess.jsx'
import About from './pages/About.jsx'
// import AccountUpdate from './pages/AccountUpdate.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/product/:productId", 
            element: <ProductDetails />,
        },
        {
            path: "/cart",
            element: <ShoppingBag />,
        },
        {
            path: "/checkout",
            element: <Checkout />,

        },
        {
            path: "payment-success",
            element: <PaymentSuccess />
        },
        {
            path: "/about",
            element: <About />
        },
        // {   
        //     path: "/account",
        //     element: <AccountUpdate />,

        // }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)