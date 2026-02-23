import React, { useState } from "react";
import {
  Dialog,
  Stack,
  Button,
  Input,
  Textarea,
  Field,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import { useCategories } from "../context/CategoriesContext";
import { useEvents } from "../context/EventContext";

export function AddEventDialog({ open, onClose }) {
  const { categories = [] } = useCategories();
  const { setEvents } = useEvents();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (formData.categoryIds.length === 0)
      newErrors.categoryIds = "Select at least one category";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const newEvent = {
      ...formData,
      id: Date.now(),
      createdBy: 1,
    };

    setEvents((prev) => [...prev, newEvent]);

    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Add Event</Dialog.Title>
        </Dialog.Header>

        <Dialog.Body>
          <Stack spacing={4}>
            {/* Title */}
            <Field.Root invalid={!!errors.title}>
              <Field.Label>Title</Field.Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <Field.ErrorText>{errors.title}</Field.ErrorText>
            </Field.Root>

            {/* Description */}
            <Field.Root invalid={!!errors.description}>
              <Field.Label>Description</Field.Label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              <Field.ErrorText>{errors.description}</Field.ErrorText>
            </Field.Root>

            {/* Image */}
            <Field.Root invalid={!!errors.image}>
              <Field.Label>Image URL</Field.Label>
              <Input
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
              />
              <Field.ErrorText>{errors.image}</Field.ErrorText>
            </Field.Root>

            {/* Start Time */}
            <Field.Root invalid={!!errors.startTime}>
              <Field.Label>Start Time</Field.Label>
              <Input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => handleChange("startTime", e.target.value)}
              />
              <Field.ErrorText>{errors.startTime}</Field.ErrorText>
            </Field.Root>

            {/* End Time */}
            <Field.Root invalid={!!errors.endTime}>
              <Field.Label>End Time</Field.Label>
              <Input
                type="datetime-local"
                value={formData.endTime}
                onChange={(e) => handleChange("endTime", e.target.value)}
              />
              <Field.ErrorText>{errors.endTime}</Field.ErrorText>
            </Field.Root>

            {/* Categories */}
            <Field.Root invalid={!!errors.categoryIds}>
              <Field.Label>Categories</Field.Label>
              <CheckboxGroup
                value={formData.categoryIds}
                onValueChange={(details) =>
                  handleChange("categoryIds", details.value)
                }
              >
                <Stack>
                  {categories.map((category) => (
                    <Checkbox key={category.id} value={String(category.id)}>
                      {category.name}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
              <Field.ErrorText>{errors.categoryIds}</Field.ErrorText>
            </Field.Root>
          </Stack>
        </Dialog.Body>

        <Dialog.Footer>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={handleSubmit}>
            Create Event
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
