import React from "react";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useEvents } from "../context/EventContext";
import { useUsers } from "../context/UsersContext";
import { EventCard } from "../components/EventCard";
import { AddEventModal } from "../components/AddEventModal";

export function EventsPage() {
  const { events } = useEvents();
  const { users } = useUsers();
  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Box p={6}>
      <Heading mb={6}>All Events</Heading>

      <Button colorScheme="teal" mb={6} onClick={onOpen}>
        Add Event
      </Button>

      <AddEventModal isOpen={open} onClose={onClose} />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} users={users} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
