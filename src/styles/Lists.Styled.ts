import { MediaQuery } from "@/hooks/useDeviceType";
import { BLACK, LIGHT_GRAY, WHITE } from "@/utils/variables";
import styled from "styled-components";

export const Container = styled.section`
  max-width: 60rem;
  margin: 0 auto;
`;

export const ListsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media ${MediaQuery.isMobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const IconWrapper = styled.div`
  border-radius: 100%;
  padding: 2rem;
  background-color: ${LIGHT_GRAY.hex()};
  display: none;
`;

export const List = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background-color: ${WHITE.hex()};
  min-height: 20rem;
  width: 100%;
  cursor: pointer;
  background-image: url("/images/notes.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  border: 1px solid ${LIGHT_GRAY.hex()};

  &:hover {
    ${IconWrapper} {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ListName = styled.h1`
  font-size: 2rem;
  margin-top: 2rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 2px solid ${BLACK.hex()};
  margin-bottom: 3rem;
  padding-bottom: 2rem;
`;
