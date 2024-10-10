import { useCallback, useState } from "react";

const UseBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((before) => !before);
  }, []);

  const handleValue = useCallback((value: boolean) => {
    setValue(value);
  }, []);

  const toTrue = useCallback(() => {
    setValue(true);
  }, []);

  const toFalse = useCallback(() => {
    setValue(false);
  }, []);

  return { value, toggle, handleValue, toTrue, toFalse };
};

export default UseBoolean;
