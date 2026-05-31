import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import TagIcon from "@mui/icons-material/Tag";
import { GOLD } from "@/app/constants/theme";
import { FormErrors } from "@/app/types/booking";

interface PassengersSectionProps {
  passengers: string;
  formErrors: FormErrors;
  hasError: (field: keyof FormErrors) => boolean;
  onChange: (val: string) => void;
}

export default function PassengersSection({
  passengers,
  formErrors,
  hasError,
  onChange,
}: PassengersSectionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold mb-1" style={{ color: GOLD }}>
        How many passengers are expected for the trip?
      </h3>
      <FormControl fullWidth sx={{ my: 1 }} size="small" error={hasError("passengers")}>
        <InputLabel htmlFor="passengers"># Passengers</InputLabel>
        <OutlinedInput
          id="passengers"
          type="number"
          value={passengers}
          onChange={(e) => onChange(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <TagIcon fontSize="small" sx={{ color: GOLD }} />
            </InputAdornment>
          }
          label="# Passengers"
          inputProps={{ min: 1, max: 20 }}
        />
        {hasError("passengers") && (
          <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>
            {formErrors.passengers}
          </p>
        )}
      </FormControl>
    </div>
  );
}
