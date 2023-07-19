import { BLACK, LIGHT_GRAY, WHITE } from "@/utils/variables";
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
  padding: 2rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid ${BLACK.hex()};
`;

export const Task = styled.div`
  padding: 1rem 2rem;
  background-color: ${LIGHT_GRAY.hex()};
  border-radius: 0.6rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1fr 1fr;
  align-items: center;
  width: 100%;
`;

export const Checkbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  width: 1.6rem;
  height: 1.6rem;
  border: 1px solid ${BLACK.hex()};
  background-color: transparent;
  margin-right: 0.8rem;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: ${WHITE.hex()};
  }

  &:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.2rem;
    height: 1.2rem;
    background-color: ${BLACK.hex()};
  }
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
