import styled from 'styled-components'

export const SubmitContainer = styled.div`
    display: block;
    width: 100%;
    max-width: 1200px;
    margin: 2em auto;
    
    .submit-container {
        margin: 0 1em;
        
        & > h1 {
            color: var(--text-white);
        }
        
        & > p {
            color: var(--turquoise);
        }
        
        .preview {
            margin: 1em 0;
            background-color: var(--white);
            -webkit-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .75);
            -moz-box-shadow: 0 0 16px -2px rgba(0, 0, 0, .75);
            box-shadow: 0 0 16px -2px rgba(0, 0, 0, .75);
            border-radius: 5px;
            padding: 1em 2em;
        }
        
        .preview div h1 {
            margin-top: .7em;
        }
        
        .preview div p {
            margin-top: .25em;
        }
        
        .textarea-container {
            textarea {
                border-radius: 5px;
                background-color: var(--bg1);
                border-color: transparent;
                width: 100%;
                -webkit-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .75);
                -moz-box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .75);
                box-shadow: inset 0 0 16px -2px rgba(0, 0, 0, .75);
                outline-color: var(--turquoise);
                padding: 1em;
                color: var(--turquoise);
                font-size: 1.1em;
            }
        }
        
        .file-area {
            .submit-area > .container {
                width: 100%;
                margin: 0 auto;
                align-items: center;
                padding-top: 1em;
            }
            
            .submit-area > .container > .input {
                text-align: center;
                padding: 1.5em 1em;
                border: 2px dashed var(--bg);
                background-color: var(--turquoise);
            }
            
            .submit-area > .container > .input button {
                margin-top: 1em;
                color: var(--turquoise);
                background-color: var(--text-white);
                font-weight: 600;
            }
            
            .submit-area > .container > .input button span {
                margin-left: .5em;
            }
            
            .submit-area > .container > .output > * {
                margin-top: 0.5em;
            }
            
            .submit-area > .container > .output h1 {
                margin-top: 1em;
                color: var(--text-white);
            }
            
            .submit-area > .container > .output > .previews {
                padding: 1em 1em .75em 1em;
                background-color: var(--gray);
                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, .35);
                -moz-box-shadow: inset 0 0 5px rgba(0, 0, 0, .35);
                box-shadow: inset 0 0 5px rgba(0, 0, 0, .35);
            }
            
            .submit-area > .container > .output > .previews > .carousel {
                display: flex;
                overflow-y: auto;
            }
            
            .submit-area > .container > .output > .previews > .carousel::-webkit-scrollbar-track {
                background: var(--gray);
            }
            
            .submit-area > .container > .output > .previews > .carousel > .item {
                padding: 1em;
                margin: 0 1em .75em 0;
                background-color: var(--white);
                box-shadow: 0 0 5px rgba(0, 0, 0, .15);
                cursor: pointer;
                border: 5px solid transparent;
                min-width: 150px;
                text-align: center;
            }
            
            .submit-area > .container > .output > .previews > .carousel > .item.active {
                border-color: var(--turquoise);
            }
            
            .submit-area > .container > .output > .previews > .submit {
                display: grid;
                grid-template-columns: auto 1fr;
                align-items: center;
                margin-top: 1em;
            }
            
            .submit-area > .container > .output > .previews > .submit > div {
                text-align: end;
                align-content: center;
            }
        }
        
        .submit-button-container {
            margin: 3em 0 1em 0;
            
            & button {
                width: 100%;
                padding: 1em .25em;
                text-transform: none;
            }
        }
    }
`;