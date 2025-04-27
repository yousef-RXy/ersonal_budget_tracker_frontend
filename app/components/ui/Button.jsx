import React from 'react';

export default function Button({
  label,
  onClick,
  variant = 'primary',
  width = 'auto',
  minWidth = '90px',
}) {
  const baseClasses =
    'px-4 py-2 rounded-full font-semibold text-sm focus:outline-none transition-all duration-200';
  const variants = {
    primary: 'bg-[#1B1B40] text-white hover:bg-[#2a2a5a]',
    danger: 'bg-[#8B0000] text-white hover:bg-[#a30000]',
  };

  return (
    <button
      onClick={onClick}
      style={{ width, minWidth }}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}
