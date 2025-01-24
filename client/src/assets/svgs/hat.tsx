interface HatProps {
  className?: string;
}

export default function Hat({ className }: HatProps) {
  return (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M0 70V60H30V40H40V0H60V10H70V20H90V10H100V0H120V40H130V60H160V70H150V80H10V70H0Z" fill="currentColor" />
    </svg>
  );
}
