import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import { IPost } from '../../interfaces';
import { RootState } from '../../redux';
import { postAction, postsAction } from '../../redux/actions/postActions';
import { getData } from '../../utils/getData';
import { host } from '../../utils/host';

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
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const posts = useSelector((state: RootState) => state.posts)

    useEffect(() => {
        if (!posts.length) {
            getData(`${host}/api/blog`)
                .then(data => dispatch(postsAction(data)))
        }

    }, [])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (body.length <= 0) {
            setModalText('You did not write a post');
            setShowModal(true);
        } else if (title.length <= 0) {
            setModalText('Choose a title');
            setShowModal(true);
        } else {
            const data = {
                "title": title,
                "body": body,
            };

            axios({
                method: 'post',
                url: `${host}/api/blog`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            })
                .then(res => res.data)
                .then((data: { post: IPost }) => dispatch(postAction(data.post)))
                ;

            setModalText('Post is successfully created');
            setShowModal(true);
        }
    }

    const handleCloseModal = () => {
        if (body.length < 1 || title.length < 1) {
            setModalText('');
            setShowModal(false);
        } else {
            router.push('/')
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
            {
                showModal
                    ? <Modal text={modalText} close={handleCloseModal} />
                    : null
            }
        </Wrapper>
    )
}

export default NewPost;
