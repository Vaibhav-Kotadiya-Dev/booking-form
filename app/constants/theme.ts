export const GOLD = "#C9A646";
export const PURPLE = "#4A148C";

export const focusedGoldSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "8px" },
  "& .MuiInputLabel-root.Mui-focused": { color: GOLD },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: GOLD,
  },
} as const;

export const pillToggleSx = {
  gap: "6px",
  "& .MuiToggleButtonGroup-grouped": {
    borderRadius: "20px !important",
    border: "1px solid #e0e0e0 !important",
    px: 2,
    py: 0.25,
    minHeight: "30px",
    textTransform: "none",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#555",
    "&.Mui-selected": {
      border: `1px solid ${GOLD} !important`,
      color: GOLD,
      backgroundColor: "transparent",
      "&:hover": { backgroundColor: "rgba(201,166,70,0.05)" },
    },
  },
} as const;
