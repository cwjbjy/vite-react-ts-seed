import { useState, useCallback } from 'react';
import { useBeforeUnload } from 'react-router-dom';

export default function Manage() {
  const [count, setCount] = useState(localStorage.getItem('count') || '0');

  useBeforeUnload(
    useCallback(() => {
      localStorage.setItem('count', count);
    }, [count]),
  );

  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount((prev) => prev + '1');
        }}
      >
        按钮
      </button>
    </div>
  );
}
