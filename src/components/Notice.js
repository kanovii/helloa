import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getNoticeData } from '../services/Api';
import styled from 'styled-components';
import { BsBalloonFill } from 'react-icons/bs';

//스타일 시작 ===============================================================>
const NoticeBox = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
    overflow: hidden;
`;

const NoticeItemBox = styled.a`
    display: block;
    border-bottom: solid 1px var(--border-outline);
    padding: 0.825rem;
    &:last-child {
        border: none;
    }
    color: var(--color-less);
    background-color: var(--background-color-default);
`;

const Loading = styled.div`
    text-align: center;
`;
//스타일 끝 ===============================================================>

export default function Notice() {
    const { data: noticeData } = useQuery({
        queryKey: ['noticeData'],
        queryFn: () => getNoticeData(),
    });

    console.log(noticeData);
    return (
        <>
            {noticeData ? (
                <div className='container'>
                    <div className='innerContainer'>
                        <h2>
                            <BsBalloonFill /> 공지
                        </h2>
                        <NoticeBox>
                            {noticeData.data.map((i, index) => {
                                if (index < 11) {
                                    return (
                                        <NoticeItemBox target='blank' href={i.Link}>
                                            {i.Title}
                                        </NoticeItemBox>
                                    );
                                }
                            })}
                        </NoticeBox>
                    </div>
                </div>
            ) : (
                <div className='container'>
                    <div className='innercontainer'>
                        <Loading>loading</Loading>
                    </div>
                </div>
            )}
        </>
    );
}
