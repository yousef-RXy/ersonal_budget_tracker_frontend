import React from 'react';
import MultiColorCircle from './MultiColorCircle';

const CategoryCard = ({
  icon,
  title,
  desc,
  amount,
  totalAmount,
  color = 'white',
  titleColor = 'white',
}) => {
  const sections = [{ color, percent: 100 }];

  return (
    <div className="flex items-center justify-between w-full bg-transparent px-2 py-1 rounded-lg">
      <div className="flex items-center gap-4">
        <MultiColorCircle
          sections={sections}
          circleRadius={28}
          width={60}
          height={60}
          strokeWidth={2}
        >
          <div className="text-xl" style={{ color }}>
            {icon}
          </div>
        </MultiColorCircle>

        <div className="flex flex-col">
          <span className="text-xl" style={{ color: titleColor }}>
            {title}
          </span>
          <span className="text-gray-400 text-l">{desc}</span>
        </div>
      </div>

      {/* Right Side: Amounts */}
      <div className="flex flex-col items-end">
        <span className="text-white text-xl">{amount}</span>
        <span className="text-gray-400 text-l">{totalAmount}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
