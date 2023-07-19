import { BLACK, WHITE } from "@/utils/variables";
import styled from "styled-components";

export const Container = styled.button`
  padding: 1rem 4rem;
  border-radius: 0.4rem;
  border: 1px solid ${BLACK.hex()};
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.98);
  }

  &:hover {
    background-color: ${BLACK.hex()};
    color: ${WHITE.hex()};
  }
`;
