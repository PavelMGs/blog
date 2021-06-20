import React from 'react'
import styled from 'styled-components'
import Link from 'next/link';
import { IPost } from '../../interfaces';

const Wrapper = styled.section`
    width: 65%;
    border: 1px solid black;
    border-radius: 8px;
    margin-bottom: 20px;

    &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);;
        border-color: white;
    }
`;

const StyledH2 = styled.h2`

`;

const Post: React.FC<IPost> = (props: IPost) => {
    return (
        <Link href={`posts/${props.id}`}>
            <Wrapper>
                <a><StyledH2>
                    {props.title}
                </StyledH2></a>
            </Wrapper>
        </Link>
    )
}

export default Post
