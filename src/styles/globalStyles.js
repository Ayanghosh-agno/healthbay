import { createGlobalStyle } from 'styled-components'
import { device } from './theme'

export const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        // Remove the blue highlight everytime we click on something on mobile
        -webkit-tap-highlight-color: transparent;
    }


    html {
        font-size: 62.5%;
        scroll-behavior: smooth;

        @media ${device.laptop} {
            font-size: 60.5%;
        }

        @media ${device.laptopXS} {
            font-size: 59%;
        }

        @media ${device.tabletXL} {
            font-size: 56%;
        }

        @media ${device.tablet} {
            font-size: 54%;
        }

        @media ${device.tabletXS} {
            font-size: 52%;
        }

        @media ${device.mobileL} {
            font-size: 48%;
        }

        @media ${device.mobile} {
            font-size: 6.5px;
        }

        @media ${device.mobileS} {
            font-size: 6px;
        }
    }

    body {
        font-family: ${({ theme }) => theme.fontFamily};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        background: ${({ theme }) => theme.backgroundBlack};
        color: ${({ theme }) => theme.offWhite};
        overflow-x: hidden;
        scrollbar-color: ${({ theme }) => theme.accent} rgba(0,0,0,0)};
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    main {
        padding: ${({ theme }) => theme.spacingS};
    }

    .accent-color {
        color: ${({ theme }) => theme.accent};
    }
`
