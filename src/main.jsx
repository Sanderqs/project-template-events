import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";
import { EventProvider } from "./context/EventContext";
import { CategoriesProvider } from "./context/CategoriesContext";
// import { UsersProvider } from "./context/UsersContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        // loader: postListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        // loader: postLoader,
        // action: addComment,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <CategoriesProvider>
        <EventProvider>
          <RouterProvider router={router} />
        </EventProvider>
      </CategoriesProvider>
    </Provider>
  </React.StrictMode>,
);
