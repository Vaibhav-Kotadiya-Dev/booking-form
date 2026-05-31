import { Dayjs } from "dayjs";

export interface FormData {
  tripType: string;
  pickupType: string;
  pickupDate: Dayjs | null;
  pickupTime: Dayjs | null;
  pickupLocation: string;
  stops: string[];
  dropType: string;
  dropLocation: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  passengers: string;
}

export interface FormErrors {
  contactNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  pickupLocation: string;
  dropLocation: string;
  passengers: string;
}

export interface BookingSubmission {
  tripType: string;
  pickupType: string;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  stops: string[];
  dropType: string;
  dropLocation: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  passengers: string;
  distanceKm?: number;
  durationMinutes?: number;
}

export interface BookingResponse {
  success: boolean;
  bookingId: string;
  message: string;
  estimatedFare: number;
  data: BookingSubmission;
}
