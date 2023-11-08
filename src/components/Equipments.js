import React from 'react';
import styled from 'styled-components';

const EquLineBox = styled.div`
    display: flex;
    gap: 1rem;
`;
const EquLineBoxLine = styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
`;

const OneEquBox = styled.div`
    display: flex;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: solid 1px var(--border-outline);
    &:last-child {
        border: none;
        padding: 0;
    }
`;

const EquImg = styled.img`
    width: 45px;
    height: 45px;
    display: inline-block;
    border-radius: 0.5rem;
    background: ${(props) =>
        props.Grade === '고대'
            ? 'linear-gradient(305deg, #dcc999, #3d3325)'
            : props.Grade === '에스더'
            ? 'linear-gradient(305deg, #dcc999, #3d3325)'
            : props.Grade === '유물'
            ? 'linear-gradient(305deg, #a24006, #3d3325)'
            : 'linear-gradient(305deg, #9e5f04, #3d3325)'};
`;

const ItemLevel = styled.span`
    padding: 0.06rem 0.3rem;
    display: inline-block;

    background-color: #2b313a;
    border-radius: 0.5rem;
    margin-right: 10px;
`;
const InEquBox = styled.div``;

const QualityBox = styled.span`
    padding: 0.06rem 0.3rem;
    display: inline-block;

    color: #eee;

    /* background-color: #2b313a; */
    background-color: ${(props) =>
        props.quality == 100
            ? '#EA6811'
            : props.quality >= 90
            ? '#DF1823'
            : props.quality >= 70
            ? '#1260EB'
            : props.quality >= 30
            ? '#09AE09'
            : props.quality >= 10
            ? 'A79300'
            : props.quality >= 0
            ? '#FF0000'
            : '#2b313a'};
    border-radius: 0.5rem;

    border: ${(props) => (props.quality ? 'none' : ` solid 1px var(--border-outline)`)};
`;

export default function Equipments({ equData }) {
    console.log(equData);

    return (
        <>
            {equData ? (
                <div className=''>
                    <EquLineBox className='boxBasic'>
                        <EquLineBoxLine>
                            {equData.data.map((data, index) => {
                                let tooltip = JSON.parse(data.Tooltip);
                                if (index < 6) {
                                    console.log(data.Grade);
                                }

                                return (
                                    <>
                                        {index < 6 && (
                                            <OneEquBox key={index}>
                                                <EquImg src={data.Icon} Grade={data.Grade} />
                                                <InEquBox>
                                                    <span> {data.Type} </span>
                                                    <span> {data.Name.substr(0, 3)} </span>
                                                    <ItemLevel>
                                                        {tooltip.Element_001.value.leftStr2.substr(23, 4)}
                                                    </ItemLevel>
                                                    <QualityBox quality={tooltip.Element_001.value.qualityValue}>
                                                        {tooltip.Element_001.value.qualityValue}
                                                    </QualityBox>
                                                </InEquBox>
                                            </OneEquBox>
                                        )}
                                    </>
                                );
                            })}
                        </EquLineBoxLine>
                        <EquLineBoxLine>
                            {equData.data.map((data, index) => {
                                let tooltip = JSON.parse(data.Tooltip);
                                return (
                                    <>
                                        {5 < index && index < 11 && (
                                            <OneEquBox>
                                                {' '}
                                                <EquImg src={data.Icon} Grade={data.Grade} />
                                                <InEquBox>
                                                    <span> {data.Type} </span>
                                                    <QualityBox quality={tooltip.Element_001.value.qualityValue}>
                                                        {tooltip.Element_001.value.qualityValue}{' '}
                                                    </QualityBox>
                                                </InEquBox>
                                            </OneEquBox>
                                        )}
                                        {index == 11 && (
                                            <OneEquBox>
                                                <EquImg src={data.Icon} Grade={data.Grade} />
                                                <InEquBox>
                                                    <span> {data.Type.substr(5, 2)} </span>
                                                    {tooltip.Element_006.value.Element_000 ? (
                                                        <QualityBox>
                                                            {tooltip.Element_006.value.Element_000.contentStr.Element_000.contentStr.substr(
                                                                -5,
                                                                1
                                                            ) == '0'
                                                                ? '10 '
                                                                : tooltip.Element_006.value.Element_000.contentStr.Element_000.contentStr.substr(
                                                                      -5,
                                                                      1
                                                                  ) + ' '}
                                                            {tooltip.Element_006.value.Element_000.contentStr.Element_001.contentStr.substr(
                                                                -5,
                                                                1
                                                            ) == '0'
                                                                ? '10 '
                                                                : tooltip.Element_006.value.Element_000.contentStr.Element_001.contentStr.substr(
                                                                      -5,
                                                                      1
                                                                  ) + ' '}
                                                            -
                                                            {tooltip.Element_006.value.Element_000.contentStr.Element_002.contentStr.substr(
                                                                -5,
                                                                1
                                                            )}
                                                        </QualityBox>
                                                    ) : (
                                                        <span>null</span>
                                                    )}
                                                </InEquBox>
                                            </OneEquBox>
                                        )}
                                    </>
                                );
                            })}
                        </EquLineBoxLine>
                    </EquLineBox>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
