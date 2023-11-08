import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GoSearch } from 'react-icons/go';
import styled from 'styled-components';

const GoSearchBox = styled.span`
    position: absolute;
    right: 27px;
    top: 23px;
`;

const InCon = styled.div`
    position: relative;
`;

export default function SearchBar() {
    const [chaName, setChaname] = useState('');

    const move = new useNavigate();

    const handleSearch = () => {
        move('character', {
            state: {
                chaName: chaName,
            },
        });
    };

    return (
        <div className=' container'>
            <InCon className='innerContainer'>
                <input
                    className='searchBox boxBasic '
                    placeholder='캐릭터 검색'
                    value={chaName}
                    onChange={(e) => {
                        setChaname(e.target.value);
                        console.log(chaName);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            console.log(chaName + ' 검색을 시작합니다.');
                            handleSearch();
                        }
                    }}
                />
                <GoSearchBox>
                    <GoSearch />
                </GoSearchBox>
            </InCon>
        </div>
    );
}
