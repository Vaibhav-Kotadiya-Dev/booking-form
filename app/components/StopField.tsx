import { IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LocationSelect from "./LocationSelect";

interface StopFieldProps {
  index: number;
  value: string;
  excludeValues: string[];
  error?: boolean;
  errorText?: string;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

export default function StopField({
  index,
  value,
  excludeValues,
  error,
  errorText,
  onChange,
  onRemove,
}: StopFieldProps) {
  return (
    <div className="flex items-start gap-2 mt-2">
      <div className="flex-1">
        <LocationSelect
          value={value}
          onChange={(val) => onChange(index, val)}
          label={`Stop ${index + 1}`}
          excludeValues={excludeValues}
          error={error}
          errorText={errorText}
          testId={`stop-${index}`}
        />
      </div>
      <Tooltip title="Remove stop">
        <IconButton
          onClick={() => onRemove(index)}
          size="small"
          aria-label={`Remove stop ${index + 1}`}
          sx={{ mt: 0.5, color: "#9e9e9e", "&:hover": { color: "#d32f2f" } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
}
