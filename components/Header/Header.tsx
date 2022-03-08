import React from 'react';
import styled from 'styled-components';

import Link from 'next/link';

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 75px;
    width: 100%;
    background: #3f51b5;

    color: white;

    display: flex;
    flex-direction; row;
    justify-content: flex-end;
    align-items: center;    
`;

const LinkWrapper = styled.div`
    margin-right: 40px;
`

const StyledA = styled.a`
    font-size: 26px;
`;

const Header = () => {
    return (
        <Wrapper>
            <LinkWrapper>
                <Link href='/'>
                    <StyledA>Home</StyledA>
                </Link>
            </LinkWrapper>
            <LinkWrapper>
                <Link href='/posts/new'>
                    <StyledA>New Post</StyledA>
                </Link>
            </LinkWrapper>
        </Wrapper>
    )
}

export default Header;
