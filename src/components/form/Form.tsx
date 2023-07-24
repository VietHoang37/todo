import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Button from "../button/Button";
import {
  ButtonsWrapper,
  Container,
  Heading,
  Input,
  Label,
  TasksWrapper,
} from "./styles";
import { ListType, TaskType } from "@/types";
import { createList, updateList } from "@/api/lists";
import TaskItem from "../taskItem/TaskItem";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { createTasks, deleteTask, updateTask } from "@/api/tasks";
import { v4 as uuidv4 } from "uuid";
import { listSchema, taskSchema } from "@/schemas/ValidationSchemas";

interface Props {
  uid: string;
  onClose: () => void;
  isBack?: boolean;
  list?: ListType;
}

const Form: React.FC<Props> = ({ uid, onClose, isBack = false, list }) => {
  const [tasks, setTasks] = useState<TaskType[]>(list?.tasks || []);
  const [tasksToDelete, setTasksToDelete] = useState<TaskType[]>([]);
  const [taskName, setTaskName] = useState("");
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(listSchema),
    defaultValues: { name: list?.name || "", uid },
  });

  const updateLocalTask = (newTask: TaskType): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.tempKey === newTask.tempKey ? newTask : task
      );
      return updatedTasks;
    });
  };

  const handleAddTask = (): void => {
    if (taskName) {
      const newTask: TaskType = {
        tempKey: uuidv4(),
        name: taskName,
        priority: "low",
        completed: false,
      };

      const { error } = taskSchema.validate(newTask);

      if (error) {
        console.error(error.message);
        return;
      }

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskName("");
    }
  };

  const deleteLocalTask = (deletedTask: TaskType): void => {
    setTasks((prevTasks) => {
      const filteredTasks = prevTasks.filter((task) => {
        if (list) {
          return task.id !== deletedTask.id;
        } else {
          return task.tempKey !== deletedTask.tempKey;
        }
      });

      if (list) {
        setTasksToDelete((prevTasksToDelete) => [
          ...prevTasksToDelete,
          deletedTask,
        ]);
      }

      return filteredTasks;
    });
  };

  const onSubmit = async (data: any) => {
    const newList = {
      name: data.name,
      uid: uid,
    };

    if (!list) {
      const createdList = await createList(newList);

      if (createdList && createdList.id) {
        await createTasks(createdList.id, tasks);
      } else {
        console.error("Failed to create list or list ID is undefined");
      }
    } else if (list.id) {
      const updatedList = await updateList(list.id, newList.name);

      if (updatedList && updatedList.id) {
        for (const task of tasksToDelete) {
          if (task.id) {
            await deleteTask(updatedList.id, task.id);
          }
        }

        for (const task of tasks) {
          console.log(tasks);
          if (task.id) {
            await updateTask(updatedList.id, task.id, task);
          } else {
            await createTasks(updatedList.id, [task]);
          }
        }
      }
    }

    onClose();
  };

  const goBack = () => {
    onClose();
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      {isBack ? (
        <Button type="button" onClick={goBack}>
          <ChevronLeftIcon height={20} width={20} />
          Back
        </Button>
      ) : null}
      {list ? <Heading>Edit a list</Heading> : <Heading>Create a list</Heading>}
      <Label>Name</Label>
      <Controller
        name="name"
        control={control}
        render={({ field }) => <Input type="text" {...field} />}
      />
      {errors.name && <p>{errors.name.message}</p>}
      <Label>Tasks</Label>
      <TasksWrapper>
        {tasks.map((task) => (
          <TaskItem
            key={task.tempKey}
            task={task}
            onDelete={deleteLocalTask}
            onUpdate={updateLocalTask}
          />
        ))}
      </TasksWrapper>
      <Input
        type="text"
        placeholder="Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddTask();
          }
        }}
      />
      <ButtonsWrapper>
        <Button type="button" onClick={handleAddTask}>
          Add
        </Button>
      </ButtonsWrapper>
      {list ? (
        <Button type="submit" style={{ width: "100%" }}>
          Edit
        </Button>
      ) : (
        <Button type="submit" style={{ width: "100%" }}>
          Create
        </Button>
      )}
    </Container>
  );
};

export default Form;
