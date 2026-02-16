import { createContext, useContext, useEffect, useState } from "react";
import { getEvents } from "../services/api";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents(); // fetch all events
        setEvents(data); // store all events
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, loading, error }}>
      {children}
    </EventContext.Provider>
  );
}

// Custom hook for consuming the context
export function useEvents() {
  return useContext(EventContext);
}
