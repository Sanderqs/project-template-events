import { createContext, useContext, useEffect, useState } from "react";
import { getEvents, createEvent } from "../services/api";

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // ✅ New function to add event and update context
  const addEvent = async (eventData) => {
    try {
      const newEvent = await createEvent(eventData);
      setEvents((prev) => [...prev, newEvent]);
    } catch (err) {
      console.error("Failed to add event:", err);
      throw err;
    }
  };

  return (
    <EventContext.Provider value={{ events, loading, error, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}
