// const print = function print

import React from "react";

const MoodCard = () => {
  return (
    <div className="h-fit flex flex-col bg-amber-50 rounded-2xl text-black justify-center items-center lg:col-span-1 md:col-span-2 sm:col-span-4">
      <img src={`/assets/moods/${mood}.png`} alt={mood} width={140} />
      <button
        className="pb-3"
        onClick={() => {
          console.log(mood);
        }}
      >
        {mood}
      </button>
    </div>
  );
};

export default MoodCard;
