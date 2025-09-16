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
        Component:CreateServices
      },
      {
        path:'services/:id',
        Component: ServiceDetails
      },
      {
        path:'allServices',
        Component:AllApprovedServices
      }

      // will be provider route 

     

    ]},
    {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      // provider
       {
        path:'myServices',
        element:<MyServices/>
      },

      // admin
      {
        path:'pendingServices',
        element:<PendingServices/>
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