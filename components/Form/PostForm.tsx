import React, { FormEvent } from 'react'
import styled from 'styled-components';
import Modal from '../Modal/Modal';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
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

    cursor: pointer;
`;

interface IPostForm {
    handleSubmit: (e: FormEvent) => void,
    handleChangeTitle: (value: string) => void,
    handleChangeBody: (value: string) => void,
    handleCloseModal: () => void,
    title: string,
    body: string,
    showModal: boolean,
    modalText: string,
}


const PostForm = ({ handleSubmit, handleChangeBody, handleChangeTitle, handleCloseModal, title, body, showModal, modalText }: IPostForm) => {
    return (
        <Wrapper>
            <StyledForm
                onSubmit={handleSubmit}
            >
                <StyledTitle
                    placeholder='Set post`s title'
                    value={title}
                    onChange={(e) => handleChangeTitle(e.target.value)}
                />
                <StyledBody
                    placeholder='Set post`s text'
                    value={body}
                    onChange={(e) => handleChangeBody(e.target.value)}
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

export default PostForm
