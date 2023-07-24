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
  flex-direction: column;
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
  max-width: 14rem;
  padding: 1rem;
  margin-right: 1rem;
`;

export const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
`;

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
  border: 1px solid ${BLACK.hex()};
  background-color: ${WHITE.hex()};
  cursor: pointer;
  width: 100%;
  margin-right: 1rem;
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

export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  border: 1px solid ${BLACK.hex()};
  background-color: ${BLACK.hex()};
  cursor: pointer;

  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
`;
