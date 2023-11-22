import React from 'react';
import styled from 'styled-components';

const ColletiblesImg = styled.img`
    width: 50px;
`;

export default function Collectibles(collectiblesData) {
    return (
        <>
            {collectiblesData ? (
                <div>
                    <div className='boxBasic'>
                        {collectiblesData.collectiblesData.data.map((i) => {
                            console.log(collectiblesData);

                            return <ColletiblesImg src={i.Icon} />;
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
