interface LogoProps {
  tone?: 'light' | 'dark';
  className?: string;
}

export function Logo({ tone = 'dark', className = '' }: LogoProps) {
  const strokeColor = tone === 'light' ? '#EAE8E1' : '#191B1A';
  const textColor = tone === 'light' ? '#FFFFFF' : '#191B1A';
  const accentColor = '#787D60';

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        width="26"
        height="22"
        viewBox="0 0 26 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M1 4V18M25 4V18M1 11H25" stroke={strokeColor} strokeWidth="1.25" />
        <path d="M1 4L4 1M25 4L22 1M1 18L4 21M25 18L22 21" stroke={strokeColor} strokeWidth="1.1" />
        <rect x="9.5" y="7.5" width="7" height="7" stroke={accentColor} strokeWidth="1.5" />
        <circle cx="13" cy="11" r="1.25" fill={strokeColor} />
      </svg>
      <span
        className="font-display text-base sm:text-lg font-semibold tracking-[0.14em] uppercase leading-none"
        style={{ color: textColor }}
      >
        COTA<span style={{ color: accentColor }}>.</span>07
      </span>
    </span>
  );
}
