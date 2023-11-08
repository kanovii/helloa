import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEventsData } from '../services/Api';
import styled from 'styled-components';

import { GiPartyPopper } from 'react-icons/gi';

const Loading = styled.div`
    text-align: center;
`;

const EventContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    box-sizing: border-box;
    position: relative;

    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
`;

const EventsItmes = styled.div`
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: start;

    /* border-radius: 0.825rem; */
    overflow: hidden;
`;

const EventImg = styled.img`
    object-fit: contain;
    max-width: 100%;
    max-width: 100%;

    border-radius: 0.5rem;
    box-shadow: var(--box-shadow-default);

    display: block;
    box-sizing: border-box;
    border: solid 1px var(--border-outline);
`;

const EventsDate = styled.div`
    padding: 0.15rem 0.4rem;
    display: inline-block;

    box-sizing: border-box;

    background-color: #2b313a;
    border-radius: 0.5rem;
    margin-top: 0.5rem;

    text-align: center;

    box-shadow: var(--box-shadow-default);

    font-size: 0.825rem;

    width: 100%;
`;

const InfoBox = styled.span`
    padding: 0.5rem;
    display: inline-block;

    background-color: #2b313a;
    border-radius: 0.5rem;
    margin-right: 10px;
`;

export default function Events() {
    const { data: events, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: () => getEventsData(), // api 파일에 따로 있음
        enabled: true,
    });

    useEffect(() => {
        console.log(events);
    }, [isLoading]);

    return (
        <>
            <div className='container'>
                <div className='innerContainer'>
                    <h2>
                        <GiPartyPopper /> 이벤트
                    </h2>{' '}
                    <div className=''>
                        {isLoading ? (
                            <Loading> Loading... </Loading>
                        ) : (
                            <EventContainer>
                                {events.data.map((data) => {
                                    return (
                                        <EventsItmes>
                                            <a href={data.Link}>
                                                <EventImg src={data.Thumbnail} />
                                            </a>
                                            <EventsDate>
                                                {data.StartDate.substr(0, 4)}/{data.StartDate.substr(5, 2)}/
                                                {data.StartDate.substr(8, 2)} ~ {data.EndDate.substr(0, 4)}/
                                                {data.EndDate.substr(5, 2)}/{data.EndDate.substr(8, 2)}
                                            </EventsDate>
                                        </EventsItmes>
                                    );
                                })}
                            </EventContainer>
                        )}{' '}
                    </div>
                </div>
            </div>
        </>
    );
}
