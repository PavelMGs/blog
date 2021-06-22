import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from '../../components/Comment/Comment';
import NewCommentForm from '../../components/Form/NewCommentForm';
import Header from '../../components/Header/Header';
import { ICommentRes, IPost } from '../../interfaces';
import { RootState } from '../../redux';
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
    // const { query } = useRouter();
    // const [currentPost, setCurrentPost] = useState<IPost | undefined>();
    // const posts = useSelector((state: RootState) => state.posts);
    // const [comments, setComments] = useState<ICommentRes[]>([]);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!posts.length) {
    //         dispatch(postsAction(data));
    //     }
    // }, [])

    // useEffect(() => {
    //     if (query.id) {
    //         const post = data.find((item: IPost) => item.id === +query.id!);
    //         // setCurrentPost(post);
    //         getData(`https://simple-blog-api.crew.red/posts/${query.id}?_embed=comments`)
    //             .then(data => setComments(data.comments))
    //     }
    // }, [query.id, data])

    const handleAddComment = (newComment: ICommentRes) => {
        const newCommentsArr = [...comments, newComment];
        setComments(newCommentsArr);
    }

    if (!post) {
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
                {post.title}
            </StyledH1>
            <StyledArticle>
                {post.body}
            </StyledArticle>
            <CommentsBlock>
                <StyledCommentsHeader>
                    Comments
                </StyledCommentsHeader>
                <NewCommentForm handleAddComment={handleAddComment} />
                {
                    post.comments.length
                        ? post.comments.map(({ body, id }: ICommentRes) => body.length ? <Comment body={body} key={id} /> : null)
                        : 'No comments here'
                }
            </CommentsBlock>
        </Wrapper >
    )
}


export async function getStaticPaths() {
    const res = await fetch('https://simple-blog-api.crew.red/posts')
    const posts = await res.json()

    const paths = posts.map((post: IPost) => ({
        params: { id: `${post.id}` },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
    const post = await getData(`https://simple-blog-api.crew.red/posts/${params.id}?_embed=comments`)
    return {
        props: { post: post }
    };
}

export default post;