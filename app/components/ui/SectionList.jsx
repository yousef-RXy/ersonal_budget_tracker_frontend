import React from 'react';

const SectionList = ({ sections }) => {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2 w-28">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: section.color }}
            ></div>
            <span className="text-white text-xL">{section.name}</span>
          </div>

          <div className="text-white text-xL w-20 pr-2 mr-2 text-right border-r border-[#2f83e4]">
            {section.amount.toLocaleString()} $
          </div>

          <div className="text-gray-400 text-xL">{section.percent}%</div>
        </div>
      ))}
    </div>
  );
};

export default SectionList;
