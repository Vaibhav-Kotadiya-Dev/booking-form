import LocationPillToggle from "./LocationPillToggle";
import LocationSelect from "./LocationSelect";

interface DropoffSectionProps {
  dropType: string;
  dropLocation: string;
  pickupLocation: string;
  stops: string[];
  dropLocationError?: boolean;
  dropLocationErrorText?: string;
  onDropTypeChange: (e: React.MouseEvent<HTMLElement>, val: string | null) => void;
  onDropLocationChange: (val: string) => void;
}

export default function DropoffSection({
  dropType,
  dropLocation,
  pickupLocation,
  stops,
  dropLocationError,
  dropLocationErrorText,
  onDropTypeChange,
  onDropLocationChange,
}: DropoffSectionProps) {
  const exclude = [pickupLocation, ...stops].filter(Boolean);

  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold mb-3 text-gray-900">Drop off</h3>

      <LocationPillToggle
        value={dropType}
        onChange={onDropTypeChange}
        ariaLabel="Drop-off location type"
      />

      <LocationSelect
        value={dropLocation}
        onChange={onDropLocationChange}
        excludeValues={exclude}
        error={dropLocationError}
        errorText={dropLocationErrorText}
        testId="drop-location"
      />
    </div>
  );
}
