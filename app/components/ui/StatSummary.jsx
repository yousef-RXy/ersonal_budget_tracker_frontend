import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react'; // lightweight icons

const StatItem = ({ type, amount, label }) => {
  const isPositive = type === 'income';

  return (
    <div className="flex items-center content-around gap-2">
      {isPositive ? (
        <ArrowUp className="w-6 h-6 text-[#2da54f]" />
      ) : (
        <ArrowDown className="w-6 h-6 text-[#861b2e]" />
      )}
      <span
        className={`text-l ${isPositive ? 'text-[#2da54f]' : 'text-[#861b2e]'}`}
      >
        {amount.toLocaleString()} $ {label}
      </span>
    </div>
  );
};

const StatSummary = ({ income, expense }) => {
  return (
    <div className="flex items-center gap-8 w-full">
      <StatItem type="income" amount={income} label="Remaining" />
      <StatItem type="expense" amount={expense} label="Spent" />
    </div>
  );
};

export default StatSummary;
