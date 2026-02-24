import { Dialog, Button } from "@chakra-ui/react";

export function AddEventDialog({ open, onClose }) {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>Add Event</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>Empty Dialog</Dialog.Body>

          <Dialog.Footer>
            <Button onClick={onClose}>Close</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
