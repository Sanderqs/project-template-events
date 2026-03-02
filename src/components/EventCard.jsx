import {
  Box,
  Image,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useCategories } from "../context/CategoriesContext";
import { useNavigate } from "react-router-dom";

export function EventCard({ event, users, onEdit }) {
  const { categories } = useCategories();
  const navigate = useNavigate();

  // Format start and end times
  const start = new Date(event.startTime).toLocaleString();
  const end = new Date(event.endTime).toLocaleString();

  // Map category IDs to names
  const eventCategories = event.categoryIds
    .map(
      (id) =>
        categories.find((cat) => Number(cat.id) === Number(id))?.name || id,
    )
    .join(", ");

  // Map createdBy ID to user name
  const creator =
    users.find((u) => Number(u.id) === Number(event.createdBy))?.name ||
    event.createdBy;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      cursor="pointer"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "0.3s" }}
      onClick={() => navigate(`/event/${event.id}`)} // ✅ clickable
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
            <Badge colorScheme="blue">Created by: {creator}</Badge>
            <Badge colorScheme="green">Category: {eventCategories}</Badge>
          </Stack>
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onEdit(event);
            }}
            _hover={{
              boxShadow: "xl",
              transform: "scale(1.02)",
              transition: "0.3s",
            }}
          >
            Edit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
//fix color in badge
