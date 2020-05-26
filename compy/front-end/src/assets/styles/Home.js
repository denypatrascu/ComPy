import styled from 'styled-components'

export const HomeContainer = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%; max-width: 1200px;
    margin: 2.2em auto;
    background-color: var(--bg);
    width: 100%;
    padding: 0 1em;

    & > form {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto 1fr;
        grid-gap: 1em;
        padding-right: 2em;
        border-right: 5px solid var(--bg1);
        height: calc(80vh);

        & > img {
            width: 220px; height: 220px;
            padding: 10px;
            background-color: var(--bg1);
            border-radius: 4px;
            grid-column-start: 1;
            grid-column-end: 3;
            transition: filter 300ms ease-in-out;

            -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            
            &:hover {
                filter: hue-rotate(65deg);
            }
        }

        & input[type="file"] {
            height: 0;
            overflow: hidden;
            width: 0;
        }

        & > label {
            width: 100%;
            line-height: 35px;
            padding-left: .5em;
            position: relative;

            -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            
            & > svg {
                position: absolute;
                right: 0; top: 30%;
                transform: translate(-50%, 0);
                font-size: .9em;
            }
        }
        
        & > button {
            -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
            box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);

            & > svg {
                font-size: 1.1em;
            }
        }

        & > button, & > label {
            background: var(--bg1);
            border: 2px solid var(--bg1);
            border-radius: 4px;
            outline-color: var(--turquoise);
            color: var(--turquoise);
            cursor: pointer;
            height: 40px;
            
            &:hover {
                border-color: var(--turquoise);
                transition: all 0.2s linear;
            }

            &:not(:hover) {
                transition: all 0.2s linear;
            }
        }

        & span {
            color: var(--turquoise);
            font-size: 13px;
            max-width: 220px;
            overflow-x: auto;
            grid-column-start: 1;
            grid-column-end: 3;
        }
    }

    & > div {
        display: flex;
        height: auto;
        width: 100%;
        justify-self: start;
        margin-left: 2em;

        -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        

        & > div {
            display: grid;
            grid-template-columns: 1fr;
            background-color: var(--bg1);
            border-radius: 5px;
            width: 100%;
            height: auto;
            padding: 1em;

            & > div {

                & > h2 {
                    height: 0.2vh;
                    color: var(--text-white);
                    margin-bottom: 2em;
                }

                > div {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    width: 100%;
                    grid-template-rows: auto;
                    grid-gap: 1em;

                    & > span {
                        color: var(--turquoise);
                        font-size: 18px;
                        grid-column: 1 / 3;
                    }
                    
                    & a {
                        color: var(--turquoise);
                        text-decoration: none;
                        height: 10em;
                        background-color: var(--bg);
                        border-radius: 5px;
                        display: grid;
                        text-align: center;
                        align-items: center;
                        align-content: center;
                        justify-content: center;

                        -webkit-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
                        -moz-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
                        box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
                        transition: all 300ms ease-in-out;
                    }

                    & a:hover {
                        background-color: var(--bg1);
                        color: var(--text-white);
                    }

                }
            }
        }
    }
`;