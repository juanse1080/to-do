import { Alert, AlertProps } from "@mui/material";

export type WithoutDataProps = {
  message?: string;
} & AlertProps;

const WithoutData = ({
  message = "No records were found",
  ...props
}: Readonly<WithoutDataProps>) => {
  return (
    <Alert severity="info" {...props}>
      {message}
    </Alert>
  );
};

export default WithoutData;
