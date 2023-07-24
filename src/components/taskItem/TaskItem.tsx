import { Priority, TaskType, TaskType } from "@/types";
import { useRef, useState } from "react";
import {
  Checkbox,
  Container,
  IconsWrapper,
  IconWrapper,
  TaskName,
} from "./styles";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
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
import { getPriorityIcon } from "@/utils/helpers";
import { completeTask } from "@/api/tasks";

interface Props {
  task: TaskType;
  onDelete: (task: TaskType) => void;
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

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCheckedState = event.target.checked;

    if (!task.listId || !task.id) {
      console.error("Task does not have a listId or taskId.");
      return;
    }

    const updatedTask = await completeTask(
      task.listId,
      task.id,
      newCheckedState
    );

    if (updatedTask) {
      onUpdate(updatedTask);
    }
  };

  return (
    <Container key={task.id} isCheckbox={isCheckbox}>
      {isModal ? (
        <TaskModal
          onClose={() => setIsModal(false)}
          task={task}
          onUpdate={onUpdate}
          isEditable={isTrash}
        />
      ) : null}
      {isCheckbox ? (
        <Checkbox
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={task.completed}
        />
      ) : null}
      <TaskName isChecked={task.completed}>{task.name}</TaskName>
      <div>{getPriorityIcon(task.priority)}</div>
      <IconsWrapper>
        <IconWrapper>
          {isTrash ? (
            <PencilIcon onClick={() => setIsModal(true)} />
          ) : (
            <EyeIcon onClick={() => setIsModal(true)} />
          )}
        </IconWrapper>
        {isTrash ? (
          <IconWrapper onClick={() => onDelete(task)}>
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
  isEditable?: boolean;
}> = ({ onClose, onUpdate, task, isEditable = true }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);

  const [validationError, setValidationError] = useState<string>("");

  const saveTask = () => {
    const updatedTask: TaskType = {
      tempKey: task.tempKey,
      priority: (priorityRef.current?.value as Priority) || task.priority,
      name: nameRef.current?.value || task.name,
      completed: task.completed,
      description: descriptionRef.current?.value,
      deadline: deadlineRef.current?.value
        ? new Date(deadlineRef.current.value)
        : undefined,
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
      <Input
        type="text"
        defaultValue={task.name}
        ref={nameRef}
        disabled={!isEditable}
      />
      <Label>Deadline</Label>
      <Input
        type="date"
        defaultValue={task.deadline?.toISOString().slice(0, 10)}
        ref={deadlineRef}
        disabled={!isEditable}
      />
      <Label>Priority</Label>
      <Select
        defaultValue={task.priority}
        ref={priorityRef}
        disabled={!isEditable}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Label>Description</Label>
      <TextArea
        rows={10}
        defaultValue={task.description || ""}
        ref={descriptionRef}
        disabled={!isEditable}
      />
      {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
      {isEditable ? (
        <ButtonsWrapper>
          <Button type="button" onClick={saveTask}>
            Save
          </Button>
        </ButtonsWrapper>
      ) : null}
    </Modal>
  );
};

export default TaskItem;
