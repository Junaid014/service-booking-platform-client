import {
  createBrowserRouter,
} from "react-router";
import Root from "./Root";
import Home from "../pages/Home/Home";
import CreateServices from "../components/Services/CreateServices";
import ServiceDetails from "../components/Services/ServiceDetails";
import MyServices from "../pages/Provider/MyServices";
import DashboardLayout from "../pages/DashboardLayout/DashboardLayout";



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
        path:'pendingServices'
      }
    ]}

]);