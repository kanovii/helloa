import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GoHomeFill, GoSearch } from 'react-icons/go';
import { useLocation } from 'react-router-dom';

const Links = styled(Link)`
    text-decoration: none;
    display: inline-block;
    margin-right: 10px;
    border-bottom: solid 3px var(--border-outline);
    transition: 0.25s ease-in-out;
`;

const Helloa = styled(Link)`
    display: inline-block;
    font-family: 'Anton', sans-serif;
    font-size: 3rem;
    color: #eee;
`;
const NavContainer = styled.div`
    /* border-bottom: solid 1px var(--border-outline); */
    background: linear-gradient(90deg, rgba(21, 24, 29, 1) 0%, rgba(21, 24, 29, 1) 67%, rgba(38, 46, 59, 1) 100%);
`;

export default function Nav() {
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    }, []);
    return (
        <div className='navLayout'>
            <NavContainer className='container padding1rem'>
                <Helloa to='/'>HELLOA.GG</Helloa>
                <div>
                    <Links className={location.pathname === '/' ? 'navSmallBorder' : ''} to='/'>
                        <GoHomeFill />
                        <span> 홈</span>
                    </Links>
                    <Links className={location.pathname === '/character' ? 'navSmallBorder' : ''} to='/character'>
                        <GoSearch />
                        <span> 캐릭터 검색</span>
                    </Links>
                </div>
            </NavContainer>
        </div>
    );
}
