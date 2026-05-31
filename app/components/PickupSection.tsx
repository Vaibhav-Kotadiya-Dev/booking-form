import { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GOLD, focusedGoldSx } from "@/app/constants/theme";
import LocationPillToggle from "./LocationPillToggle";
import LocationSelect from "./LocationSelect";
import StopField from "./StopField";

interface PickupSectionProps {
  pickupType: string;
  pickupDate: Dayjs | null;
  pickupTime: Dayjs | null;
  pickupLocation: string;
  stops: string[];
  dropLocation: string;
  pickupLocationError?: boolean;
  pickupLocationErrorText?: string;
  stopErrors: string[];
  onPickupTypeChange: (e: React.MouseEvent<HTMLElement>, val: string | null) => void;
  onDateChange: (val: Dayjs | null) => void;
  onTimeChange: (val: Dayjs | null) => void;
  onPickupLocationChange: (val: string) => void;
  onStopChange: (index: number, val: string) => void;
  onAddStop: () => void;
  onRemoveStop: (index: number) => void;
  hasStopError: (index: number) => boolean;
}

export default function PickupSection({
  pickupType,
  pickupDate,
  pickupTime,
  pickupLocation,
  stops,
  dropLocation,
  pickupLocationError,
  pickupLocationErrorText,
  stopErrors,
  onPickupTypeChange,
  onDateChange,
  onTimeChange,
  onPickupLocationChange,
  onStopChange,
  onAddStop,
  onRemoveStop,
  hasStopError,
}: PickupSectionProps) {
  const usedByDropoff = [dropLocation].filter(Boolean);
  const pickupExclude = [...usedByDropoff, ...stops].filter(Boolean);

  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold mb-4 text-gray-900">Pickup</h3>

      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Pickup Date"
            value={pickupDate}
            onChange={onDateChange}
            slotProps={{ textField: { fullWidth: true, size: "small", sx: focusedGoldSx } }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Pickup Time"
            value={pickupTime}
            onChange={onTimeChange}
            slotProps={{ textField: { fullWidth: true, size: "small", sx: focusedGoldSx } }}
          />
        </LocalizationProvider>
      </div>

      <LocationPillToggle
        value={pickupType}
        onChange={onPickupTypeChange}
        ariaLabel="Pickup location type"
      />

      <LocationSelect
        value={pickupLocation}
        onChange={onPickupLocationChange}
        excludeValues={pickupExclude}
        error={pickupLocationError}
        errorText={pickupLocationErrorText}
        testId="pickup-location"
      />

      {stops.map((stop, index) => {
        const stopExclude = [
          pickupLocation,
          dropLocation,
          ...stops.filter((_, i) => i !== index),
        ].filter(Boolean);

        return (
          <StopField
            key={index}
            index={index}
            value={stop}
            excludeValues={stopExclude}
            error={hasStopError(index)}
            errorText={hasStopError(index) ? stopErrors[index] : undefined}
            onChange={onStopChange}
            onRemove={onRemoveStop}
          />
        );
      })}

      <button
        type="button"
        onClick={onAddStop}
        className="mt-2 text-sm font-medium"
        style={{ color: GOLD, background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        + Add a stop
      </button>
    </div>
  );
}
