import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        background-color: var(--bg1);
    }
`;

export const RegisterContainer = styled.div`
    background-color: var(--bg);
    width: 20%;
    height: 100vh;

    & > form {
        width: 100%;
        height: 30%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 1.5em;
        justify-items: center;
        text-align: center;
        padding-top: 60%;
        padding-bottom: 25%;
        color: hsl(174, 38%, 66%);

        & > h3 {
            margin: 0;
        }

        & > h2 {
            margin: 0;
        }

        & > input {
            margin: auto;
            width: 65%;
            padding: 10px;
            background-color: var(--turquoise-black);
            border: 1px solid var(--turquoise-black);
            border-radius: 5px;
            font-family: 'Poppins', sans-serif;
            color: hsl(174, 38%, 66%);
        }

        & > input::placeholder {
            color: var(--turquoise);
        }

        & > input:focus {
            outline-color: var(--turquoise);
        }

        & > button {
            width: 65%;
            padding: 10px;
            background-color: var(--turquoise);
            border: 1px solid var(--turquoise);
            color: var(--turquoise-black);
            border-radius: 5px;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
            cursor: pointer;
        }

        & > a {
            text-decoration: none;
            color: hsl(174, 38%, 66%);
        }
    }
`;


