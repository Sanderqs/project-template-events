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

  if (loading)
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  if (error)
    return (
      <Center h="100vh">
        <Text color="red.500" fontWeight="bold">
          Error: {error}
        </Text>
      </Center>
    );

  const event = events.find((e) => e.id === parseInt(eventId));

  if (!event)
    return (
      <Center h="100vh">
        <Text>Event not found</Text>
      </Center>
    );

  const creator =
    users.find((u) => u.id === event.createdBy)?.name || event.createdBy;

  const eventCategories = event.categoryIds
    .map((id) => categories.find((c) => c.id === id)?.name || id)
    .join(", ");

  return (
    <Center
      p="6"
      h="100vh"
      onClick={() => navigate(-1)} // ✅ click anywhere to go back
      cursor="pointer"
    >
      <Box
        maxW="2xl"
        w="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
      >
        {/* Event Image */}
        <Image
          src={event.image}
          alt={event.title}
          objectFit="cover"
          w="100%"
          h={{ base: "200px", md: "300px" }}
        />

        {/* Event Details */}
        <Box p="6">
          <Stack spacing="4">
            <Heading size="lg">{event.title}</Heading>
            <Text>{event.description}</Text>
            <Text fontSize="sm" color="gray.600">
              Location: {event.location}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Time: {new Date(event.startTime).toLocaleString()} -{" "}
              {new Date(event.endTime).toLocaleString()}
            </Text>
            <Stack direction="row" spacing="2">
              <Badge colorScheme="blue">Created by: {creator}</Badge>
              <Badge colorScheme="green">Categories: {eventCategories}</Badge>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
