import { GOLD, PURPLE } from "@/app/constants/theme";

export default function Logo() {
  return (
    <div className="flex justify-center mb-5">
      <div className="flex items-center gap-2">
        <svg
          width="36"
          height="28"
          viewBox="0 0 44 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <ellipse cx="22" cy="16" rx="20" ry="12" stroke={PURPLE} strokeWidth="2.5" />
          <ellipse cx="22" cy="16" rx="11" ry="6" stroke={GOLD} strokeWidth="2" />
          <line
            x1="2"
            y1="16"
            x2="42"
            y2="16"
            stroke={PURPLE}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-xl font-bold tracking-wide" style={{ color: PURPLE }}>
          ExampleIQ
        </span>
      </div>
    </div>
  );
}
