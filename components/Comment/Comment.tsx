import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 2em;
    width: 100%;
    box-shadow: 0 0 15px black;
    margin: 10px auto;
    padding: 10px;
`;

interface IComment {
    body: string
    id: number
}

const Comment = ({ body }: IComment) => {
    return (
        <Wrapper>
            {body}
        </Wrapper>
    )
}

export default Comment;
