import {
  createBrowserRouter,
} from "react-router";
import Root from "./Root";
import Home from "../pages/Home/Home";
import CreateServices from "../components/Services/CreateServices";



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
      }

    ]}

]);