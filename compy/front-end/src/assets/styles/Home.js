import styled from 'styled-components'

export const HomeContainer = styled.div`
    background-color: var(--bg);
    width: 100%;

    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%; max-width: 1400px;
    margin: 3em auto;
    padding: 0 1em;

    & > form {
        width: 50%;
        height: 80vh;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 0.1fr 0.1fr 1fr;
        grid-gap: 10px;
        margin: 0px 100px;
        border-right: 2px solid var(--bg1);

        & > img {
            width: 10em;
            height: 10em;
            padding: 10px;
            border: 2px solid var(--bg1);
            border-radius: 5px;
        }

        & div {
            display: grid;
            width: 88%;
            height: 3vh;
            grid-template-columns: 1fr 0fr 0.3fr;
            grid-template-rows: 1fr;
            grid-gap: 3px;

            & input[type="file"] {
                height: 0;
                overflow: hidden;
                width: 0;
            }

            & label {
                background: var(--bg1);
                border: 2px solid var(--bg1);
                border-radius: 5px;
                height: 4vh;
                width: 100%;
                padding: 8px 0px;
                text-align: center;
                text-transform: uppercase;
                color: var(--turquoise);
                font-family: 'Poppins', sans-serif;
                font-size: 12px;
                font-weight: 400;
                outline: none;
                cursor: pointer;

                &:hover {
                    border: 2px solid var(--turquoise);
                    transition: 0.2s linear;
                }

                &:not(:hover) {
                    transition: 0.2s linear;
                }
            }

            & button {
                width: 100%;
                height: 4vh;
                background: var(--bg1);
                border: 2px solid var(--bg1);
                border-radius: 5px;
                outline: none;
                color: var(--turquoise);
                cursor: pointer;

                &:hover {
                    border: 2px solid var(--turquoise);
                    transition: 0.2s linear;
                }

                &:not(:hover) {
                    transition: 0.2s linear;
                }
            }   
        }

        & span {
            color: var(--turquoise);
            font-size: 13px;
        }
    }

    & > div {
        height: 100%;
        justify-self: start;
        display: flex;
    }
`;