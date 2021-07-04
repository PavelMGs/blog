import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Comment from '../../components/Comment/Comment';
import NewCommentForm from '../../components/Form/NewCommentForm';
import Header from '../../components/Header/Header';
import { ICommentRes, IPost } from '../../interfaces';
// import { RootState } from '../../redux';
import { postsAction } from '../../redux/actions/postActions';
import { getData } from '../../utils/getData';

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

const StyledCommentsHeader = styled.h3`
    color: #212121;
    font-size: 42px;
    font-style: italic;
`;

interface IPostComponent {
    post: {
        title: string;
        body: string;
        id: number;
        comments: ICommentRes[];
    }
}

const post = ({ post }: IPostComponent) => {
    const { query } = useRouter();
    const [currentPost, setCurrentPost] = useState<IPost | undefined>();
    const [comments, setComments] = useState<ICommentRes[] | []>([])
    // eslint-disable-next-line no-unused-vars   
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0); // ignored На то и ignored, что использовать мы его не будем. В то же время нам нужно деструктуриролвать второй аргумент.
    // const posts = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch();


    useEffect(() => {
        if (query.id) {
            // getData(`http://localhost:8000/api/blog/`)
            getData('https://mg-blog-api.herokuapp.com/api/blog')
                .then(data => {
                    dispatch(postsAction(data))
                    const post = data.find((item: IPost) => item.id === +query.id!);
                    setCurrentPost(post);
                    forceUpdate();
                })
            // getData(`http://localhost:8000/api/comments/${query.id}`)
            getData(`https://mg-blog-api.herokuapp.com/api/comments/${query.id}`)
                .then(data => {
                    setComments(data);
                })
        }
    }, [query.id])

    const handleAddComment = (newComment: ICommentRes) => {
        const newCurrentPost = currentPost;
        newCurrentPost?.comments ? newCurrentPost?.comments.push(newComment) : null;
        setCurrentPost(newCurrentPost);
        forceUpdate();
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
                <NewCommentForm handleAddComment={handleAddComment} />
                {
                    comments.length ? comments.map(({ body, id }: ICommentRes) => body.length ? <Comment body={body} key={id} /> : null)
                        : 'No comments here'
                }
            </CommentsBlock>
        </Wrapper >
    )
}


export async function getStaticPaths() {
    // const res = await fetch('http://localhost:8000/api/blog')
    const res = await fetch('https://mg-blog-api.herokuapp.com/api/blog')
    const posts = await res.json()

    const paths = posts.map((post: IPost) => ({
        params: { id: `${post.id}` },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
    // const posts = await getData(`http://localhost:8000/api/blog`)
    const posts = await getData('https://mg-blog-api.herokuapp.com/api/blog');
    const post = posts.filter((item: IPost) => item.id = params.id)
    return {
        props: { post: post }
    };
}

export default post;