import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getList } from "../../api/lists";
import { ListType } from "@/types";
import { Container, LoadingWrapper } from "../styles";
import {
  Checkbox,
  Header,
  Heading,
  IconWrapper,
  Input,
  InputWrapper,
  InputsWrapper,
  Select,
  Task,
  Tasks,
} from "./styles";
import { formattedDate, getPriorityIcon } from "@/utils/helpers";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const List = () => {
  const [list, setList] = useState<ListType | undefined>();

  const router = useRouter();
  const { id } = router.query;

  const fetchList = async () => {
    if (id) {
      const fetchedList = await getList(Number(id));
      setList(fetchedList);
    }
  };

  useEffect(() => {
    fetchList();
  }, [id]);

  if (!list) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  return (
    <Container>
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
          <Task key={task.id}>
            <Checkbox type="checkbox" />
            <p>{task.name}</p>
            <p>{task.deadline ? formattedDate(task.deadline) : ""}</p>
            <div>{getPriorityIcon(task.priority)}</div>
          </Task>
        ))}
      </Tasks>
    </Container>
  );
};

export default List;
