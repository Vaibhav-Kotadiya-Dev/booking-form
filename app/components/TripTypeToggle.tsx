import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { GOLD } from "@/app/constants/theme";

interface TripTypeToggleProps {
  value: string;
  onChange: (event: React.MouseEvent<HTMLElement>, newValue: string | null) => void;
}

export default function TripTypeToggle({ value, onChange }: TripTypeToggleProps) {
  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      <ToggleButtonGroup
        value={value}
        exclusive
        fullWidth
        onChange={onChange}
        aria-label="Trip type"
        sx={{
          border: `1px solid ${GOLD}`,
          borderRadius: "8px",
          overflow: "hidden",
          "& .MuiToggleButtonGroup-grouped": {
            margin: 0,
            border: 0,
            borderRadius: 0,
            "&:not(:last-of-type)": { borderRight: `1px solid ${GOLD}` },
            "&.Mui-selected": {
              backgroundColor: GOLD,
              color: "#fff",
              "&:hover": { backgroundColor: GOLD },
            },
          },
        }}
      >
        <ToggleButton
          value="oneway"
          sx={{ flex: 1, textTransform: "none", minHeight: "40px", fontSize: "0.9rem" }}
        >
          <AddCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" />
          One-way
        </ToggleButton>
        <ToggleButton
          value="hourly"
          sx={{ flex: 1, textTransform: "none", minHeight: "40px", fontSize: "0.9rem" }}
        >
          <HourglassEmptyIcon sx={{ mr: 1 }} fontSize="small" />
          Hourly
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
