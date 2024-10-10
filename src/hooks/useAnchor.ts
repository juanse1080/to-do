import { useCallback, useState, MouseEvent } from "react";

const useAnchor = <T extends HTMLElement = HTMLElement>() => {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  const handleOpen = useCallback((event: MouseEvent<T>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return { anchorEl, handleOpen, handleClose };
};

export default useAnchor;
