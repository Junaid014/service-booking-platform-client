import {
  createBrowserRouter,
} from "react-router";
import Home from "../pages/Home/Home";
import CreateServices from "../components/Services/CreateServices";
import ServiceDetails from "../components/Services/ServiceDetails";
import DashboardLayout from "../pages/DashboardLayout/DashboardLayout";
import PendingServices from "../pages/Dashboard/Admin/PendingServices";
import AllApprovedServices from "../components/Services/AllApprovedServices";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../Authentication/SignUp";
import Login from "../Authentication/Login";
import Root from "../layouts/Root";
import MyServices from "../pages/Dashboard/Seller/MyServices";
import MakeAdmin from "../pages/Dashboard/Admin/MakeAdmin";
import PrivateRoute from "../Provider/PrivateRoute";
import MyCart from "../pages/Dashboard/Customer/MyCart";
import Payment from "../components/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/Customer/PaymentHistory";
import ProviderEarnings from "../pages/Dashboard/Seller/ProviderEarnings ";
import Forbidden from "../Forbidden/Forbidden";
import MyProfile from "../pages/Dashboard/Customer/MyProfile";



export const router = createBrowserRouter([

  {
    path: "/",
    Component: Root,

    children: [
      {
        path: '/',
        index: true,
        Component: Home
      },
      {
        path:'createService',
        element:<PrivateRoute><CreateServices/></PrivateRoute>
      },
      {
        path:'services/:id',
        Component: ServiceDetails
      },
      {
        path:'allServices',
        Component:AllApprovedServices
      },
      {
        path:'payment/:id',
        Component:Payment
      },

       {
        path:'/myCart/:id',
        element:<MyCart/>
      },
      {
        path:'forbidden',
        element:Forbidden
      }

      // will be provider route 


    ]},
    {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // customer
      {
        path:'paymentHistory',
        element: <PaymentHistory/>
      },
      {
        path:'myProfile',
        Component:MyProfile
      },
     
      // provider
       {
        path:'myServices',
        element:<MyServices/>
      },
      {
        path:'providerEarnings',
        element:<ProviderEarnings/>
      },

      // admin
      {
        path:'pendingServices',
        element:<PendingServices/>
      },
      {
        path:'makeAdmin',
        element:<MakeAdmin/>
      }
    ]},


    {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login
      },
      {
        path: "/auth/signUp",
        Component: SignUp
      },
    ]
  },

]);