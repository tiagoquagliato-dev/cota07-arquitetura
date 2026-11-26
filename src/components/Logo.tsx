interface LogoProps {
  tone?: 'light' | 'dark';
  accentColor?: string;
  className?: string;
}

export function Logo({ tone = 'dark', accentColor = '#6E7458', className = '' }: LogoProps) {
  const strokeColor = tone === 'light' ? '#F2EFE9' : '#191B1A';
  const textColor = tone === 'light' ? '#FFFFFF' : '#191B1A';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="12" cy="12" r="9.5" stroke={strokeColor} strokeWidth="1.25" />
        <path d="M12 2.5V21.5M2.5 12H21.5" stroke={strokeColor} strokeWidth="1" strokeOpacity="0.45" />
        <circle cx="12" cy="12" r="3" fill={accentColor} />
      </svg>
      <span
        className="font-display text-base sm:text-lg font-semibold tracking-[-0.02em] leading-none"
        style={{ color: textColor }}
      >
        COTA<span style={{ color: accentColor }}>.</span>07
      </span>
    </span>
  );
}
