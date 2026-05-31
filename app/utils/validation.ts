export function validateContactNumber(value: string): string {
  if (!value) return "Contact number is required";
  if (!/^[0-9]{10}$/.test(value)) return "Enter a valid 10-digit number";
  return "";
}

export function validateEmail(value: string, required = false): string {
  if (!value && required) return "Email is required";
  if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address";
  return "";
}

export function validateFirstName(value: string, required = false): string {
  if (!value && required) return "First name is required";
  if (value && value.length < 2) return "First name must be at least 2 characters";
  return "";
}

export function validateLastName(value: string, required = false): string {
  if (!value && required) return "Last name is required";
  if (value && value.length < 2) return "Last name must be at least 2 characters";
  return "";
}

export function validatePickupLocation(value: string): string {
  if (!value) return "Pickup location is required";
  return "";
}

export function validateDropLocation(value: string): string {
  if (!value) return "Drop-off location is required";
  return "";
}

export function validatePassengers(value: string): string {
  if (!value) return "Number of passengers is required";
  const n = parseInt(value, 10);
  if (n < 1) return "Must have at least 1 passenger";
  if (n > 20) return "Maximum 20 passengers allowed";
  return "";
}

export function validateStop(value: string): string {
  if (!value) return "Stop location is required";
  return "";
}
