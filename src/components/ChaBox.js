import React from 'react';
import styled from 'styled-components';

import Equipments from './Equipments';
import Card from './Card';
import GemBox from './Gem';

//스타일 시작 ===============================================================>
const ChaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

// 서버, 직업 이름
const InfoBox = styled.span`
    padding: 0.5rem;
    display: inline-block;

    background-color: #2b313a;
    border-radius: 0.5rem;
    margin-right: 10px;
`;

const NameBox = styled.span`
    padding: 0.5rem 0 0.2rem;
    display: block;

    font-size: 2rem;
`;

const Title = styled.span`
    color: var(--color-less);
`;

// 이미지, 그 옆 캐릭터 정보
const ChaDetailBox = styled.div`
    display: flex;
    gap: 0.5rem;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;
const InnerChaDetailBox = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
`;
const DetailInfoBox = styled.div`
    display: flex;
    border-bottom: solid 1px var(--border-outline);
    &:last-child {
        border: none;
        padding: 0;
    }
    padding-bottom: 0.5rem;
`;
const Text = styled.span`
    display: inline-block;
    padding: 0.5rem;
`;
const Img = styled.img`
    width: 50%;
    max-width: 522px;

    border-radius: 0.825rem;
    border: solid 1px;
    border-color: var(--border-outline);
    box-shadow: var(--box-shadow-default);
    @media (max-width: 768px) {
        width: 100%;
        border: none;
        box-shadow: none;
    }
`;
//스타일 끝 ===============================================================>

export default function ChaBox({ chaInfo, CharacterName, CharacterImage, equData, engravingsData, cardData, gemData }) {
    console.log(engravingsData);

    return (
        <>
            {CharacterName ? (
                <ChaContainer>
                    <div className='innerContainer boxBasic'>
                        <InfoBox>{chaInfo.data.ServerName}</InfoBox>
                        <InfoBox>{chaInfo.data.CharacterClassName}</InfoBox>
                        <div>
                            <NameBox className='inlieBlock'>{CharacterName}</NameBox>
                            <Title>{chaInfo.data.Title}</Title>
                        </div>
                    </div>
                    <ChaDetailBox className=''>
                        <Img src={CharacterImage} />
                        <InnerChaDetailBox className='innerContainer boxBasic'>
                            <DetailInfoBox>
                                <InfoBox>아이템</InfoBox> <Text> Lv{chaInfo.data.ItemMaxLevel}</Text>
                            </DetailInfoBox>
                            <DetailInfoBox>
                                <InfoBox>전투</InfoBox>
                                <Text>Lv{chaInfo.data.CharacterLevel}</Text>
                            </DetailInfoBox>

                            <DetailInfoBox>
                                <InfoBox>스킬 포인트</InfoBox>
                                <Text>{chaInfo.data.TotalSkillPoint}</Text>
                            </DetailInfoBox>
                            <DetailInfoBox>
                                <InfoBox>영지</InfoBox>
                                <Text>{chaInfo.data.TownName}</Text> <Text>Lv{chaInfo.data.TownLevel}</Text>
                            </DetailInfoBox>
                        </InnerChaDetailBox>
                    </ChaDetailBox>
                    <Equipments equData={equData} engravingsData={engravingsData} />
                    <Card cardData={cardData} />
                    <GemBox gemData={gemData} />
                </ChaContainer>
            ) : (
                <></>
            )}
        </>
    );
}
