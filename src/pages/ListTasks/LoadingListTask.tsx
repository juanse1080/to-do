import { Grid2 as Grid, Skeleton } from "@mui/material";
import { defaultPagination } from "../../hooks";

const LoadingListTasks = () => {
  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {Array.from({ length: defaultPagination.limit })
        .fill("")
        .map((_item, idx) => (
          <Grid
            key={`list-task-${idx}`}
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          >
            <Skeleton variant="rounded" height={86} />
          </Grid>
        ))}
    </Grid>
  );
};

export default LoadingListTasks;
