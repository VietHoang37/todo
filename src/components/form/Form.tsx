import React, { useRef, useState } from "react";
import Button from "../button/Button";
import {
  ButtonsWrapper,
  Container,
  ErrorMessage,
  Heading,
  Input,
  Label,
  TasksWrapper,
} from "./styles";
import { ListType, TaskType } from "@/types";
import { createList, updateList } from "@/api/lists";
import { listSchema, taskSchema } from "@/schemas/ValidationSchemas";
import TaskItem from "../taskItem/TaskItem";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { createTasks, deleteTask, updateTask } from "@/api/tasks";
import { v4 as uuidv4 } from "uuid";

interface Props {
  uid: string;
  onClose: () => void;
  isBack?: boolean;
  list?: ListType;
}

const Form: React.FC<Props> = ({ uid, onClose, isBack = false, list }) => {
  const [tasks, setTasks] = useState<TaskType[]>(list?.tasks || []);
  const [tasksToDelete, setTasksToDelete] = useState<TaskType[]>([]);
  const [validationError, setValidationError] = useState<string>("");

  const listNameRef = useRef<HTMLInputElement>(null);
  const taskNameRef = useRef<HTMLInputElement>(null);

  const updateLocalTask = (newTask: TaskType): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.tempKey === newTask.tempKey ? newTask : task
      );
      return updatedTasks;
    });
  };

  const addTask = (): void => {
    const taskName = taskNameRef.current?.value.trim();

    if (taskName) {
      const newTask: TaskType = {
        tempKey: uuidv4(),
        name: taskName,
        priority: "low",
        completed: false,
      };

      const { error } = taskSchema.validate(newTask);

      if (error) {
        setValidationError(error.message);
        return;
      }

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setValidationError("");

      if (taskNameRef.current) {
        taskNameRef.current.value = "";
      }
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const listName = listNameRef.current?.value;

    if (!listName) {
      setValidationError("List name cannot be empty");
      return;
    }

    const newList = {
      name: listName,
      uid: uid,
    };

    const { error } = listSchema.validate(newList);

    if (error) {
      setValidationError(error.message);
      return;
    }

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

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  };

  const goBack = () => {
    onClose();
  };

  return (
    <Container onSubmit={handleFormSubmit}>
      {isBack ? (
        <Button type="button" onClick={goBack}>
          <ChevronLeftIcon height={20} width={20} />
          Back
        </Button>
      ) : null}
      {list ? <Heading>Edit a list</Heading> : <Heading>Create a list</Heading>}
      <Label>Name</Label>
      <Input type="text" ref={listNameRef} defaultValue={list?.name} />
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
        ref={taskNameRef}
        onKeyDown={handleKeyDown}
      />
      {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
      <ButtonsWrapper>
        <Button type="button" onClick={addTask}>
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
