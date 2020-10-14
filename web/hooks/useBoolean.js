import { useState } from 'react';

export function useBoolean(defaultValue = false) {
  const [bool, setBool] = useState(defaultValue);

  function toggleOn() {
    setBool(true);
  }

  function toggleOff() {
    setBool(false);
  }

  // function toggle() {
  //   setBool(!bool)
  // }

  return [bool, toggleOn, toggleOff];
}
