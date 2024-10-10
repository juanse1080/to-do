import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Task } from "../../types";
import { useFetch } from "../../hooks";
import { useCallback } from "react";
import { LoadingButton } from "../../components";

export type DeleteTaskProps = {
  task?: Task;
  handleClose: () => void;
  onConfirm: (task: Task) => void;
};

const DeleteTask = ({
  task,
  onConfirm,
  handleClose,
}: Readonly<DeleteTaskProps>) => {
  const { fetchData, loading } = useFetch<Task>("todos", {
    lazy: true,
    method: "DELETE",
  });

  const onDelete = useCallback(
    async (task: Task) => {
      await fetchData(`todos/${task?.id}`, {
        method: "DELETE",
      });

      onConfirm(task);
    },
    [fetchData, onConfirm]
  );

  return (
    <Dialog onClose={handleClose} open={task !== undefined}>
      <DialogTitle>¿Esta seguro de eliminar la tarea?</DialogTitle>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose}>
          Cancelar
        </Button>

        <LoadingButton
          autoFocus
          color="error"
          loading={loading}
          variant="contained"
          onClick={() => onDelete(task!)}
        >
          Eliminar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTask;
