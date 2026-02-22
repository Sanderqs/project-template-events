import React from "react";
import { Input, Box } from "@chakra-ui/react";
import { useEvents } from "../context/EventContext";
import { useMemo } from "react";
import { useEffect, useState } from "react";

export function SearchBar({ onResult }) {
  const { events } = useEvents();
  const [searchTerm, setSearchTerm] = useState("");
  console.log(searchTerm);
  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, events]);

  useEffect(() => {
    onResult(filteredEvents);
  }, [filteredEvents, onResult]);

  return (
    <Box mb={4}>
      <Input
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );
}
