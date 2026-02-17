import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

export function AddEventModal({ onAddEvent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    image: "",
    createdBy: "",
    categoryIds: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryIds") {
      const arr = value
        .split(",")
        .map((id) => parseInt(id.trim()))
        .filter((id) => !isNaN(id));
      setNewEvent({ ...newEvent, categoryIds: arr });
    } else if (name === "createdBy") {
      const num = parseInt(value);
      setNewEvent({ ...newEvent, [name]: isNaN(num) ? "" : num });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent(newEvent);
    onClose();
    setNewEvent({
      title: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      image: "",
      createdBy: "",
      categoryIds: [],
    });
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>
        + Add Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={newEvent.title}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    name="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Location</FormLabel>
                  <Input
                    name="location"
                    value={newEvent.location}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Start Time</FormLabel>
                  <Input
                    type="datetime-local"
                    name="startTime"
                    value={newEvent.startTime}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>End Time</FormLabel>
                  <Input
                    type="datetime-local"
                    name="endTime"
                    value={newEvent.endTime}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    name="image"
                    value={newEvent.image}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Created By (User ID)</FormLabel>
                  <Input
                    name="createdBy"
                    value={newEvent.createdBy}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Category IDs (comma separated)</FormLabel>
                  <Input
                    name="categoryIds"
                    value={newEvent.categoryIds?.join(", ")}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="teal" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
