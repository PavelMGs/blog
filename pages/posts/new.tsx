import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
`;

const LinkWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`

const StyledA = styled.a`
    font-size: 2em;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

`;

const StyledTitle = styled.input`
    width: 57%;
    margin: 10px auto;

    height: 3em;

    border-radius: 4px
`

const StyledBody = styled.textarea`
    display: flex;
    flex-direction: row;

    width: 57%;
    margin: 10px auto;

    height: 20em;

    border-radius: 4px
`

const StyledSubmit = styled.input`
    height: 3em;
    width: 15%;
    margin: 10px auto;

    border-radius: 4px;
`;

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const data = {
            "title": title,
            "body": body,
        };

        axios({
            method: 'post',
            url: 'https://simple-blog-api.crew.red/posts',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });

        alert('Post is successfully created')

        router.push('/');
    }
    return (
        <Wrapper>
            <LinkWrapper>
                <Link href={'/'}>
                    <StyledA>Home</StyledA>
                </Link>
            </LinkWrapper>
            <StyledForm
                onSubmit={handleSubmit}
            >
                <StyledTitle
                    placeholder='Set post`s title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <StyledBody
                    placeholder='Set post`s text'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <StyledSubmit
                    value="Submit"
                    type="submit"
                />
            </StyledForm>
        </Wrapper>
    )
}

export default NewPost;
