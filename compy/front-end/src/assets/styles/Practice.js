import styled from 'styled-components';

export const PracticeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.3fr;
    width: 100%; max-width: 1200px;
    margin: 1.5em auto 1em auto;
    padding: 1em;

    & > div:first-child {
        display: grid;
        height: auto;
        grid-template-columns: 1fr;
        padding: 1em;
        background-color: var(--bg1);
        border-radius: 5px;
        -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);

        h2 { 
            color: var(--text-white);
        }
    }

    & > div > div:first-child {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 1em;

        & > a { 
            text-decoration: none;
            color: var(--turquoise);
            background-color: var(--bg);
            height: 11em;
            display: grid;
            grid-gap: 1em;
            grid-template-columns: 1fr auto;
            grid-template-rows: 1fr;
            align-items: center;
            transition: all 300ms ease-in-out;
            -webkit-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
            -moz-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
            box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
            
            &:hover {
                background-color: var(--bg1);
                
                & > div.content > .categories .chip {
                    background-color: var(--bg);
                }
                
                & > .solve button {
                    color: var(--bg);
                    background-color: var(--turquoise);
                    border-color: transparent;
                    
                }
            }
            
            & > div.content {
                padding: 1em;
            
                h3 {
                    color: var(--text-white);
                }
            
                & > .categories {
                    margin-top: 1em;
                    
                    & .chip {
                        color: var(--turquoise);
                        background-color: var(--bg1);
                        margin-right: 5px;
                    }
                }
                
                & > .difficulty {
                    text-transform: uppercase;
                    font-size: .8em;
                }
            }
            
            & > .solve {
                margin-right: 1em;
                text-decoration: none;
                
                & button {
                    color: var(--turquoise);
                    font-family: 'Poppins', sans-serif;
                    font-size: 14px;
                    // border-color: var(--text-white);
                    
                    svg {
                        margin-left: .8em;
                    }
                }
            }
        }
    }

    & > div:nth-child(2) {
        background-color: var(--bg1);
        -webkit-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
        -moz-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
        box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .35);
        border-radius: 5px;
        margin-left: 1em;
        padding: 1em;
        position: fixed;
        left: 67%;

        & > div {
            display: grid;
            grid-template-columns: 1fr;
            margin-bottom: 1em;
            
            & h3 {
                color: var(--turquoise);
                border-bottom: 0.5px solid var(--turquoise-black);
                margin-bottom: 0.3em;
            }

            & label {
                color: var(--text-white);
            }

        }
    }
`;