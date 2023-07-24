import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getList } from "../../../api/lists";
import { ListType, TaskType } from "@/types";
import { Container, LoadingWrapper } from "../../../styles/Lists.Styled";
import {
  ButtonsWrapper,
  FilterButton,
  Header,
  Heading,
  IconWrapper,
  Input,
  InputWrapper,
  InputsWrapper,
  Select,
  SelectWrapper,
  Tasks,
  Wrapper,
} from "../../../styles/List.Styled";
import {
  AdjustmentsHorizontalIcon,
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Button from "@/components/button/Button";
import TaskItem from "@/components/taskItem/TaskItem";
import { deleteTask, getTasks } from "@/api/tasks";
import Form from "@/components/form/Form";

const priorityMap = {
  high: 3,
  medium: 2,
  low: 1,
};

const List = () => {
  const [list, setList] = useState<ListType | undefined>();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState<string>("default");
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const router = useRouter();
  const { id, uid } = router.query;

  const fetchList = async () => {
    if (id) {
      const fetchedList = await getList(String(id));
      const fetchedTasks = await getTasks(String(id));

      fetchedTasks.forEach((task) => {
        if (task.deadline) {
          task.deadline = new Date(task.deadline);
        }
      });

      setList({ ...fetchedList, tasks: fetchedTasks });
    }
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedWord(event.target.value);
  };

  const goBack = () => {
    router.back();
  };

  const removeTask = (deletedTask: TaskType): void => {
    setList((prevList) => {
      if (!prevList) {
        return prevList;
      }

      const updatedTasks = prevList.tasks.filter(
        (task) => task.id !== String(deletedTask.id)
      );
      return { ...prevList, tasks: updatedTasks };
    });

    deleteTask(id as string, deletedTask.id as string);
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
  }, [id, isEdit]);

  if (!uid || !list) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  let filteredTasks = list?.tasks.filter((task) =>
    task.name.toLowerCase().includes(searchedWord.toLowerCase())
  );
  if (filter === "active") {
    filteredTasks = filteredTasks?.filter((task) => task.completed === false);
  } else if (filter === "completed") {
    filteredTasks = filteredTasks?.filter((task) => task.completed === true);
  }

  if (sort === "low") {
    filteredTasks = filteredTasks?.sort(
      (a, b) => priorityMap[a.priority] - priorityMap[b.priority]
    );
  } else if (sort === "high") {
    filteredTasks = filteredTasks?.sort(
      (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
    );
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
            <Wrapper>
              <Heading>{list.name}</Heading>
              <InputsWrapper>
                <InputWrapper>
                  <Input
                    type="Text"
                    placeholder="Search.."
                    onChange={handleSearchChange}
                  />
                  <IconWrapper>
                    <MagnifyingGlassIcon height={20} width={20} />
                  </IconWrapper>
                </InputWrapper>

                <FilterButton
                  onClick={() => setIsFilter((prevState) => !prevState)}
                >
                  <AdjustmentsHorizontalIcon
                    height={30}
                    width={30}
                    color="white"
                  />
                </FilterButton>
              </InputsWrapper>
            </Wrapper>
            {isFilter ? (
              <SelectWrapper>
                <Select onChange={handleFilterChange}>
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </Select>
                <Select onChange={handleSortChange}>
                  <option value="default">Default</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </Select>
              </SelectWrapper>
            ) : null}
          </Header>

          <Tasks>
            {filteredTasks?.map((task) => (
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
