import { useState } from 'react';
import { unstable_usePrompt } from 'react-router-dom';

export default function File() {
  const [value, setValue] = useState('');

  unstable_usePrompt({
    message: '确定离开吗',
    when: ({ currentLocation, nextLocation }) => value !== '' && currentLocation.pathname !== nextLocation.pathname,
  });

  return <input onChange={(v) => setValue(v.target.value)} />;
}
