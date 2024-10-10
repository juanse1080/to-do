import { Button, ButtonProps, CircularProgress } from "@mui/material";

export type LoadingButtonProps = {
  loading?: boolean;
} & ButtonProps;

const LoadingButton = ({
  children,
  loading,
  disabled,
  ...props
}: Readonly<LoadingButtonProps>) => {
  return (
    <Button {...props} disabled={loading || disabled}>
      {loading && <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />}
      {children}
    </Button>
  );
};

export default LoadingButton;
