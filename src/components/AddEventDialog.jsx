import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Input,
  Textarea,
  Stack,
  Field,
  Checkbox,
} from "@chakra-ui/react";
import { useCategories } from "../context/CategoriesContext";
import { useEvents } from "../context/EventContext";
import { updateFormField, clearFieldError } from "../utils/formUtils";
import { validateEvent } from "../utils/validateEvents";

export function AddEventDialog({ open, onClose, eventToEdit = null }) {
  const { categories = [] } = useCategories();
  const { addEvent, updateEvent } = useEvents();

  const isEditMode = !!eventToEdit;

  const initialState = {
    title: "",
    description: "",
    image: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // 🔥 When editing, preload event data
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        ...eventToEdit,
        categoryIds: eventToEdit.categoryIds.map(String),
      });
    } else {
      setFormData(initialState);
    }
  }, [eventToEdit]);

  const handleChange = (field, value) => {
    setFormData((prev) => updateFormField(prev, field, value));
    setErrors((prev) => clearFieldError(prev, field));
  };

  const handleSubmit = async () => {
    const validationErrors = validateEvent(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditMode) {
        await updateEvent(formData);
      } else {
        await addEvent(formData);
      }

      setErrors({});
      onClose();
    } catch (err) {
      console.error("Failed to save event:", err);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              {isEditMode ? "Edit Event" : "Add Event"}
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Stack gap={4}>
              {/* Title */}
              <Field.Root invalid={!!errors.title}>
                <Field.Label>Title</Field.Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
                {errors.title && (
                  <Field.ErrorText>{errors.title}</Field.ErrorText>
                )}
              </Field.Root>

              {/* Description */}
              <Field.Root invalid={!!errors.description}>
                <Field.Label>Description</Field.Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                {errors.description && (
                  <Field.ErrorText>{errors.description}</Field.ErrorText>
                )}
              </Field.Root>

              {/* Image */}
              <Field.Root invalid={!!errors.image}>
                <Field.Label>Image URL</Field.Label>
                <Input
                  value={formData.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                />
                {errors.image && (
                  <Field.ErrorText>{errors.image}</Field.ErrorText>
                )}
              </Field.Root>

              {/* Start Time */}
              <Field.Root invalid={!!errors.startTime}>
                <Field.Label>Start Time</Field.Label>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                />
                {errors.startTime && (
                  <Field.ErrorText>{errors.startTime}</Field.ErrorText>
                )}
              </Field.Root>

              {/* End Time */}
              <Field.Root invalid={!!errors.endTime}>
                <Field.Label>End Time</Field.Label>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                />
                {errors.endTime && (
                  <Field.ErrorText>{errors.endTime}</Field.ErrorText>
                )}
              </Field.Root>

              {/* Categories */}
              <Field.Root invalid={!!errors.categoryIds}>
                <Field.Label>Categories</Field.Label>
                <Stack>
                  {categories.map((category) => {
                    const value = String(category.id);
                    const checked = formData.categoryIds.includes(value);

                    return (
                      <Checkbox.Root
                        key={category.id}
                        checked={checked}
                        onCheckedChange={(details) => {
                          if (details.checked) {
                            handleChange("categoryIds", [
                              ...formData.categoryIds,
                              value,
                            ]);
                          } else {
                            handleChange(
                              "categoryIds",
                              formData.categoryIds.filter((id) => id !== value),
                            );
                          }
                        }}
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{category.name}</Checkbox.Label>
                      </Checkbox.Root>
                    );
                  })}
                </Stack>
                {errors.categoryIds && (
                  <Field.ErrorText>{errors.categoryIds}</Field.ErrorText>
                )}
              </Field.Root>
            </Stack>
          </Dialog.Body>

          <Dialog.Footer>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit}>
              {isEditMode ? "Save Changes" : "Create Event"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
