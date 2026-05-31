"use client";

import { Alert, Snackbar } from "@mui/material";
import { useBookingForm } from "@/app/hooks/useBookingForm";
import { GOLD, PURPLE } from "@/app/constants/theme";
import Logo from "./Logo";
import TripTypeToggle from "./TripTypeToggle";
import PickupSection from "./PickupSection";
import DropoffSection from "./DropoffSection";
import ContactSection from "./ContactSection";
import PassengersSection from "./PassengersSection";
import BookingConfirmation from "./BookingConfirmation";

export default function BookingForm() {
  const {
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
  } = useBookingForm();

  if (bookingResult) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6 md:p-10">
        <BookingConfirmation result={bookingResult} onReset={resetBooking} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 sm:p-6 md:p-10">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-lg h-fit"
      >
        <Logo />

        <h1 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: PURPLE }}>
          Let&apos;s get you on your way!
        </h1>

        {greetingMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">{greetingMessage}</p>
          </div>
        )}

        <TripTypeToggle value={formData.tripType} onChange={handleTripTypeChange} />

        <PickupSection
          pickupType={formData.pickupType}
          pickupDate={formData.pickupDate}
          pickupTime={formData.pickupTime}
          pickupLocation={formData.pickupLocation}
          stops={formData.stops}
          dropLocation={formData.dropLocation}
          pickupLocationError={hasError("pickupLocation")}
          pickupLocationErrorText={formErrors.pickupLocation}
          stopErrors={stopErrors}
          onPickupTypeChange={handlePickupTypeChange}
          onDateChange={(val) => handleFieldChange("pickupDate", val)}
          onTimeChange={(val) => handleFieldChange("pickupTime", val)}
          onPickupLocationChange={(val) => handleFieldChange("pickupLocation", val)}
          onStopChange={handleStopChange}
          onAddStop={handleAddStop}
          onRemoveStop={handleRemoveStop}
          hasStopError={hasStopError}
        />

        <DropoffSection
          dropType={formData.dropType}
          dropLocation={formData.dropLocation}
          pickupLocation={formData.pickupLocation}
          stops={formData.stops}
          dropLocationError={hasError("dropLocation")}
          dropLocationErrorText={formErrors.dropLocation}
          onDropTypeChange={handleDropTypeChange}
          onDropLocationChange={(val) => handleFieldChange("dropLocation", val)}
        />

        <ContactSection
          contactNumber={formData.contactNumber}
          firstName={formData.firstName}
          lastName={formData.lastName}
          email={formData.email}
          formErrors={formErrors}
          showContactFields={showContactFields}
          isRecognizedNumber={isRecognizedNumber}
          hasError={hasError}
          onContactNumberChange={(val) => handleFieldChange("contactNumber", val)}
          onFirstNameChange={(val) => handleFieldChange("firstName", val)}
          onLastNameChange={(val) => handleFieldChange("lastName", val)}
          onEmailChange={(val) => handleFieldChange("email", val)}
        />

        <PassengersSection
          passengers={formData.passengers}
          formErrors={formErrors}
          hasError={hasError}
          onChange={(val) => handleFieldChange("passengers", val)}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-white rounded-lg font-semibold text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: GOLD }}
          onMouseOver={(e) => { if (!isSubmitting) e.currentTarget.style.backgroundColor = "#b8922e"; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = GOLD; }}
        >
          {isSubmitting ? "Confirming…" : "Continue"}
        </button>
      </form>

      <Snackbar
        key={snackbar.key}
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
