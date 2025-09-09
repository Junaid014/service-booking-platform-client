import {
  createBrowserRouter,
} from "react-router";
import Root from "./Root";
import Home from "../pages/Home/Home";
import AddService from "../pages/Services/AddServices";



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
        Component:AddService
      }

    ]}

]);