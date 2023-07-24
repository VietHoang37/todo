import { WHITE } from "@/utils/variables";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

export const Content = styled.section`
  padding: 2rem;
  border-radius: 1rem;
  background-color: ${WHITE.hex()};
  max-width: 50rem;
  width: 100%;
`;
