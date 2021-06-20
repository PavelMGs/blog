import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 2em;
    width: 100%;
    box-shadow: 0 0 10px #424242;
    margin: 10px auto;
    padding: 10px;
    border-radius: 7px;
    background: white;
`;

interface IComment {
    body: string
}

const Comment = ({ body }: IComment) => {
    return (
        <Wrapper>
            {body}
        </Wrapper>
    )
}

export default Comment;
