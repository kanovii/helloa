import React, { useState } from 'react';
import { getChaData } from '../services/Api';
import { useQuery } from '@tanstack/react-query';

export default function Test() {
    const [chaName, setChaName] = useState('');
    const [searchName, setSearchName] = useState('');

    const { data: chaData } = useQuery({
        queryKey: ['chaData', searchName],
        queryFn: () => getChaData(searchName),
    });

    const handleSearch = () => {
        setSearchName(chaName);
    };

    // console.log(chaData);
    return (
        <div className='container'>
            <div className='innerContainer'>
                <input
                    placeholder='캐릭터를 입력하세요'
                    onChange={(e) => {
                        setChaName(e.target.value);
                        console.log(chaName);
                    }}
                    value={chaName}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch}>검색</button>
                {chaData ? <img src={chaData.data.CharacterImage} /> : <div>없어용 ㅠㅠ</div>}
            </div>
        </div>
    );
}
