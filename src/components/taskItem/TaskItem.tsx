import { Priority, TaskType } from "@/types";
import { useRef, useState } from "react";
import {
  Checkbox,
  Container,
  IconsWrapper,
  IconWrapper,
  TaskName,
} from "./styles";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import { taskSchema } from "@/schemas/ValidationSchemas";
import {
  ButtonsWrapper,
  ErrorMessage,
  Heading,
  Input,
  Label,
  Select,
  TextArea,
} from "../form/styles";
import { formattedDate, getPriorityIcon } from "@/utils/helpers";

interface Props {
  task: TaskType;
  onDelete: (id: number) => void;
  onUpdate: (newTask: TaskType) => void;
  isCheckbox?: boolean;
  isTrash?: boolean;
}

const TaskItem: React.FC<Props> = ({
  task,
  onDelete,
  onUpdate,
  isCheckbox = false,
  isTrash = true,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      console.log("Checkbox is checked.");
    }

    setIsChecked(event.target.checked);
  };

  return (
    <Container key={task.id} isCheckbox={isCheckbox}>
      {isModal ? (
        <TaskModal
          onClose={() => setIsModal(false)}
          task={task}
          onUpdate={onUpdate}
        />
      ) : null}
      {isCheckbox ? (
        <Checkbox type="checkbox" onChange={handleCheckboxChange} />
      ) : null}
      <TaskName isChecked={isChecked}>{task.name}</TaskName>
      {task.deadline ? <p>{formattedDate(task.deadline)}</p> : null}
      <div>{getPriorityIcon(task.priority)}</div>
      <IconsWrapper>
        <IconWrapper>
          <PencilIcon onClick={() => setIsModal(true)} />
        </IconWrapper>
        {isTrash ? (
          <IconWrapper onClick={() => onDelete(task.id)}>
            <TrashIcon color="red" />
          </IconWrapper>
        ) : null}
      </IconsWrapper>
    </Container>
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
      completed: task.completed,
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

export default TaskItem;
