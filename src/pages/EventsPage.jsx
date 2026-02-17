import { SimpleGrid, Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEvents } from "../context/EventContext";
import { useCategories } from "../context/CategoriesContext";
import { useUsers } from "../context/UsersContext"; // ✅ import users
import { EventCard } from "../components/EventCard";

export function EventsPage() {
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const { loading: categoriesLoading, error: categoriesError } =
    useCategories();
  const { users, loading: usersLoading, error: usersError } = useUsers(); // ✅ get users

  const loading = eventsLoading || categoriesLoading || usersLoading;
  const error = eventsError || categoriesError || usersError;

  if (loading)
    return (
      <Box p="6" textAlign="center">
        <Spinner size="xl" />
        <Text mt="4">Loading events...</Text>
      </Box>
    );

  if (error)
    return (
      <Box p="6" textAlign="center">
        <Text color="red.500">Error: {error}</Text>
      </Box>
    );

  return (
    <Box p="6">
      <Heading mb="6" textAlign="center">
        All Events
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} users={users} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
