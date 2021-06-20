import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from '../../components/Comment/Comment';
import { ICommentRes, IPost } from '../../interfaces';
import { RootState } from '../../redux';
import { postsAction } from '../../redux/actions/postActions';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    min-height: 100vh;
`
const StyledH1 = styled.h1`
    font-size: 6em;
`
const StyledArticle = styled.article`
    font-size: 2em;
`;

const LinkWrapper = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`

const StyledA = styled.a`
    font-size: 2em;
`;

const CommentsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;

    margin-bottom: 10px;
    margin-top: auto;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;

`;

const StyledInput = styled.input`
    width: 85%;
    margin: 10px auto;

    height: 3em;

    border-radius: 4px
`

const StyledSubmit = styled.input`
    height: 3em;
    width: 15%;
    margin: 10px auto;

    border-radius: 4px;
`;

const StyledCommentsHeader = styled.h3`
    color: #313131;
    font-size: 3em;
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
            axios.get('https://simple-blog-api.crew.red/posts')
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
        setCommentValue('');
    }

    if (!currentPost) {
        return (
            <Wrapper>
                <LinkWrapper>
                    <Link href={'/'}>
                        <StyledA>Home</StyledA>
                    </Link>
                </LinkWrapper>
                <StyledH1>
                    Post isn`t available
                </StyledH1>
            </Wrapper>
        )
    }

    return (
        <Wrapper>
            <LinkWrapper>
                <Link href={'/'}>
                    <StyledA>Home</StyledA>
                </Link></LinkWrapper>
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
                        placeholder='type your comment'
                        value={commentValue}
                        onChange={(e) => setCommentValue(e.target.value)}
                    />
                    <StyledSubmit type='submit' value="Submit" />
                </StyledForm>
                {
                    comments.length
                        ? comments.map((item: ICommentRes, index) => <Comment body={item.body} id={item.id} key={`${index}_comment_${query.id}`} />)
                        : 'No comments here'
                }
            </CommentsBlock>
        </Wrapper >
    )
}

export default post;
