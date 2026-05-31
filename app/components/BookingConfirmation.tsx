import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RouteIcon from "@mui/icons-material/Route";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { GOLD, PURPLE } from "@/app/constants/theme";
import { BookingResponse } from "@/app/types/booking";
import { locations } from "@/app/utils/locations";
import Logo from "./Logo";

interface BookingConfirmationProps {
  result: BookingResponse;
  onReset: () => void;
}

function getLabel(code: string): string {
  return locations.find((l) => l.value === code)?.label ?? code;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export default function BookingConfirmation({ result, onReset }: BookingConfirmationProps) {
  const { bookingId, estimatedFare, data } = result;
  const distanceKm = data.distanceKm ?? 0;
  const durationMinutes = data.durationMinutes ?? 0;

  const routeStops = [
    data.pickupLocation,
    ...(data.stops ?? []),
    data.dropLocation,
  ];

  return (
    <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-xl shadow-lg h-fit">
      <Logo />

      <div className="flex flex-col items-center text-center mb-8">
        <CheckCircleIcon sx={{ fontSize: 56, color: "#22c55e", mb: 1.5 }} />
        <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: PURPLE }}>
          Booking Confirmed!
        </h1>
        <p className="text-sm text-gray-500">
          Booking ID:{" "}
          <span className="font-semibold tracking-wide" style={{ color: PURPLE }}>
            {bookingId}
          </span>
        </p>
      </div>

      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#fdf8ee", border: `1px solid ${GOLD}33` }}
      >
        <div className="flex items-center gap-2 mb-3">
          <RouteIcon fontSize="small" sx={{ color: GOLD }} />
          <span className="text-sm font-semibold text-gray-700">Route</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {routeStops.map((code, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="text-sm font-medium px-3 py-1 rounded-full"
                style={{ backgroundColor: GOLD, color: "#fff" }}
              >
                {getLabel(code)}
              </span>
              {i < routeStops.length - 1 && (
                <ArrowForwardIcon fontSize="small" sx={{ color: "#9ca3af" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
          <DirectionsCarIcon sx={{ color: GOLD, mb: 0.5 }} />
          <span className="text-xs text-gray-500 mb-1">Distance</span>
          <span className="text-base font-bold text-gray-800">
            {distanceKm.toLocaleString()} km
          </span>
        </div>

        <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
          <AccessTimeIcon sx={{ color: GOLD, mb: 0.5 }} />
          <span className="text-xs text-gray-500 mb-1">Travel Time</span>
          <span className="text-base font-bold text-gray-800">
            {formatDuration(durationMinutes)}
          </span>
        </div>

        <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50 border border-gray-100">
          <AttachMoneyIcon sx={{ color: GOLD, mb: 0.5 }} />
          <span className="text-xs text-gray-500 mb-1">Est. Fare</span>
          <span className="text-base font-bold text-gray-800">
            ${estimatedFare.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100 mb-8 text-sm text-gray-600">
        <div>
          <span className="font-medium">{data.firstName} {data.lastName}</span>
          <span className="mx-2 text-gray-300">·</span>
          <span>{data.passengers} passenger{parseInt(data.passengers) !== 1 ? "s" : ""}</span>
        </div>
        <div className="text-gray-400">
          {data.pickupDate} · {data.pickupTime}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-3 text-white rounded-lg font-semibold text-base transition-all duration-300"
        style={{ backgroundColor: GOLD }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b8922e")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = GOLD)}
      >
        Make Another Booking
      </button>
    </div>
  );
}
