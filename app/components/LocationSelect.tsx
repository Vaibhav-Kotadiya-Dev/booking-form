import { FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { GOLD, focusedGoldSx } from "@/app/constants/theme";
import { locations } from "@/app/utils/locations";

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  excludeValues?: string[];
  error?: boolean;
  errorText?: string;
  testId?: string;
}

export default function LocationSelect({
  value,
  onChange,
  label = "Location",
  excludeValues = [],
  error = false,
  errorText,
  testId,
}: LocationSelectProps) {
  const available = locations.filter((loc) => !excludeValues.includes(loc.value));

  return (
    <FormControl fullWidth size="small" error={error} sx={focusedGoldSx}>
      <InputLabel>{label}</InputLabel>
      <Select
        data-testid={testId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        input={
          <OutlinedInput
            label={label}
            startAdornment={
              <InputAdornment position="start">
                <LocationOnIcon fontSize="small" sx={{ color: GOLD }} />
              </InputAdornment>
            }
          />
        }
      >
        {available.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && errorText && (
        <p style={{ color: "#d32f2f", fontSize: "12px", marginTop: "4px" }}>{errorText}</p>
      )}
    </FormControl>
  );
}
