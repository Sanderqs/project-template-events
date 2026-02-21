import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Badge,
  Spinner,
  Center,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useCategories } from "../context/CategoriesContext";
import { useUsers } from "../context/UsersContext";

export function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const { users, loading: usersLoading, error: usersError } = useUsers();

  const loading = eventsLoading || categoriesLoading || usersLoading;
  const error = eventsError || categoriesError || usersError;

  // 🔹 Loading state
  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500" fontWeight="bold">
          Error: {error}
        </Text>
      </Center>
    );
  }

  // 🔹 Find event safely
  const event = events.find((e) => Number(e.id) === Number(eventId));

  if (!event) {
    return (
      <Center h="100vh">
        <Text>Event not found</Text>
      </Center>
    );
  }

  // 🔹 Safe creator lookup (prevents ID showing)
  const creatorUser = users.find(
    (u) => Number(u.id) === Number(event.createdBy)
  );
  const creator = creatorUser ? creatorUser.name : "Unknown user";

  // 🔹 Safe category lookup
  const eventCategories = event.categoryIds
    ?.map((id) => {
      const category = categories.find((c) => c.id === Number(id));
      return category ? category.name : null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <Center p={6}>
      <Box
        maxW="2xl"
        w="100%"
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="lg">
        {/* Back Button */}
        <Box p={4}>
          <Button size="sm" onClick={() => navigate(-1)}>
            ← Back
          </Button>
        </Box>

        {/* Event Image */}
        <Image
          src={event.image}
          alt={event.title}
          objectFit="cover"
          w="100%"
          h={{ base: "200px", md: "300px" }}
        />

        {/* Event Details */}
        <Box p={6}>
          <Stack spacing={4}>
            <Heading size="lg">{event.title}</Heading>

            <Text>{event.description}</Text>

            <Text fontSize="sm" color="gray.600">
              📍 Location: {event.location}
            </Text>

            <Text fontSize="sm" color="gray.600">
              🕒 Time: {new Date(event.startTime).toLocaleString()} -{" "}
              {new Date(event.endTime).toLocaleString()}
            </Text>

            <HStack spacing={2} flexWrap="wrap">
              <Badge colorScheme="blue">Created by: {creator}</Badge>

              {eventCategories && (
                <Badge colorScheme="green">Categories: {eventCategories}</Badge>
              )}
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
