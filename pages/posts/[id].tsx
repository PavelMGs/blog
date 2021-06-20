import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from '../../components/Comment/Comment';
import Header from '../../components/Header/Header';
import { ICommentRes, IPost } from '../../interfaces';
import { RootState } from '../../redux';
import { postsAction } from '../../redux/actions/postActions';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    min-height: 100vh;
    background: #ffebee;
`
const StyledH1 = styled.h1`
    color: #212121;
    font-size: 42px;
    font-style: italic;

    margin-top: 95px
`
const StyledArticle = styled.article`
    color: #424242;
    font-size: 32px;
    font-style: italic;

    width: 80%;

    text-align: justify;
`;

const CommentsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;

    margin-bottom: 60px;
    margin-top: auto;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

`;

const StyledInput = styled.input`
    padding: 15px;
    margin: 10px auto;

    width: 85%;
    height: 45px;

    border-radius: 4px;
    border: none;
    box-shadow: 0 0 5px #424242;

    color: #424242;
    font-size: 20px;
    font-style: italic;
`

const StyledSubmit = styled.input`
    height: 45px;
    width: 15%;
    margin: 10px auto;

    background: #1e88e5;

    font-size: 20px;
    color: white;

    border-radius: 4px;
    border: none;
    box-shadow: 0 0 5px #424242;
`;

const StyledCommentsHeader = styled.h3`
    color: #212121;
    font-size: 42px;
    font-style: italic;
`;

const post = () => {
    const { query } = useRouter();
    const [currentPost, setCurrentPost] = useState<IPost | undefined>();
    const [commentValue, setCommentValue] = useState('');
    const posts = useSelector((state: RootState) => state.posts);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        // если в сторе ничего не лежит, делаем запрос
        if (!posts.length) {
            axios.get('https://simple-blog-api.crew.red/posts') // тут можно запрашивать и конкретный пост, но...
                .then(res => res.data)
                .then(data => dispatch(postsAction(data)))
        }
    }, [])

    useEffect(() => {
        // дожидаемся, пока подгрузится квери и выбираем нужный пост по параметрам url
        if (query.id) {
            const post = posts.find((item: IPost) => item.id === +query.id!);
            setCurrentPost(post);
            axios.get(`https://simple-blog-api.crew.red/posts/${query.id}?_embed=comments`)
                .then(res => res.data)
                .then(data => setComments(data.comments))
        }
    }, [query.id, posts])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (commentValue.length > 0) {
            const data = {
                "postId": +query.id!,
                "body": commentValue
            };

            axios({
                method: 'post',
                url: 'https://simple-blog-api.crew.red/comments',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            });
        }
        setCommentValue('');
    }

    if (!currentPost) {
        return (
            <Wrapper>
                <Header />
                <StyledH1>
                    Post isn`t available
                </StyledH1>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <Header />
            <StyledH1>
                {currentPost.title}
            </StyledH1>
            <StyledArticle>
                {currentPost.body}
            </StyledArticle>
            <CommentsBlock>
                <StyledCommentsHeader>
                    Comments
                </StyledCommentsHeader>
                <StyledForm
                    onSubmit={handleSubmit}
                >
                    <StyledInput
                        placeholder='Type your comment'
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                    />
                    <StyledSubmit type='submit' value="Submit" />
                </StyledForm>
                {
                    comments.length
                        ? comments.map((item: ICommentRes, index) => item.body.length ? <Comment body={item.body} id={item.id} key={`${index}_comment_${query.id}`} /> : null)
                        : 'No comments here'
                }
            </CommentsBlock>
        </Wrapper >
    )
}

export default post;
