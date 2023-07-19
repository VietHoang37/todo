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
import { createList } from "@/pages/api/lists";
import { listSchema, taskSchema } from "@/schemas/ValidationSchemas";
import TaskItem from "../taskItem/TaskItem";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface Props {
  uid: string;
  onClose: () => void;
  isBack?: boolean;
  list?: ListType;
}

const Form: React.FC<Props> = ({ uid, onClose, isBack = false, list }) => {
  const [tasks, setTasks] = useState<TaskType[]>(list?.tasks || []);
  const [count, setCount] = useState<number>(0);
  const [validationError, setValidationError] = useState<string>("");

  const listNameRef = useRef<HTMLInputElement>(null);
  const taskNameRef = useRef<HTMLInputElement>(null);

  const updateTask = (newTask: TaskType): void => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      return updatedTasks;
    });
  };

  const addTask = (): void => {
    const taskName = taskNameRef.current?.value.trim();

    if (taskName) {
      const newTask: TaskType = {
        id: count,
        name: taskName,
        priority: "low",
      };

      const { error } = taskSchema.validate(newTask);

      if (error) {
        setValidationError(error.message);
        return;
      }

      setTasks((prevTasks) => [...prevTasks, newTask]);
      setCount((prevCount) => prevCount + 1);
      setValidationError("");

      if (taskNameRef.current) {
        taskNameRef.current.value = "";
      }
    }
  };

  const deleteTask = (id: number): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const listName = listNameRef.current?.value;

      if (!listName) {
        setValidationError("List name cannot be empty");
        return;
      }

      const newList = {
        name: listName,
        tasks: tasks,
        uid: uid,
      };

      const { error } = listSchema.validate(newList);

      if (error) {
        setValidationError(error.message);
        return;
      }

      createList(newList);

      onClose();
    } catch (err) {
      console.log(err);
    }
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
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
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
