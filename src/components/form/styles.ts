import { RED } from "@/utils/variables";
import styled from "styled-components";

export const Container = styled.form`
  max-width: 60rem;
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

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

export const Heading = styled.h1`
  font-size: 2.4rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid black;
  padding-top: 2rem;
`;

export const TasksWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 1rem;
  resize: none;
  padding: 1rem;
  font-family: inherit;
`;

export const ErrorMessage = styled.p`
  color: ${RED.hex()};
`;

export const Select = styled.select`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
`;
