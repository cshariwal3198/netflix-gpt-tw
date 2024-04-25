import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FallBack } from "./components";

const Home = React.lazy(() => import('./components/home'));
const Root = React.lazy(() => import('./components/root'));
const Favourites = React.lazy(() => import('./components/favourites'));
const ViewSimillar = React.lazy(() => import('./components/simillar-movies'));
const ManageAccount = React.lazy(() => import('./components/manage-account-menu'));
const Categories = React.lazy(() => (import('./components/categories')));
const MovieInfo = React.lazy(() => (import('./components/movie-info')));
const TvShows = React.lazy(() => import('./components/tv-shows'));

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
          path: '/simillar/:type/:id',
          element: <ViewSimillar />
        },
        {
          path: '/account',
          element: <ManageAccount />
        },
        {
          path: '/categories',
          element: <Categories />
        },
        {
          path: '/:type/:id',
          element: <MovieInfo />
        },
        {
          path: '/tvshows',
          element: <TvShows />
        },
        {
          path: '/:type/:id',
          element: <MovieInfo />
        }
      ]
    }
  ]);

  return (
    <React.Suspense fallback={<FallBack />}>
      <RouterProvider router={appRouter} />
    </React.Suspense>
  )
}
