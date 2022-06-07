export const Tick = ({ color = '#304ffe' }) => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="17.5"
        height="17.5"
        rx="4.25"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M6.13544 9.50018L8.37585 11.7406L12.8646 7.25977"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
