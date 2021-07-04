import React, { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Post from '../components/Post/Post';
import { RootState } from '../redux';
import { postsAction } from '../redux/actions/postActions';
import Header from '../components/Header/Header';
import { getData } from '../utils/getData';
import { IPost } from '../interfaces';

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
    width: 100%;
`;

interface IIndex {
    data: IPost[],
}

const index = ({ data }: IIndex) => {
    // eslint-disable-next-line no-unused-vars
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const posts = useSelector((state: RootState) => state.posts)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!posts.length) {
    //         getData('https://mg-blog-api.herokuapp.com/api/blog')
    //             .then(data => dispatch(postsAction(data)))
    //     }

    // }, [])

    useEffect(() => {
        if (!posts.length) {
            // getData('http://localhost:8000/api/blog')
            getData('https://mg-blog-api.herokuapp.com/api/blog')
                .then(data => dispatch(postsAction(data)))
        }

    }, [])

    useEffect(() => {
        forceUpdate()
    }, [posts])


    if (!posts.length) {
        return (
            <Wrapper>
                <Header />
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
                            key={item.id}
                        />)
                        : data.length
                            ? data.map(item => <Post
                                title={item.title}
                                body={item.body}
                                id={item.id}
                                key={item.id}
                            />)
                            : <div>Loading...</div>
                }
            </Posts>
        </Wrapper>
    )
}

export async function getServerSideProps() {
    // const data = await getData('http://localhost:8000/api/blog');
    const data = await getData('https://mg-blog-api.herokuapp.com/api/blog');

    return {
        props: { data: data }
    };
}

export default index;
