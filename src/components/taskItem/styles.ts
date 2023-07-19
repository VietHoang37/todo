import { BLACK, LIGHT_GRAY, WHITE } from "@/utils/variables";
import styled from "styled-components";

export const Container = styled.div<{ isCheckbox?: boolean }>`
  padding: 1rem 2rem;
  background-color: ${LIGHT_GRAY.hex()};
  border-radius: 0.6rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: ${(props) =>
    props.isCheckbox ? "1fr 3fr 1fr 1fr" : "3fr 1fr 1fr"};
  align-items: center;
  width: 100%;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
  cursor: pointer;
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

export const TaskName = styled.p<{ isChecked?: boolean }>`
  text-decoration: ${(props) => (props.isChecked ? "line-through" : "unset")};
`;
