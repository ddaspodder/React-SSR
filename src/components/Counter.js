import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1> Counting: {count}</h1>
      <div>
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          Click
        </button>
      </div>
    </div>
  );
};

export default Counter;
