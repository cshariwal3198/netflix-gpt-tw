import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Loading } from "./components/loading";

const Home = React.lazy(() => import('./components/home'));
const Root = React.lazy(() => import('./components/root'));
const Favourites = React.lazy(() => import('./components/favourites'));
const ViewSimillar = React.lazy(() => import('./components/simillar-movies'))

export default function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/favourites',
          element: <Favourites />
        },
        {
          path: '/:id',
          element: <ViewSimillar />
        }
      ]
    }
  ]);

  return (
    <React.Suspense fallback={<Loading />}>
      <RouterProvider router={appRouter} />
    </React.Suspense>
  )
}
