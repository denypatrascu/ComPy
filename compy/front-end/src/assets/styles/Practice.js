import styled from 'styled-components';

export const PracticeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    background-color: var(--turquoise-black);
    width: 100%; max-width: 1170px;
    margin: 3em auto;
    padding: 1em;

    & > div:first-child {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 1em;

        & > a { 
            text-decoration: none;
            color: var(--turquoise);
            background-color: var(--bg);
            height: 11vh;
            padding: 1.5em 1em;
            display: grid;
            grid-template-columns: 1fr 0.2fr;
            grid-template-rows: 1fr;

            & > div {
                display: grid;
            }

            & > a {
                text-decoration: none;
                color: var(--turquoise);
                border: 2px solid var(--turquoise);
                margin: 0.5em 0;
                padding: 0.5em;
                text-align: center;
            }
        }
    }
`;