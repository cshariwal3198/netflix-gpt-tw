import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Loading } from "./components/loading";

const Body = React.lazy(() => import('./components/body'));
const SignIn = React.lazy(() => import('./components/sign-in'));

export default function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Body />
    },
    {
      path: '/login',
      element: <SignIn />
    }
  ]);

  return (
    <React.Suspense fallback={<Loading />}>
      <RouterProvider router={appRouter} />
    </React.Suspense>
  )
}
