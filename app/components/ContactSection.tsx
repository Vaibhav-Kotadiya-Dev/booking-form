import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { GOLD } from "@/app/constants/theme";
import { FormErrors } from "@/app/types/booking";

interface ContactSectionProps {
  contactNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  formErrors: FormErrors;
  showContactFields: boolean;
  isRecognizedNumber: boolean;
  hasError: (field: keyof FormErrors) => boolean;
  onContactNumberChange: (val: string) => void;
  onFirstNameChange: (val: string) => void;
  onLastNameChange: (val: string) => void;
  onEmailChange: (val: string) => void;
}

export default function ContactSection({
  contactNumber,
  firstName,
  lastName,
  email,
  formErrors,
  showContactFields,
  isRecognizedNumber,
  hasError,
  onContactNumberChange,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
}: ContactSectionProps) {
  return (
    <div className="mb-1">
      <h3 className="text-base font-semibold mb-4 text-gray-900">Contact Information</h3>

      <FormControl fullWidth sx={{ mb: 0.5 }} size="small" error={hasError("contactNumber")}>
        <InputLabel>Contact number</InputLabel>
        <OutlinedInput
          value={contactNumber}
          data-testid="contact-number"
          onChange={(e) => onContactNumberChange(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <span style={{ fontSize: "18px", lineHeight: 1 }}>🇺🇸</span>
              <span style={{ marginLeft: "4px", fontSize: "14px", color: "#333", fontWeight: 500 }}>
                +1
              </span>
            </InputAdornment>
          }
          label="Contact number"
          inputProps={{ maxLength: 10 }}
        />
        {hasError("contactNumber") && (
          <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
            {formErrors.contactNumber}
          </p>
        )}
      </FormControl>

      {contactNumber.length === 10 && !isRecognizedNumber && (
        <p className="text-xs mb-2" style={{ color: GOLD }}>
          We don&apos;t have that phone number on file. Please provide additional contact information.
        </p>
      )}
      {isRecognizedNumber && (
        <p className="text-xs mb-2" style={{ color: GOLD }}>
          We found your information on file. Welcome back!
        </p>
      )}

      {showContactFields && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-1">
            <FormControl fullWidth sx={{ my: 1 }} size="small" error={hasError("firstName")}>
              <InputLabel htmlFor="first-name">First name</InputLabel>
              <OutlinedInput
                id="first-name"
                value={firstName}
                onChange={(e) => onFirstNameChange(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" sx={{ color: GOLD }} />
                  </InputAdornment>
                }
                label="First name"
              />
              {hasError("firstName") && (
                <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                  {formErrors.firstName}
                </p>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ my: 1 }} size="small" error={hasError("lastName")}>
              <InputLabel htmlFor="last-name">Last name</InputLabel>
              <OutlinedInput
                id="last-name"
                value={lastName}
                onChange={(e) => onLastNameChange(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" sx={{ color: GOLD }} />
                  </InputAdornment>
                }
                label="Last name"
              />
              {hasError("lastName") && (
                <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                  {formErrors.lastName}
                </p>
              )}
            </FormControl>
          </div>

          <FormControl fullWidth sx={{ my: 1 }} size="small" error={hasError("email")}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              id="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <AlternateEmailIcon fontSize="small" sx={{ color: GOLD }} />
                </InputAdornment>
              }
              label="Email"
            />
            {hasError("email") && (
              <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
                {formErrors.email}
              </p>
            )}
          </FormControl>
        </>
      )}
    </div>
  );
}
