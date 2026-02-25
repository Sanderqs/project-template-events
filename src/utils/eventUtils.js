import { validateEvent } from "./validateEvents";

// Utility to handle submitting a new event
export async function submitEvent({ formData, addEvent, setErrors }) {
  // 1️⃣ Validate first
  const validationErrors = validateEvent(formData);
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return false; // indicate failure
  }

  try {
    // 2️⃣ Send to server / update context
    await addEvent(formData);
    return true; // indicate success
  } catch (err) {
    console.error("Failed to create event:", err);
    setErrors({ submit: "Failed to create event. Try again." });
    return false;
  }
}
