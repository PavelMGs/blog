import React from 'react';
import styled from 'styled-components';

const StyledRoot = styled.div`
    position: absolute;
    top: 35%;
    left: auto;
    right: auto;

    height: 20%;
    min-width: 30%;

    background: rgba(255, 255, 255, 0.5);

    border-radius: 16px;

    overflow: hidden;

    box-shadow: 0px 0px 15px #424242;

    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledText = styled.span`
    position: absolute;
    top: 35%;
    left: auto;
    right: auto;

    font-size: 32px;
    font-style: italic;
    color: #212121;
`

const Button = styled.button`
    position: absolute;
    bottom: 5px;
    height: 20%;
    width: 20%;
    margin: 10px auto;

    background: #1e88e5;

    font-size: 20px;
    color: white;

    border-radius: 4px;

    cursor: pointer;
`;

interface IModal {
    text: string
    close: () => void
}

const Modal = ({ text, close }: IModal) => {
    return (
        <StyledRoot>
            <StyledText>{text}</StyledText>
            <Button onClick={close} >
                Ok
            </Button>
        </StyledRoot>
    )
}

export default Modal;
