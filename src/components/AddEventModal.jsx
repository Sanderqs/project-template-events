export function AddEventModal({ isOpen, onClose }) {
  if (!isOpen) return null; // only render when open

  return (
    <div>
      AddEventModal Component
      <button onClick={onClose}>Close Modal</button>
    </div>
  );
}
