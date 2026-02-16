import { Box, Image, Heading, Text, Stack, Badge } from "@chakra-ui/react";
import { useCategories } from "../context/CategoriesContext";

export function EventCard({ event }) {
  const { categories } = useCategories();

  // Format start and end times
  const start = new Date(event.startTime).toLocaleString();
  const end = new Date(event.endTime).toLocaleString();

  // Map category IDs to category names
  const eventCategories = event.categoryIds
    .map((id) => categories.find((cat) => cat.id === id)?.name || id)
    .join(", ");

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "0.3s" }}
    >
      <Image
        src={event.image}
        alt={event.title}
        objectFit="cover"
        w="100%"
        h="200px"
      />

      <Box p="6">
        <Stack spacing="3">
          <Heading size="md">{event.title}</Heading>
          <Text>{event.description}</Text>
          <Text fontSize="sm" color="gray.600">
            Location: {event.location}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Time: {start} - {end}
          </Text>

          <Stack direction="row" spacing="2" align="center">
            <Badge colorScheme="blue">Created by: {event.createdBy}</Badge>
            <Badge colorScheme="green">Category: {eventCategories}</Badge>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
