import { BLACK, WHITE } from "@/utils/variables";
import styled from "styled-components";

export const Heading = styled.h1``;

export const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  margin-bottom: 3rem;
  border-bottom: 2px solid ${BLACK.hex()};
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export const InputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-items: center;
`;

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid ${BLACK.hex()};
  background-color: ${WHITE.hex()};
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Task = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
