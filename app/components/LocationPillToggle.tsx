import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { pillToggleSx } from "@/app/constants/theme";

interface LocationPillToggleProps {
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: string | null) => void;
  ariaLabel?: string;
}

export default function LocationPillToggle({
  value,
  onChange,
  ariaLabel = "Location type",
}: LocationPillToggleProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <ToggleButtonGroup value={value} exclusive onChange={onChange} aria-label={ariaLabel} sx={pillToggleSx}>
        <ToggleButton value="location">Location</ToggleButton>
        <ToggleButton value="airport">Airport</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
