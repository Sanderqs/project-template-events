import React, { useState, useMemo, useEffect } from "react";
import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { useUsers } from "../context/UsersContext";
import { EventCard } from "../components/EventCard";
import { CategoryFilter } from "../components/CategoryFilter";
import { SearchBar } from "../components/SearchBar";
import { useDisclosure } from "@chakra-ui/react";
import { AddEventDialog } from "../components/AddEventDialog";
import { useNavigate } from "react-router-dom";
export function EventsPage() {
  const { users } = useUsers();
  const { open, onOpen, onClose } = useDisclosure();
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  // Dialog open Close
  useEffect(() => {
    if (location.pathname === "/add-event") {
      onOpen();
    }
  }, [location.pathname, onOpen]);

  const handleClose = () => {
    onClose();
    navigate("/"); // go back to events page
  };

  // Apply category filter on top of search results
  const finalEvents = useMemo(() => {
    if (!selectedCategory) return searchResults;

    return searchResults.filter((event) =>
      event.categoryIds?.includes(Number(selectedCategory)),
    );
  }, [searchResults, selectedCategory]);

  return (
    <>
      <Box p={6}>
        <Heading mb={6}>All Events</Heading>

        <Stack spacing={4} mb={6}>
          {/* Search Component */}
          <SearchBar onResult={setSearchResults} />

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {finalEvents.map((event) => (
            <EventCard key={event.id} event={event} users={users} />
          ))}
        </SimpleGrid>
      </Box>
      <AddEventDialog open={open} onClose={handleClose} />
    </>
  );
}
