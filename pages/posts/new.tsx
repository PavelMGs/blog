import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import { IPost } from '../../interfaces';
import { postAction } from '../../redux/actions/postActions';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
    background: #ffebee;
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
    padding: 15px;

    height: 55px;

    color: #616161;
    font-size: 20px;
    font-style: italic;

    border-radius: 4px
`

const StyledBody = styled.textarea`
    display: flex;
    flex-direction: row;

    width: 57%;
    margin: 10px auto;

    padding: 15px;

    height: 365px;

    color: #616161;
    font-size: 20px;
    font-style: italic;

    border-radius: 4px
`

const StyledSubmit = styled.input`
    height: 45px;
    width: 125px;
    margin: 10px auto;

    background: #1e88e5;

    font-size: 20px;
    color: white;

    border-radius: 4px;
`;

const NewPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (body.length <= 0) {
            alert('You did not write a post')
        } else if (title.length <= 0) {
            alert('Choose a title')
        } else {
            const data = {
                "title": title,
                "body": body,
            };

            axios({
                method: 'post',
                url: 'https://mg-blog-api.herokuapp.com/api/blog',
                // url: 'http://localhost:8000/api/blog',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
                .then(res => res.data)
                .then((data: IPost) => dispatch(postAction(data)))
                ;

            alert('Post is successfully created')

            router.push('/');
        }
    }
    return (
        <Wrapper>
            <Header />
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
