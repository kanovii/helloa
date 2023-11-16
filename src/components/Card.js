import React, { useEffect } from 'react';
import styled from 'styled-components';

//스타일 시작 ===============================================================>
const CardImg = styled.img`
    width: 80px;
`;

const CardBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    width: 100%;
    max-width: 700px;
    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(3, 86px);
        gap: 0.5rem;
        justify-content: space-evenly;
    }
    margin: 0 auto;
`;

const CardLine = styled.div`
    background-image: url(https://cdn-lostark.iloa.gg/2018/obt/assets/images/pc/profile/img_card_grade.png);
    width: 86px;
    height: 126px;
    background-size: cover;
    left: -3px;
    top: -3px;
    position: absolute;
    background-position: ${(props) =>
        props.Grade == '전설'
            ? '80.15% 0'
            : props.Grade == '영웅'
            ? '60.05% 0'
            : props.Grade == '희귀'
            ? '39.95% 0'
            : '19.85% 0'};
`;

const CardItemBox = styled.div`
    position: relative;
`;

const CardHiddenBox = styled.div`
    position: absolute;
    width: 69px;
    height: 20px;
    overflow: hidden;

    bottom: 5px;
    left: 6px;

    z-index: 1000;
`;

const Star = styled.div`
    position: absolute;
    width: 69px;
    height: 20px;
    background-image: url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/img_profile_awake.png);
    background-size: cover;

    z-index: 10;
`;

const Glow = styled.div`
    position: absolute;
    width: 69px;
    height: 20px;
    background-image: url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/img_profile_awake.png);
    background-size: cover;
    background-position: 0 100%;
    z-index: 100;

    right: ${(props) => {
        let jsonData = JSON.parse(props.Tooltip);
        let count = jsonData.Element_001.value.awakeCount;
        return count == 0
            ? '100%'
            : count == 1
            ? '80%'
            : count == 2
            ? '60%'
            : count == 3
            ? '40%'
            : count == 4
            ? '20%'
            : '0';
    }};
`;

const InfoBox = styled.div`
    display: block;

    @media (max-width: 768px) {
        padding-right: 0.6rem;
        border-right: solid 1px var(--border-outline);
    }
`;

const CardSection = styled.div`
    @media (max-width: 768px) {
        display: flex;
        gap: 0.6rem;
    }
`;

const InfoBoxText = styled.div`
    padding: 0.5rem;
    background-color: #2b313a;
    border-radius: 0.5rem;
    box-sizing: border-box;

    width: 47px;
    text-align: center;
    margin-bottom: 12px;
    @media (max-width: 768px) {
        margin-bottom: 0;
    }
`;
// 스타일 끝 ===============================================================>

export default function Card({ cardData }) {
    useEffect(() => {
        console.log(cardData);
    }, [cardData]);

    return (
        <>
            {cardData ? (
                <CardSection className='boxBasic'>
                    <InfoBox>
                        <InfoBoxText>카드</InfoBoxText>
                    </InfoBox>
                    <CardBox>
                        {cardData.data.Cards.map((i) => {
                            console.log(i.Grade);
                            return (
                                <CardItemBox>
                                    <CardImg src={i.Icon} />
                                    <CardLine Grade={i.Grade} />
                                    <CardHiddenBox>
                                        <Star />
                                        <Glow Tooltip={i.Tooltip} />
                                    </CardHiddenBox>
                                </CardItemBox>
                            );
                        })}
                    </CardBox>
                </CardSection>
            ) : (
                <div></div>
            )}
        </>
    );
}
