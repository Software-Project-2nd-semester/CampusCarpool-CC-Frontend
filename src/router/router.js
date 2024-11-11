import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../layout/Layout";


const Chat = lazy(() => import('../page/chat/Chat'));
const Create = lazy(() => import('../page/create/Create'));
const Home = lazy(() => import('../page/home/Home'));
const Login = lazy(() => import('../page/login/Login'))
const Map = lazy(() => import('../page/map/Map'))
const Signup = lazy(() => import('../page/signup/Signup'))
const User = lazy(() => import('../page/user/User'));
const CreateForm = lazy(() => import('../page/create/CreateForm'));
const UserProfile=lazy(()=>import('../page/user/Profile'))
const Write =lazy(()=>import('../page/user/Write'))

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "signup", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            < Signup />
          </Suspense>
        ),
      }, {
        path: "chat", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            <Chat />
          </Suspense>
        ),
      }, {
        path: "home", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      }, {
        path: "create", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            <Create />
          </Suspense>
        ),
      }, {
        path: "create/createForm",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateForm />
          </Suspense>
        ),
      }, {
        path: "/map", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            <Map />
          </Suspense>
        ),
      }, {
        path: "user", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
      },
      {
        path: "user/profile", // 빈 문자열 대신 "/" 사용
        element: (
          <Suspense fallback={<Loading />}>
            <UserProfile />
          </Suspense>
        ),
      },
      {
        path: "user/write/:tag", 
        element: (
          <Suspense fallback={<Loading />}>
            <Write/>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
