import React, { FormEvent, useRef, useState } from "react";
import Button from "../button/Button";
import {
  ButtonsWrapper,
  Container,
  ErrorMessage,
  Heading,
  IconWrapper,
  IconsWrapper,
  Input,
  Item,
  Label,
  Select,
  TasksWrapper,
  TextArea,
} from "./styles";
import { TaskType, Priority } from "@/types";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Joi from "joi";
import Modal from "../modal/Modal";
import { createList } from "@/pages/api/lists";

const taskSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  priority: Joi.string().required(),
  description: Joi.string().optional().allow(""),
  deadline: Joi.date().optional().raw().allow("").allow(null),
  completed: Joi.bool().optional(),
});

const listSchema = Joi.object({
  name: Joi.string().required(),
  tasks: Joi.array().min(1).required(),
  uid: Joi.string().uuid().required(),
});

const TaskItem: React.FC<{
  task: TaskType;
  onDelete: (id: number) => void;
  onUpdate: (newTask: TaskType) => void;
}> = ({ task, onDelete, onUpdate }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <Item key={task.id}>
      {isModal ? (
        <TaskModal
          onClose={() => setIsModal(false)}
          task={task}
          onUpdate={onUpdate}
        />
      ) : null}
      <p>{task.name}</p>
      <IconsWrapper>
        <IconWrapper>
          <PencilIcon onClick={() => setIsModal(true)} />
        </IconWrapper>
        <IconWrapper onClick={() => onDelete(task.id)}>
          <TrashIcon color="red" />
        </IconWrapper>
      </IconsWrapper>
    </Item>
  );
};

const TaskModal: React.FC<{
  onClose: () => void;
  task: TaskType;
  onUpdate: (newTask: TaskType) => void;
}> = ({ onClose, onUpdate, task }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);

  const [validationError, setValidationError] = useState<string>("");

  const saveTask = () => {
    const updatedTask: TaskType = {
      id: task.id,
      priority: (priorityRef.current?.value as Priority) || task.priority,
      name: nameRef.current?.value || task.name,
      description: descriptionRef.current?.value,
      deadline: deadlineRef.current?.value
        ? new Date(deadlineRef.current.value)
        : null,
    };

    const { error } = taskSchema.validate(updatedTask);

    if (error) {
      setValidationError(error.message);
      return;
    }

    onUpdate(updatedTask);
    setValidationError("");
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Heading>TASK</Heading>
      <Label>Name</Label>
      <Input type="text" defaultValue={task.name} ref={nameRef} />
      <Label>Deadline</Label>
      <Input
        type="date"
        defaultValue={task.deadline?.toISOString().slice(0, 10)}
        ref={deadlineRef}
      />
      <Label>Priority</Label>
      <Select defaultValue={task.priority} ref={priorityRef}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Label>Description</Label>
      <TextArea
        rows={10}
        defaultValue={task.description || ""}
        ref={descriptionRef}
      />
      {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
      <ButtonsWrapper>
        <Button type="button" onClick={saveTask}>
          Save
        </Button>
      </ButtonsWrapper>
    </Modal>
  );
};

const Form: React.FC<{ uid: string; onClose: () => void }> = ({
  uid,
  onClose,
}) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
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

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  };

  return (
    <Container onSubmit={handleFormSubmit}>
      <Heading>Create a list</Heading>
      <Label>Name</Label>
      <Input type="text" ref={listNameRef} />
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
      <Button type="submit" style={{ width: "100%" }}>
        Create
      </Button>
    </Container>
  );
};

export default Form;
