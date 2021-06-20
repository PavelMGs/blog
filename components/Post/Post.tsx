import React from 'react'
import styled from 'styled-components'
import Link from 'next/link';
import { IPost } from '../../interfaces';

const Wrapper = styled.section`
    width: 65%;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transition: 0.5s;
    background: white;
    &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);;    }
`;

const StyledH2 = styled.h2`
        color: #212121;
        font-size: 36px;
        font-style: italic;
`;

const StyledArticle = styled.article`
        width: 100%;
        height: 90px;
        border-top: 3px solid gray;
        
        overflow: hidden;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 1.3em;

        color: #616161;
        font-size: 20px;
        font-style: italic;

        background: white;

        padding: 10px 30px;

        text-align: justify;

        display: flex;
        justify-content: center;
`;

const Post: React.FC<IPost> = (props: IPost) => {
    return (
        <Link href={`posts/${props.id}`}>
            <Wrapper>
                <a><StyledH2>
                    {props.title}
                </StyledH2></a>
                <StyledArticle>
                    {
                        props.body.length
                            ? props.body
                            : 'No description...'
                    }
                </StyledArticle>
            </Wrapper>
        </Link>
    )
}

export default Post
