import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getChaData, getEquData, getEngravingsData, getCardData, getGemData } from './../services/Api';
import { useLocation } from 'react-router';
import { LuSprout } from 'react-icons/lu';
import mokoko from './../img/mokoko.png';
import backimg from './../img/backimg.jpg';
import { GoSearch } from 'react-icons/go';

import ChaBox from './ChaBox';
import styled from 'styled-components';

//스타일 시작 ===============================================================>
const Loading = styled.div`
    text-align: center;
`;

const Mokoko = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: contain;
    background-image: url(${mokoko});
`;

const GoSearchBox = styled.span`
    position: absolute;
    right: 27px;
    top: 23px;
`;

const InCon = styled.div`
    position: relative;
    display: inline-block;
    width: 100%;
    background-size: contain;

    box-sizing: border-box;
`;

const NoneImgBox = styled.div`
    width: 100%;
`;

const NoneImg = styled.img`
    background-size: contain;
    display: block;
    box-sizing: border-box;
    border-radius: 1rem;

    border: solid 1px var(--border-outline);

    box-shadow: var(--box-shadow-default);

    width: inherit;
`;
//스타일 끝 ===============================================================>

export default function Search() {
    const [chaName, setChaname] = useState('');
    const [onChaName, setOnChaName] = useState('');

    const location = useLocation();

    // 캐릭터 정보 가져오는 api
    const {
        isLoading,
        data: chaInfo,
        error,
    } = useQuery({
        queryKey: ['chaData', onChaName],
        queryFn: () => getChaData(chaName), // api 파일에 따로 있음
        enabled: true,
    });

    // 장비 가져오는 api
    const { data: equData, error: equError } = useQuery({
        queryKey: ['equData', onChaName],
        queryFn: () => getEquData(chaName), // api 파일에 따로 있음
        enabled: true,
    });

    // 각인 가져오는 api
    const { data: engravingsData } = useQuery({
        queryKey: ['engravingsData', onChaName],
        queryFn: () => getEngravingsData(chaName), // api 파일에 따로 있음
        enabled: true,
    });

    //카드 가져오는 api
    const { data: cardData } = useQuery({
        queryKey: ['cardData', onChaName],
        queryFn: () => getCardData(chaName),
        enabled: true,
    });

    // 보석 가져오는 api
    const { data: gemData } = useQuery({
        queryKey: ['gemData', onChaName],
        queryFn: () => getGemData(chaName),
        enabled: true,
    });
    const handleSearch = () => {
        setOnChaName(chaName);
    };

    useEffect(() => {
        if (error) {
            console.log(error.message);
        }
    }, [chaInfo]);

    useEffect(() => {
        if (location.state) {
            setChaname(location.state.chaName);
            setOnChaName(location.state.chaName);
        }
    }, []);

    return (
        <div className='container'>
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

            {chaInfo ? (
                <div className='innerContainer'>
                    <ChaBox
                        chaInfo={chaInfo}
                        CharacterName={chaInfo.data.CharacterName}
                        CharacterImage={chaInfo.data.CharacterImage}
                        equData={equData}
                        engravingsData={engravingsData}
                        cardData={cardData}
                        gemData={gemData}
                    />
                    {chaInfo.data.CharacterName ? (
                        <></>
                    ) : (
                        <NoneImgBox>
                            <NoneImg src={backimg} />
                        </NoneImgBox>
                    )}
                </div>
            ) : isLoading ? (
                <div className='innerContainer'>
                    <Loading className='boxBasic'>
                        <Mokoko />
                        Loading...
                    </Loading>
                </div>
            ) : (
                <div className='innerContainer'>
                    <div className='boxBasic'>
                        <Loading>존재하지 않는 캐릭터 입니다.</Loading>
                    </div>
                </div>
            )}
        </div>
    );
}
