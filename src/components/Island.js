import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getIslandData } from './../services/Api';

import { GiIsland } from 'react-icons/gi';

import mokoko from './../img/mokoko.png';

const today = new Date();
const currentDate = new Date();
const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
const morning = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0, 0);
const afternoon = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

const Loading = styled.div`
    width: 100%;
    text-align: center;
`;

const IslandBox = styled.div`
    text-align: center;
`;

const Mokoko = styled.div`
    display: inline-block;
    width: 2rem;
    height: 2rem;
    background-size: contain;
    background-image: url(${mokoko});
`;

const IslandContentsBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const IslandSecsion = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    position: relative;
`;

const StartTimeInfo = styled.div`
    position: absolute;
    right: 0;
    padding: 0.2rem 0.5rem;
    display: inline-block;

    background-color: #2b313a;
    border-radius: 0.5rem;
`;

const IslandItem = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-start;
    gap: 1rem;

    width: inherit;

    padding: 0.5rem 0;
    border-bottom: solid 1px var(--border-outline);
    &:last-child {
        border-bottom: none;
    }
`;

const IslandIcon = styled.img`
    width: 2rem;
    height: 2rem;
    display: block;

    border-radius: 0.5rem;
`;

const InfoBox = styled.span`
    padding: 0.2rem 0.5rem;
    display: inline-block;

    background-color: #2b313a;
    border-radius: 0.5rem;
    margin-bottom: 0.825rem;
`;

const Reward = styled.span`
    padding: 0.2rem 0.5rem;
    display: inline-block;

    background-color: #2b313a;
    border-radius: 0.5rem;

    position: absolute;
    right: 0;
`;

const RewardImg = styled.img`
    width: 22px;
`;

export default function Island() {
    const [morningIsland, setMorningIsland] = useState([]);
    const [afternoonIsland, setAfternoonIsland] = useState([]);

    const { data: island, isLoading } = useQuery({
        queryKey: ['island'],
        queryFn: () => getIslandData(), // api 파일에 따로 있음
        enabled: true,
    });

    // 데이터 필터링 (오전, 오후 나누는 로직)
    const filteringIsland = (d) => {
        // 오늘 하는 모험 섬 찾는 로직

        const filtered = d.data.filter((d) => {
            return d.CategoryName == '모험 섬';
        });

        const adventureIsland = filtered.filter((d) => {
            if (Array.isArray(d.StartTimes)) {
                for (const timestamp of d.StartTimes) {
                    const itemTimestamp = new Date(timestamp);
                    if (itemTimestamp >= todayStart && itemTimestamp <= todayEnd) {
                        return true;
                    }
                }
                return false;
            } else {
                const itemTimestamp = new Date(d.StartTimes);
                return itemTimestamp >= todayStart && itemTimestamp <= todayEnd;
            }
        });

        const morningData = adventureIsland.filter((item) => {
            if (item.StartTimes) {
                return item.StartTimes.some((startTime) => {
                    const itemTime = new Date(startTime);
                    return itemTime >= todayStart && itemTime <= morning;
                });
            }
            return false;
        });

        const afterNoonData = adventureIsland.filter((item) => {
            if (item.StartTimes) {
                return item.StartTimes.some((startTime) => {
                    const itemTime = new Date(startTime);
                    const hos = itemTime.getHours();
                    if (hos < 14) {
                        return false;
                    } else {
                        return itemTime >= morning && itemTime <= afternoon;
                    }
                });
            }
            return false;
        });

        setMorningIsland(morningData);
        setAfternoonIsland(afterNoonData);
        console.log(morningIsland);
        // console.log(afternoonIsland);
    };

    useEffect(() => {
        if (isLoading == false) {
            filteringIsland(island);
        }
    }, [island]);

    return (
        <div className='container'>
            <div className='innerContainer'>
                <h2>
                    <GiIsland /> 오늘 모험 섬
                </h2>
                <IslandBox className='boxBasic'>
                    <IslandContentsBox>
                        {isLoading ? (
                            <Loading>Loading...</Loading>
                        ) : island ? (
                            <>
                                <IslandSecsion>
                                    <InfoBox>오전 섬</InfoBox>
                                    <StartTimeInfo>
                                        {morningIsland[0] &&
                                            morningIsland[0].StartTimes.filter((startTimeData) => {
                                                const timeData = new Date(startTimeData);

                                                // 시간 되기 전
                                                if (timeData > currentDate) {
                                                    return (
                                                        timeData > currentDate &&
                                                        timeData < todayEnd &&
                                                        timeData <= morning
                                                    );
                                                } else {
                                                    return (
                                                        timeData > todayStart &&
                                                        timeData < todayEnd &&
                                                        timeData <= morning
                                                    );
                                                }
                                            }).map((time) => {
                                                const timedata = new Date(time);
                                                const hos = timedata.getHours();

                                                return <span> [ {hos} : 00 ] </span>;
                                            })}
                                    </StartTimeInfo>
                                    {morningIsland.map((dat) => {
                                        return (
                                            <IslandItem>
                                                <IslandIcon src={dat.ContentsIcon} />
                                                <span>{dat.ContentsName}</span>
                                                <Reward>
                                                    {/* 보상 로직 / 다시 만들어야함 */}
                                                    {dat.RewardItems.filter((item) => {
                                                        if (item.StartTimes) {
                                                            return item.StartTimes.some((startTime) => {
                                                                const itemTime = new Date(startTime);
                                                                return itemTime <= afternoon && itemTime >= todayStart;
                                                            });
                                                        }
                                                    }).map((item) => {
                                                        return <RewardImg src={item.Icon} />;
                                                        // 여기에서 맵
                                                    })}
                                                </Reward>
                                            </IslandItem>
                                        );
                                    })}
                                </IslandSecsion>
                                <IslandSecsion>
                                    <InfoBox>오후 섬</InfoBox>
                                    <StartTimeInfo>
                                        {morningIsland[0] &&
                                            afternoonIsland[0].StartTimes.filter((startTimeData) => {
                                                const timeData = new Date(startTimeData);

                                                // 시간 되기 전
                                                if (timeData > currentDate) {
                                                    return (
                                                        timeData > currentDate &&
                                                        timeData < todayEnd &&
                                                        timeData >= morning
                                                    );
                                                } else {
                                                    return Math.max(
                                                        timeData > todayStart &&
                                                            timeData < todayEnd &&
                                                            timeData >= morning
                                                    );
                                                }
                                            }).map((time) => {
                                                const timedata = new Date(time);
                                                const hos = timedata.getHours();
                                                return <span> [ {hos} : 00 ] </span>;
                                            })}
                                    </StartTimeInfo>
                                    {afternoonIsland.map((dat) => {
                                        return (
                                            <IslandItem>
                                                <IslandIcon src={dat.ContentsIcon} />
                                                <span>{dat.ContentsName}</span>
                                                <Reward>
                                                    {dat.RewardItems.filter((item) => {
                                                        if (item.StartTimes) {
                                                            return item.StartTimes.some((startTime) => {
                                                                const itemTime = new Date(startTime);
                                                                return itemTime <= afternoon && itemTime >= todayStart;
                                                            });
                                                        }
                                                    }).map((item) => {
                                                        return <RewardImg src={item.Icon} />;
                                                        // 여기에서 맵
                                                    })}
                                                </Reward>
                                            </IslandItem>
                                        );
                                    })}
                                </IslandSecsion>
                            </>
                        ) : (
                            <Loading>모험섬 일정이 초기화 되었습니다.</Loading>
                        )}
                    </IslandContentsBox>
                </IslandBox>
            </div>
        </div>
    );
}
