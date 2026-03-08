// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./components/Root";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";

import { UsersProvider } from "./context/UsersContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { EventProvider } from "./context/EventContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <EventsPage /> },
      { path: "/event/:eventId", element: <EventPage /> },
      { path: "/add-event", element: <EventsPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ChakraProvider must wrap all Chakra UI components */}
    <ChakraProvider>
      {/* Wrap all contexts in stable order */}
      <UsersProvider>
        <CategoriesProvider>
          <EventProvider>
            <RouterProvider router={router} />
          </EventProvider>
        </CategoriesProvider>
      </UsersProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
