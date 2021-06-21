import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { ICommentRes } from '../../interfaces';

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

interface INewCommentForm {
    handleAddComment: (newComment: ICommentRes) => void
}

const NewCommentForm: React.FC<INewCommentForm> = ({ handleAddComment }) => {
    const { query } = useRouter();
    const [commentValue, setCommentValue] = useState('');

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
            })
                .then(res => res.data)
                .then(data => handleAddComment(data));
        }
        setCommentValue('');
    }
    return (
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
    )
}

export default NewCommentForm;
