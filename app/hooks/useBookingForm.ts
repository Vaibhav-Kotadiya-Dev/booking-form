"use client";

import { useState, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  validateContactNumber,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePickupLocation,
  validateDropLocation,
  validatePassengers,
  validateStop,
} from "@/app/utils/validation";
import { FormData, FormErrors, BookingResponse } from "@/app/types/booking";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  key: number;
}

const INITIAL_FORM_DATA: FormData = {
  tripType: "oneway",
  pickupType: "location",
  pickupDate: dayjs(),
  pickupTime: dayjs(),
  pickupLocation: "",
  stops: [],
  dropType: "location",
  dropLocation: "",
  contactNumber: "",
  firstName: "",
  lastName: "",
  email: "",
  passengers: "",
};

const INITIAL_ERRORS: FormErrors = {
  contactNumber: "",
  email: "",
  firstName: "",
  lastName: "",
  pickupLocation: "",
  dropLocation: "",
  passengers: "",
};

export function useBookingForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = useState<FormErrors>(INITIAL_ERRORS);
  const [stopErrors, setStopErrors] = useState<string[]>([]);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [touchedStops, setTouchedStops] = useState<Set<number>>(new Set());
  const [isRecognizedNumber, setIsRecognizedNumber] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState("");
  const [showContactFields, setShowContactFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<BookingResponse | null>(null);
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
    key: 0,
  });

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarState["severity"]) => {
      setSnackbar({ open: true, message, severity, key: Date.now() });
    },
    []
  );

  useEffect(() => {
    if (!localStorage.getItem("savedContacts")) {
      localStorage.setItem("savedContacts", JSON.stringify({}));
    }
  }, []);

  useEffect(() => {
    if (formData.contactNumber.length === 10) {
      const saved = JSON.parse(localStorage.getItem("savedContacts") || "{}");
      const contact = saved[formData.contactNumber];

      if (contact) {
        setIsRecognizedNumber(true);
        setShowContactFields(false);
        setGreetingMessage(`Welcome back, ${contact.firstName}!`);
        setFormData((prev) => ({
          ...prev,
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
        }));
        showSnackbar(`Welcome back, ${contact.firstName}! We've loaded your information.`, "success");
      } else {
        setIsRecognizedNumber(false);
        setShowContactFields(true);
        setGreetingMessage("");
        setFormData((prev) => ({ ...prev, firstName: "", lastName: "", email: "" }));
      }
    } else {
      setIsRecognizedNumber(false);
      setShowContactFields(false);
      setGreetingMessage("");
      setFormData((prev) => ({ ...prev, firstName: "", lastName: "", email: "" }));
    }
  }, [formData.contactNumber]);

  const handleFieldChange = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setTouchedFields((prev) => new Set(prev).add(field));

      if (typeof value === "string") {
        let error = "";
        switch (field) {
          case "contactNumber": error = validateContactNumber(value); break;
          case "email":         error = validateEmail(value, showContactFields); break;
          case "firstName":     error = validateFirstName(value, showContactFields); break;
          case "lastName":      error = validateLastName(value, showContactFields); break;
          case "pickupLocation":error = validatePickupLocation(value); break;
          case "dropLocation":  error = validateDropLocation(value); break;
          case "passengers":    error = validatePassengers(value); break;
        }
        if (field in INITIAL_ERRORS) {
          setFormErrors((prev) => ({ ...prev, [field]: error }));
        }
      }
    },
    [showContactFields]
  );

  const handleTripTypeChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, val: string | null) => {
      if (val) handleFieldChange("tripType", val);
    },
    [handleFieldChange]
  );

  const handlePickupTypeChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, val: string | null) => {
      if (val) handleFieldChange("pickupType", val);
    },
    [handleFieldChange]
  );

  const handleDropTypeChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, val: string | null) => {
      if (val) handleFieldChange("dropType", val);
    },
    [handleFieldChange]
  );

  const handleAddStop = useCallback(() => {
    setFormData((prev) => ({ ...prev, stops: [...prev.stops, ""] }));
    setStopErrors((prev) => [...prev, ""]);
  }, []);

  const handleRemoveStop = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
    setStopErrors((prev) => prev.filter((_, i) => i !== index));
    setTouchedStops((prev) => {
      const next = new Set<number>();
      prev.forEach((i) => { if (i !== index) next.add(i > index ? i - 1 : i); });
      return next;
    });
  }, []);

  const handleStopChange = useCallback((index: number, value: string) => {
    setFormData((prev) => {
      const stops = [...prev.stops];
      stops[index] = value;
      return { ...prev, stops };
    });
    setTouchedStops((prev) => new Set(prev).add(index));
    setStopErrors((prev) => {
      const next = [...prev];
      next[index] = validateStop(value);
      return next;
    });
  }, []);

  const saveContact = useCallback(
    (phone: string, contact: { firstName: string; lastName: string; email: string }) => {
      const saved = JSON.parse(localStorage.getItem("savedContacts") || "{}");
      saved[phone] = { ...contact, lastUsed: new Date().toISOString() };
      localStorage.setItem("savedContacts", JSON.stringify(saved));
    },
    []
  );

  const validateAll = useCallback((): boolean => {
    const allTouched = new Set(Object.keys(INITIAL_ERRORS));
    setTouchedFields(allTouched);

    const errors: FormErrors = {
      contactNumber: validateContactNumber(formData.contactNumber),
      email:         validateEmail(formData.email, showContactFields),
      firstName:     validateFirstName(formData.firstName, showContactFields),
      lastName:      validateLastName(formData.lastName, showContactFields),
      pickupLocation:validatePickupLocation(formData.pickupLocation),
      dropLocation:  validateDropLocation(formData.dropLocation),
      passengers:    validatePassengers(formData.passengers),
    };
    setFormErrors(errors);

    const newStopErrors = formData.stops.map((s) => validateStop(s));
    setStopErrors(newStopErrors);
    setTouchedStops(new Set(formData.stops.map((_, i) => i)));

    const mainValid = Object.values(errors).every((e) => !e);
    const stopsValid = newStopErrors.every((e) => !e);
    return mainValid && stopsValid;
  }, [formData, showContactFields]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateAll()) {
        showSnackbar("Please fix the errors before continuing.", "error");
        return;
      }

      setIsSubmitting(true);

      try {
        if (showContactFields && formData.contactNumber.length === 10) {
          saveContact(formData.contactNumber, {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          });
        }

        const payload = {
          tripType: formData.tripType,
          pickupType: formData.pickupType,
          pickupDate: formData.pickupDate?.format("YYYY-MM-DD") ?? "",
          pickupTime: formData.pickupTime?.format("HH:mm") ?? "",
          pickupLocation: formData.pickupLocation,
          stops: formData.stops.filter(Boolean),
          dropType: formData.dropType,
          dropLocation: formData.dropLocation,
          contactNumber: formData.contactNumber,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          passengers: formData.passengers,
        };

        const res = await fetch("/api/booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (result.success) {
          setBookingResult(result);
        } else {
          const errorMsg = result.detail
            ? `[${result.source ?? "Error"}] ${result.detail}`
            : result.message || "Booking failed.";
          console.error("[useBookingForm] API error:", result);
          showSnackbar(errorMsg, "error");
        }
      } catch (err) {
        console.error("[useBookingForm] Network error:", err);
        showSnackbar("Network error. Please try again.", "error");
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateAll, formData, showContactFields, saveContact, showSnackbar]
  );

  const handleCloseSnackbar = useCallback((_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const resetBooking = useCallback(() => {
    setBookingResult(null);
    setFormData(INITIAL_FORM_DATA);
    setFormErrors(INITIAL_ERRORS);
    setStopErrors([]);
    setTouchedFields(new Set());
    setTouchedStops(new Set());
    setIsRecognizedNumber(false);
    setGreetingMessage("");
    setShowContactFields(false);
  }, []);

  const hasError = useCallback(
    (field: keyof FormErrors) => touchedFields.has(field) && !!formErrors[field],
    [touchedFields, formErrors]
  );

  const hasStopError = useCallback(
    (index: number) => touchedStops.has(index) && !!stopErrors[index],
    [touchedStops, stopErrors]
  );

  return {
    formData,
    formErrors,
    stopErrors,
    isRecognizedNumber,
    greetingMessage,
    showContactFields,
    isSubmitting,
    bookingResult,
    snackbar,
    handleFieldChange,
    handleTripTypeChange,
    handlePickupTypeChange,
    handleDropTypeChange,
    handleAddStop,
    handleRemoveStop,
    handleStopChange,
    handleSubmit,
    handleCloseSnackbar,
    resetBooking,
    hasError,
    hasStopError,
  } as const;
}

export type UseBookingFormReturn = ReturnType<typeof useBookingForm>;
