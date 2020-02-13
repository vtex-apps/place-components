import React from 'react'

export const LocationConceivedIcon: React.FC<{ color?: string }> = ({
  color,
}) => {
  if (!color) color = '#2E2E2E'

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="c-action-primary"
    >
      <g clipPath="url(#clip0)">
        <path
          d="M15.3 4L1.30001 3.72529e-09C0.500006 -0.2 -0.199994 0.5 5.72577e-06 1.3L4.00001 15.3C4.30001 16.2 5.50001 16.3 5.90001 15.4L8.70001 8.8L15.3 6C16.3 5.5 16.2 4.3 15.3 4Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path d="M0 0H16V16H0V0Z" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
