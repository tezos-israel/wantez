import { useState } from 'react';

export default function useBoolean(defaultValue = false) {
  const [bool, setBool] = useState(defaultValue);

  function toggleOn() {
    setBool(true);
  }

  function toggleOff() {
    setBool(false);
  }

  return [bool, toggleOn, toggleOff];
}
