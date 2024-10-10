import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Card,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, PropsWithChildren, useCallback, useState } from "react";
import { useFetch } from "../../hooks";
import { Task } from "../../types";

export type TaskItemProps = {
  id: number;
  todo: string;
  completed?: boolean;
  onDelete: (data: Task) => void;
} & PropsWithChildren;

const TaskItem = ({
  id,
  todo,
  completed,
  onDelete,
}: Readonly<TaskItemProps>) => {
  const [isCompleted, setIsCompleted] = useState(completed ?? false);

  const { data, loading, fetchData } = useFetch<Task>(`todos/${id}`, {
    lazy: true,
    initialData: {
      id,
      todo,
      completed: isCompleted,
    },
  });

  const toggleState = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setIsCompleted(event.target.checked);
      fetchData(`todos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: event.target.checked }),
      });
    },
    [id]
  );

  return (
    <Card
      elevation={0}
      sx={{
        p: 1,
        backgroundColor: "white",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
        },
        "&:hover .MuiTypography-root": {
          whiteSpace: "break-spaces",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <Typography noWrap variant="body2">
          {data?.todo}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        sx={{
          "&:hover": {},
        }}
      >
        {/* <Box sx={{ flexGrow: 1 }}></Box> */}
        <Tooltip title="Cambiar estado">
          <Switch
            size="small"
            disabled={loading}
            onChange={toggleState}
            checked={isCompleted}
          />
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton size="small" onClick={() => onDelete(data!)}>
            <DeleteOutlineIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
};

export default TaskItem;
