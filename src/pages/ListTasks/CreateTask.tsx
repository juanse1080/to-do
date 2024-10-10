import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fab,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";

import { useCallback } from "react";
import { LoadingButton } from "../../components";
import { useBoolean, useFetch, useForm } from "../../hooks";
import { Task } from "../../types";
import { useUserContext } from "../../context";

export type CreateTaskProps = {
  onConfirm: (task: Task) => void;
};

const CreateTask = ({ onConfirm }: Readonly<CreateTaskProps>) => {
  const { user } = useUserContext();
  const { value, toTrue, toFalse } = useBoolean(false);

  const {
    reset,
    value: task,
    handleChange,
    handleCheckbox,
  } = useForm<Omit<Task, "id">>({
    todo: "",
    completed: false,
  });

  const { fetchData, loading } = useFetch<Task>("todos/add", {
    lazy: true,
    method: "POST",
  });

  const onCreate = useCallback(
    async (task: Omit<Task, "id">) => {
      const result = await fetchData(`todos/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, userId: user!.id }),
      });

      onConfirm(result!);
      toFalse();
      reset();
    },
    [fetchData, onConfirm, user?.id]
  );

  return (
    <>
      <Fab
        size="medium"
        color="primary"
        onClick={toTrue}
        sx={{ position: "absolute", bottom: 24, right: 24 }}
      >
        <AddIcon />
      </Fab>
      <Dialog onClose={toFalse} open={value} fullWidth>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DialogContentText>
            Por favor, agrega un texto descriptivo detallado. Esto será de gran
            utilidad para futuras búsquedas
          </DialogContentText>

          <TextField
            required
            autoFocus
            name="todo"
            size="small"
            label="Nombre de la tarea"
            value={task.todo}
            onChange={handleChange}
          />
          <FormControlLabel
            label="¿La tarea está completa?"
            control={
              <Switch
                name="completed"
                checked={task.completed}
                onChange={handleCheckbox}
              />
            }
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={toFalse}>
            Cancelar
          </Button>

          <LoadingButton
            color="primary"
            variant="contained"
            loading={loading}
            onClick={() => onCreate(task!)}
          >
            Crear
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTask;
