import {
  createBrowserRouter,
} from "react-router";
import Root from "./Root";
import Home from "../pages/Home/Home";
import CreateServices from "../components/Services/CreateServices";
import ServiceDetails from "../components/Services/ServiceDetails";
import DashboardLayout from "../pages/DashboardLayout/DashboardLayout";
import MyServices from "../pages/Dashboard/Provider/MyServices";
import PendingServices from "../pages/Dashboard/Admin/PendingServices";



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
        path:'pendingServices',
        element:<PendingServices/>
      }
    ]}

]);