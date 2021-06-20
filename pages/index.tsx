import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Post from '../components/Post/Post';
import { RootState } from '../redux';
import { postsAction } from '../redux/actions/postActions';
import Header from '../components/Header/Header';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 100vh;
    padding: 30px 50px;
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
`;

const Posts = styled.div`
    margin-top: 70px;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const index = () => {
    const posts = useSelector((state: RootState) => state.posts)
    const dispatch = useDispatch();

    useEffect(() => {
        // если в сторе ничего не лежит, делаем запрос 
        if (!posts.length) {
            axios.get('https://simple-blog-api.crew.red/posts')
                .then(res => res.data)
                .then(data => dispatch(postsAction(data)))
        }
    }, [])


    if (!posts.length) {
        return (
            <Wrapper>
                Loading...
            </Wrapper>
        )
    }
    return (
        <Wrapper>
            <Header />
            <Posts>
                {
                    posts.length
                        ? posts.map(item => <Post
                            title={item.title}
                            body={item.body}
                            id={item.id}
                            key={`${item.id}_post`}
                        />)
                        : <div>Loading...</div>
                }
            </Posts>
        </Wrapper>
    )
}

export default index;
