import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Grid2 as Grid, Pagination, PaginationItem } from "@mui/material";
import { useCallback, useState } from "react";
import { PrivateLayout, RenderIf } from "../../components";
import { defaultPagination, usePaginationFetch } from "../../hooks";
import { Task } from "../../types";
import CreateTask from "./CreateTask";
import DeleteTask from "./DeleteTask";
import LoadingListTasks from "./LoadingListTask";
import TaskItem from "./TaskItem";

const ListTasks = () => {
  const [selected, setSelected] = useState<Task | undefined>();

  const { data, page, count, loading, fetchToPage, pagination, setData } =
    usePaginationFetch<"todos", Task>("https://dummyjson.com/todos", {
      method: "GET",
      initialData: { todos: [], ...defaultPagination },
    });

  const handleDelete = useCallback(
    async (todo: Task) => {
      setSelected(todo);
    },
    [setSelected]
  );

  const handleClose = useCallback(async () => {
    setSelected(undefined);
  }, []);

  const confirmDelete = useCallback(
    (task: Task) => {
      setData((before) => ({
        ...before!,
        todos: before!.todos.filter((todo) => todo.id !== task.id),
      }));

      setSelected(undefined);
    },
    [setData]
  );

  const handleCreate = useCallback(
    (task: Task) => {
      setData((before) => ({
        ...before!,
        todos: [...before!.todos, task],
      }));
    },
    [setData]
  );

  return (
    <PrivateLayout>
      <RenderIf render={pagination.total > 0}>
        <Pagination
          page={page}
          count={count}
          onChange={(_event, value) => fetchToPage(value)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </RenderIf>
      <RenderIf render={loading}>
        <LoadingListTasks />
      </RenderIf>

      <RenderIf render={!loading}>
        <Grid container spacing={1}>
          {data?.todos.map((todo) => (
            <Grid key={todo.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
              <TaskItem onDelete={handleDelete} {...todo} />
            </Grid>
          ))}
        </Grid>
      </RenderIf>

      <CreateTask onConfirm={handleCreate} />

      <DeleteTask
        task={selected}
        handleClose={handleClose}
        onConfirm={confirmDelete}
      />
    </PrivateLayout>
  );
};

export default ListTasks;
