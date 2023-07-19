import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getList } from "../../api/lists";
import { ListType, TaskType } from "@/types";
import { Container, LoadingWrapper } from "../styles";
import {
  ButtonsWrapper,
  Header,
  Heading,
  IconWrapper,
  Input,
  InputWrapper,
  InputsWrapper,
  Select,
  Tasks,
} from "./styles";
import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/button/Button";
import TaskItem from "@/components/taskItem/TaskItem";
import { deleteTask } from "@/pages/api/tasks";
import Form from "@/components/form/Form";

const List = () => {
  const [list, setList] = useState<ListType | undefined>();
  const [isEdit, setIsEdit] = useState<boolean>();

  const router = useRouter();
  const { id, uid } = router.query;

  const fetchList = async () => {
    try {
      if (id) {
        const fetchedList = await getList(Number(id));
        setList(fetchedList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goBack = () => {
    router.back();
  };

  const removeTask = (taskId: number): void => {
    setList((prevList) => {
      if (!prevList) {
        return prevList;
      }

      const updatedTasks = prevList.tasks.filter((task) => task.id !== taskId);
      return { ...prevList, tasks: updatedTasks };
    });

    deleteTask(id as string, taskId);
  };

  const updateTask = (newTask: TaskType): void => {
    setList((prevList) => {
      if (!prevList) {
        return prevList;
      }

      const updatedTasks = prevList?.tasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
      return { ...prevList, tasks: updatedTasks };
    });
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  if (!uid || !list) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Container>
      <ButtonsWrapper>
        <Button type="button" onClick={goBack}>
          <ChevronLeftIcon height={20} width={20} />
          Back
        </Button>
        <Button
          type="button"
          onClick={() => setIsEdit((prevState) => !prevState)}
        >
          Edit
        </Button>
      </ButtonsWrapper>
      {!isEdit ? (
        <>
          <Header>
            <Heading>{list.name}</Heading>
            <InputsWrapper>
              <InputWrapper>
                <Input type="Text" placeholder="Search.." />
                <IconWrapper>
                  <MagnifyingGlassIcon height={20} width={20} />
                </IconWrapper>
              </InputWrapper>
              <Select>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </Select>
            </InputsWrapper>
          </Header>
          <Tasks>
            {list.tasks.map((task) => (
              <TaskItem
                key={task.id}
                onDelete={removeTask}
                onUpdate={updateTask}
                task={task}
                isCheckbox
                isTrash={false}
              />
            ))}
          </Tasks>
        </>
      ) : (
        <Form
          onClose={() => setIsEdit(false)}
          uid={uid as string}
          list={list}
        />
      )}
    </Container>
  );
};

export default List;
