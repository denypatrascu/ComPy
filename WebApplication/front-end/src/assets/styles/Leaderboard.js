import styled from 'styled-components';

export const LeaderboardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%; max-width: 1200px;
    margin: 1.5em auto 1em auto;
    padding: 1em;

    & > div {
        display: grid;
        height: auto;
        grid-template-columns: 1fr;
        padding: 1em;
        background-color: var(--bg1);
        border-radius: 5px;
        width: 100%;
        -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);

        & > h2 {
            color: var(--turquoise);
            margin-bottom: 1em;
        }

        & > div {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: repeat(2, auto);
            grid-gap: 1em;
            width: 100%;
            border-radius: 5px;

            & > div:first-child {
                display: flex;
                height: auto;
                padding: 1em;
                background-color: var(--bg);
                border-radius: 5px;

                & span {
                    flex: 1;
                    font-size: 18px;
                    font-weight: bold;
                    color: var(--text-white);
                }
            }

            & > div:nth-child(2) {
                display: grid;
                height: auto;
                grid-template-rows: repeat(10, auto);
                grid-template-columns: 1fr;
                background-color: var(--bg);
                border-radius: 5px;

                & > div {
                    display: flex;
                    height: auto;
                    padding: 1em;
                    border-bottom: 0.5px solid var(--turquoise-black);
                    transition: all 300ms ease-in-out;

                    & span {
                        color: var(--turquoise);
                        font-size: 14px;
                        flex: 1;
                    }
                }

                & > div:first-child {
                    border-radius: 5px 5px 0px 0px;
                }

                & > div:last-child {
                    border-radius: 0px 0px 5px 5px;
                }

                & > div:hover {
                    background-color: var(--bg1);
                    -webkit-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
                    -moz-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
                    box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
                }
            }
        }
        
    }
`;