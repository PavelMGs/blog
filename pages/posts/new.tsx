import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PostForm from '../../components/Form/PostForm';
import Header from '../../components/Header/Header';
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

    const handleChangeTitle = (value: string) => {
        setTitle(value);
    }

    const handleChangeBody = (value: string) => {
        setBody(value);
    }

    return (
        <Wrapper>
            <Header />
            <PostForm
                handleChangeBody={handleChangeBody}
                handleChangeTitle={handleChangeTitle}
                handleSubmit={handleSubmit}
                handleCloseModal={handleCloseModal}
                showModal={showModal}
                modalText={modalText}
                title={title}
                body={body}
            />
        </Wrapper>
    )
}

export default NewPost;
