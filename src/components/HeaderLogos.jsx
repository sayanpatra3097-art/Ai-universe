export function IEEELogo({ height = 34 }) {
  return (
    <svg
      height={height}
      viewBox="0 0 120 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="partner-logo-svg"
      aria-label="IEEE Logo"
    >
      {/* IEEE Diamond Emblem */}
      <g transform="translate(4, 3)">
        <polygon
          points="16,0 32,16 16,32 0,16"
          fill="#00629b"
        />
        {/* Diamond inner lines / dipole arrows */}
        <path
          d="M16 6 L16 26 M8 16 Q16 10 24 16 M10 18 Q16 24 22 18"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="16" cy="16" r="2.2" fill="#ffffff" />
      </g>
      {/* IEEE Wordmark */}
      <text
        x="44"
        y="25"
        fill="#071b33"
        fontFamily="'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="0.8px"
      >
        IEEE
      </text>
    </svg>
  );
}

export function IEEECSLogo({ height = 34 }) {
  return (
    <svg
      height={height}
      viewBox="0 0 135 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="partner-logo-svg"
      aria-label="IEEE Computer Society"
    >
      <rect x="2" y="5" width="28" height="28" rx="4" fill="#071b33" />
      <path
        d="M9 13 L23 13 M9 19 L19 19 M9 25 L21 25"
        stroke="#38bdf8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="21" cy="19" r="2" fill="#f59e0b" />
      <text
        x="36"
        y="18"
        fill="#071b33"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="12"
        fontWeight="800"
        letterSpacing="0.4px"
      >
        IEEE
      </text>
      <text
        x="36"
        y="30"
        fill="#00629b"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.5px"
      >
        COMPUTER SOCIETY
      </text>
    </svg>
  );
}

export function IEEECISLogo({ height = 34 }) {
  return (
    <svg
      height={height}
      viewBox="0 0 145 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="partner-logo-svg"
      aria-label="IEEE Computational Intelligence Society"
    >
      <rect x="2" y="5" width="28" height="28" rx="4" fill="#00629b" />
      {/* Neural network graph mark */}
      <circle cx="9" cy="12" r="2.2" fill="#ffffff" />
      <circle cx="9" cy="26" r="2.2" fill="#ffffff" />
      <circle cx="16" cy="19" r="2.2" fill="#f59e0b" />
      <circle cx="23" cy="12" r="2.2" fill="#ffffff" />
      <circle cx="23" cy="26" r="2.2" fill="#ffffff" />
      <line x1="9" y1="12" x2="16" y2="19" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
      <line x1="9" y1="26" x2="16" y2="19" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
      <line x1="16" y1="19" x2="23" y2="12" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
      <line x1="16" y1="19" x2="23" y2="26" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
      <text
        x="36"
        y="17"
        fill="#071b33"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="12"
        fontWeight="800"
        letterSpacing="0.4px"
      >
        IEEE
      </text>
      <text
        x="36"
        y="29"
        fill="#00629b"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="0.4px"
      >
        COMPUTATIONAL INTEL.
      </text>
    </svg>
  );
}

export function UEMLogo({ height = 34 }) {
  return (
    <svg
      height={height}
      viewBox="0 0 130 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="partner-logo-svg"
      aria-label="UEM Jaipur"
    >
      <rect x="2" y="5" width="28" height="28" rx="4" fill="#071b33" />
      <polygon points="16,8 24,24 8,24" fill="none" stroke="#d97706" strokeWidth="2" />
      <circle cx="16" cy="18" r="2" fill="#ffffff" />
      <text
        x="36"
        y="18"
        fill="#071b33"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="13"
        fontWeight="800"
        letterSpacing="0.5px"
      >
        UEM JAIPUR
      </text>
      <text
        x="36"
        y="29"
        fill="#64748b"
        fontFamily="'Plus Jakarta Sans', sans-serif"
        fontSize="9"
        fontWeight="700"
        letterSpacing="0.4px"
      >
        DEPT. OF CSE · HOST
      </text>
    </svg>
  );
}
