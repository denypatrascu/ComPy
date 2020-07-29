import styled, { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
    body {
        margin: 0;
        background-color: var(--bg1);
    }
`;

export const RegisterContainer = styled.div`
    background-color: var(--bg);
    width: 100%;
    max-width: 400px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
    -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
    box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
    margin: 50vh auto 0 auto;
    transform: translate(0, -50%);
    
    & > form {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 1.5em;
        justify-items: center;
        text-align: center;
        padding: 3em 3em 2em 3em;
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
            outline-style: solid;
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
            outline: none;
        }

        & > a {
            text-decoration: none;
            color: hsl(174, 38%, 66%);
        }
    }
`;


