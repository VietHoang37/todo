import { LIGHT_GRAY } from "@/utils/variables";
import styled from "styled-components";

export const Container = styled.form`
  padding: 2rem;
  max-width: 50rem;
  margin: 0 auto;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  margin: 1rem 0;
  font-weight: 500;
`;

export const Item = styled.div`
  padding: 1rem 2rem;
  background-color: ${LIGHT_GRAY.hex()};
  border-radius: 0.6rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Heading = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid black;
`;

export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TasksWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const IconWrapper = styled.div`
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  cursor: pointer;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
`;
