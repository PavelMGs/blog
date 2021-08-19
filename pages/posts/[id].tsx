import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { FormEvent, useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Comment from '../../components/Comment/Comment';
import NewCommentForm from '../../components/Form/NewCommentForm';
import PostForm from '../../components/Form/PostForm';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import { ICommentRes, IPost } from '../../interfaces';
import { RootState } from '../../redux';
import { postsAction } from '../../redux/actions/postActions';
import { getData } from '../../utils/getData';
import { host } from '../../utils/host';

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

    white-space: pre-wrap;
`;

const CommentsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 40vh;

    margin-bottom: 0px;
    margin-top: auto;
`;

const StyledCommentsHeader = styled.h3`
    color: #212121;
    font-size: 42px;
    font-style: italic;
`;

const Comments = styled.div`
    height: 100%;
    width: 100%;

    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    align-items: center;

    &::-webkit-scrollbar {
        display: none;
    }
`

const ButtonsBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    margin: 20px auto 10px;
`

const FuncButton = styled.button`
    height: 45px;
    width: 90%;
    margin-bottom: 10px;

    background: #1e88e5;

    font-size: 20px;
    color: white;

    border-radius: 4px;
    border: none;
    box-shadow: 0 0 5px #424242;

    & :active {
        background: #1565c0;
    }

    cursor: pointer;
`;

const DeletePass = styled.form` 
    position: absolute;
    top: 35%;
    left: auto;
    right: auto;
    height: 55px;
    width: 500px;
    box-shadow: 0px 0px 15px #424242;
    border-radius: 4px;
    overflow: hidden;
`

const DelInput = styled.input`
    height: 100%;
    width: 75%;
    border: none;
    padding: 10px;
`

const Submit = styled.input`
    width: 25%;
    height: 100%;

    background: #1e88e5;

    color: white;
`;

const EditWrapper = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
`

interface IPostComponent {
    ssr_post: {
        title: string;
        body: string;
        id: number;
    }
    ssr_comments: ICommentRes[]
}

const post = ({ ssr_post, ssr_comments }: IPostComponent) => {
    const { query } = useRouter();
    const [currentPost, setCurrentPost] = useState<IPost | undefined>();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [comments, setComments] = useState<ICommentRes[] | []>([])
    const [delPassword, setDelPassword] = useState('');
    const [showDelInput, setShowDelInput] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditiing] = useState(false);
    // eslint-disable-next-line no-unused-vars   
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0); // ignored На то и ignored, что использовать мы его не будем. В то же время нам нужно деструктуриролвать второй аргумент.
    const posts = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch();
    const router = useRouter();


    useEffect(() => {
        if (query.id) {
            if (!posts.length) {
                getData(`${host}/api/blog`)
                    .then(data => {
                        dispatch(postsAction(data))
                        const post = data.find((item: IPost) => item.id === +query.id!);
                        setCurrentPost(post);
                        setTitle(post.title);
                        setBody(post.body);
                        forceUpdate();
                    })
            } else {
                const post = posts.find((item: IPost) => item.id === +query.id!)
                setCurrentPost(post);
            }
            getData(`${host}/api/comments/${query.id}`)
                .then(data => {
                    setComments(data);
                })
        }
    }, [query.id])

    const handleAddComment = (newComment: ICommentRes) => {
        const newComments = [...comments, newComment]
        setComments(newComments)
    }

    const handleDeletePost = () => {
        axios({
            method: 'delete',
            url: `${host}/api/blog/${currentPost!.id}/${delPassword}`,
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.data)
            .then(data => {
                setModalText(data.message);
                setShowModal(true);
                const newPosts = posts.filter(item => item.id !== currentPost!.id);
                dispatch(postsAction(newPosts));
                setIsDeleted(true);
            })
            .catch(err => {
                setModalText(err.response.data.message);
                setShowModal(true);
                setDelPassword('');
            })
    }

    const handleCloseModal = () => {
        if (isDeleted) {
            router.push('/');
        }
        setShowModal(false);
        setModalText('');
    }

    const handleDelInput = () => {
        setShowDelInput(false);
        delPassword.length
            ? handleDeletePost()
            : null;
    };

    if (!currentPost && !ssr_post) {
        return (
            <Wrapper>
                <Header />
                <StyledH1>
                    Post isn`t available
                </StyledH1>
            </Wrapper>
        )
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (title.length <= 0) {
            setModalText('Title can`t be empty');
            setShowModal(true);
        } else if (body.length <= 0) {
            setModalText('Post can`t be empty');
            setShowModal(true);
        } else {
            const data = {
                "title": title,
                "body": body,
            };

            axios({
                method: 'put',
                url: `${host}/api/blog/${query.id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data
            })

            setModalText('Refresh page to view changes');
            setShowModal(true);
            setIsEditiing(false)
        }
    }

    const handleCloseEditModal = () => {
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
            <StyledH1>
                {
                    currentPost ? currentPost.title : ssr_post.title
                }
            </StyledH1>
            <StyledArticle>
                {
                    currentPost ? currentPost.body : ssr_post.body
                }
            </StyledArticle>

            <CommentsBlock>
                <StyledCommentsHeader>
                    Comments
                </StyledCommentsHeader>
                <NewCommentForm handleAddComment={handleAddComment} />
                <Comments>
                    {
                        comments.length
                            ? comments.map(({ body, id }: ICommentRes) => body.length ? <Comment body={body} key={id} /> : null)
                            : ssr_comments.length
                                ? ssr_comments.map(({ body, id }: ICommentRes) => body.length ? <Comment body={body} key={id} /> : null)
                                : 'No comments here'
                    }
                </Comments>
            </CommentsBlock>
            <ButtonsBlock>
                <FuncButton
                    onClick={() => setIsEditiing(true)}
                >
                    Edit post
                </FuncButton>
                <FuncButton
                    onClick={() => setShowDelInput(true)}
                >
                    Delete this post
                </FuncButton>
            </ButtonsBlock>
            {
                showDelInput
                    ? <DeletePass onSubmit={handleDelInput}>
                        <DelInput
                            placeholder='Type password to delete a post'
                            value={delPassword}
                            onChange={(e) => setDelPassword(e.target.value)}
                            type='password'
                        />
                        <Submit
                            type='submit'
                            value='Ok'
                        />
                    </DeletePass>
                    : null
            }
            {
                showModal
                    ? <Modal text={modalText} close={handleCloseModal} />
                    : null
            }

            {
                isEditing
                    ? <EditWrapper>
                        <PostForm
                            handleChangeBody={handleChangeBody}
                            handleChangeTitle={handleChangeTitle}
                            handleSubmit={handleSubmit}
                            handleCloseModal={handleCloseEditModal}
                            showModal={showModal}
                            modalText={modalText}
                            title={title}
                            body={body}
                        />
                    </EditWrapper>
                    : null
            }
        </Wrapper >
    )
}


export async function getServerSidePaths() {
    const res = await fetch(`${host}/api/blog`)
    const posts = await res.json()

    const paths = posts.map((post: IPost) => ({
        params: { id: `${post.id}` },
    }))

    return { paths, fallback: false }
}

export async function getServerSideProps({ params }: any) {
    const posts = await getData(`${host}/api/blog`);
    const post = posts.find((item: IPost) => item.id === +params.id)

    const comments = await getData(`${host}/api/comments/${params.id}`);
    return {
        props: { ssr_post: post ? post : null, ssr_comments: comments }
    };
}

export default post;