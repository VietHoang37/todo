import { createGlobalStyle } from "styled-components";
import { MediaQuery } from "../hooks/useDeviceType";
import { BLACK, LIGHT_GRAY, PRIMARY_FONT, WHITE } from "../utils/variables";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

 html {
    font-size: 62.5%;
   

    @media ${MediaQuery.isTablet} {
      font-size: 56.5%;
    }

    @media ${MediaQuery.isMobile} {
        font-size: 50.5%;
    } 
  }

  body {
    background: linear-gradient(to bottom, transparent, ${WHITE.hex()});
    background-color: ${LIGHT_GRAY.hex()};
    color: ${BLACK.hex()};
    background-attachment: fixed;
    font-family: ${PRIMARY_FONT};
    font-size: 1.6rem;

    h1 {
      font-weight: 600;
    }

    h2 {
      font-weight: 400;
    }
  }
`;
