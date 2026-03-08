import { Input, Box } from "@chakra-ui/react";
import React, { useState, useMemo } from "react";
import { useEvents } from "../context/EventContext";
import { useUsers } from "../context/UsersContext";
import { CategoryFilter } from "../components/CategoryFilter";
import { EventCard } from "../components/EventCard";
import { SimpleGrid } from "@chakra-ui/react";

export function EventsPage() {
  const { events = [] } = useEvents();
  const { users = [] } = useUsers();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryChange = (vals) => setSelectedCategories(vals);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filter events by category and search
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes("all") ||
        event.categoryIds.some((id) => selectedCategories.includes(String(id)));

      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategories, searchTerm]);

  const handleEdit = (event) => {
    console.log("Edit event:", event);
    // open dialog here
  };

  return (
    <Box p={6}>
      {/* Search bar */}
      <Input
        placeholder="Search events..."
        mb={4}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {/* Category Filter */}
      <CategoryFilter
        selectedCategoryIds={selectedCategories}
        onChange={handleCategoryChange}
      />

      {/* Event Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            users={users}
            onEdit={handleEdit}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
