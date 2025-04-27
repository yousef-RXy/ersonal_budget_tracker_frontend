import React from 'react';

function Card({ children, title }) {
  return (
    <div className="bg-[#1b2055] p-10 rounded-4xl h-fit w-full flex ">
      <div className="flex flex-col items-start gap-6 w-full">
        <div>
          <p className="text-3xl">{title}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Card;
