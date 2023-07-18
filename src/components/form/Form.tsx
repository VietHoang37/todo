import React, { useRef, useState } from "react";
import Button from "../button/Button";
import {
  ButtonsWrapper,
  Container,
  DetailWrapper,
  Heading,
  IconWrapper,
  IconsWrapper,
  Input,
  Item,
  Label,
  TasksWrapper,
  TextArea,
} from "./styles";
import { ItemType } from "@/types";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Joi from "joi";
import Modal from "../modal/Modal";

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
});

const TaskItem: React.FC<{
  task: ItemType;
  onDelete: (id: number) => void;
}> = ({ task, onDelete }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <Item key={task.id}>
      {isModal ? (
        <TaskModal onClose={() => setIsModal(false)} task={task} />
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

const TaskModal: React.FC<{ onClose: () => void; task: ItemType }> = ({
  onClose,
  task,
}) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <Heading>TASK</Heading>
        <Label>Name</Label>
        <Input type="text" value={task.name} />
        <Label>Description</Label>
        <TextArea rows={10} />
      </Container>
    </Modal>
  );
};

const Form: React.FC = () => {
  const [tasks, setTasks] = useState<ItemType[]>([]);
  const [count, setCount] = useState(0);
  const [validationError, setValidationError] = useState<string>("");

  const taskRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const addTask = (): void => {
    const taskName = taskRef.current?.value.trim();
    const description = descriptionRef.current?.value;

    const { error } = schema.validate({
      name: taskName,
      description: description,
    });

    if (error || !taskName) {
      setValidationError("Task name is required.");
      return;
    }

    const newTask: ItemType = {
      id: count,
      description: description,
      name: taskName,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setCount((prevCount) => prevCount + 1);
    setValidationError("");

    if (taskRef.current) {
      taskRef.current.value = "";
    }
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <Container>
      <Heading>Create a list</Heading>
      <Label>Name</Label>
      <Input type="text" />
      <Label>Tasks</Label>
      <TasksWrapper>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={deleteTask} />
        ))}
      </TasksWrapper>
      <Input
        type="text"
        placeholder="Name"
        ref={taskRef}
        onKeyDown={handleKeyDown}
      />
      {validationError && <p>{validationError}</p>}
      <ButtonsWrapper>
        <DetailWrapper>
          <IconWrapper>
            <EyeIcon />
          </IconWrapper>
          <p>Task details</p>
        </DetailWrapper>
        <Button type="button" onClick={addTask}>
          Add
        </Button>
      </ButtonsWrapper>
    </Container>
  );
};

export default Form;
