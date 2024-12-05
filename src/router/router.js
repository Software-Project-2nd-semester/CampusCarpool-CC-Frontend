import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/Loading";
import Layout from "../layout/Layout";

const Chat = lazy(() => import('../page/chat/Chat'));
const Create = lazy(() => import('../page/create/Create'));
const Home = lazy(() => import('../page/home/Home'));
const PostDetail=lazy(()=>import('../page/home/components/PostDetail'));
const Login = lazy(() => import('../page/login/Login'))
const Map = lazy(() => import('../page/map/Map'))
const Signup = lazy(() => import('../page/signup/Signup'))
const User = lazy(() => import('../page/user/User'));
const CreateForm = lazy(() => import('../page/create/CreateForm'));
const Profile=lazy(()=>import('../page/user/Profile'))
const Write =lazy(()=>import('../page/user/Write'))
const MyPost=lazy(()=>import('../page/user/MyPost'))
const UserProfile=lazy(()=>import('../page/user/UserProfile'))
const MyReserve=lazy(()=>import('../page/user/MyReserve'))
const Chatroom=lazy(()=>import('../page/chat/Chatroom'))
const ReviewWrite=lazy(()=>import('../page/review/ReviewWrite'))
const MyWrite=lazy(()=>import('../page/review/MyWrite'))
const MyReceive=lazy(()=>import('../page/review/MyReceive'))
const Notice=lazy(()=>import('../page/notice/Notice'))


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
        path: "home/post/:id",
        element: (
            <Suspense fallback={<Loading />}>
              <PostDetail />
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
            <Profile />
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
      {
        path: "user/post/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <MyPost/>
          </Suspense>
        ),
      },
      {
        path: "user/profile/:sub",
        element: (
          <Suspense fallback={<Loading />}>
            <UserProfile/>
          </Suspense>
        ),
      },
      {
        path: "user/reserve",
        element: (
          <Suspense fallback={<Loading />}>
            <MyReserve/>
          </Suspense>
        ),
      },
      {
        path: "chatroom/:postid",
        element: (
          <Suspense fallback={<Loading />}>
            <Chatroom/>
          </Suspense>
        ),
      },
      {
        path: "review/write/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ReviewWrite/>
          </Suspense>
        ),
      },
      {
        path: "review/mywrite",
        element: (
          <Suspense fallback={<Loading />}>
            <MyWrite/>
          </Suspense>
        ),
      },
      {
        path: "review/myreceive",
        element: (
          <Suspense fallback={<Loading />}>
            <MyReceive/>
          </Suspense>
        ),
      },
      {
        path: "notice",
        element: (
          <Suspense fallback={<Loading />}>
            <Notice/>
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
