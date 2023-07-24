import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ListType } from "@/types";
import { getLists } from "../../api/lists";
import Form from "@/components/form/Form";
import {
  Container,
  Header,
  IconWrapper,
  List,
  ListName,
  ListWrapper,
  ListsWrapper,
  LoadingWrapper,
} from "./styles";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "@/components/button/Button";
import Link from "next/link";

const Lists: React.FC = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [lists, setLists] = useState<ListType[]>([]);
  const [isForm, setIsForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFirstForm, setIsFirstForm] = useState<boolean>(true);

  const initializeUser = () => {
    const userID = retrieveOrGenerateUserID();
    setUid(userID);
  };

  const retrieveOrGenerateUserID = (): string => {
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = generateUniqueID();
      localStorage.setItem("userID", userID);
    }
    return userID;
  };

  const generateUniqueID = (): string => {
    return uuidv4();
  };

  const fetchLists = async (uid: string) => {
    const fetchedLists: ListType[] = await getLists(uid);
    setLists(fetchedLists);
    setIsLoading(false);
  };

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (uid) {
      fetchLists(uid);
    }
  }, [uid, isForm, isFirstForm]);

  if (!uid) {
    return null;
  }

  if (isLoading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (isForm || lists.length === 0) {
    return (
      <Form
        uid={uid}
        onClose={() => {
          setIsForm(false);
          setIsFirstForm(false);
        }}
        isBack={lists.length !== 0}
      />
    );
  }

  return (
    <Container>
      <Header>
        <Button type="button" onClick={() => setIsForm(true)}>
          Create a new list
        </Button>
      </Header>
      <ListsWrapper>
        {lists.map((list, i) => (
          <Link key={i} href={`/lists/${list.id}?uid=${uid}`} passHref>
            <ListWrapper>
              <List>
                <IconWrapper>
                  <MagnifyingGlassIcon height={40} width={40} color="white" />
                </IconWrapper>
              </List>
              <ListName>{list.name}</ListName>
            </ListWrapper>
          </Link>
        ))}
      </ListsWrapper>
    </Container>
  );
};

export default Lists;
