import styled from 'styled-components';

export const PracticeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    width: 100%; max-width: 1200px;
    margin: 1.5em auto 1em auto;
    padding: 1em;

    & > div {
        padding: 1em;
        background-color: var(--bg1);
        border-radius: 5px;
        -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
        box-shadow: 0 0 16px -2px rgba(0, 0, 0, .35);
    }

    & > div > div:first-child {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 1em;
        padding: 0 1me;

        & > a { 
            text-decoration: none;
            color: var(--turquoise);
            background-color: var(--bg);
            height: auto;
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
                    // border-color: var(--text-white);
                    
                    svg {
                        margin-left: .8em;
                    }
                }
            }
        }
    }
`;