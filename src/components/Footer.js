import React from 'react';
import styled from 'styled-components';

const FooterInner = styled.div`
    height: 500px;
    color: var(--background-color-less);
    padding-top: 100px;
`;

export default function footer() {
    return (
        <div className='container'>
            <FooterInner className='innerContainer'>
                ©2023 HELLOA.GG / HELLOA.GG isn’t endorsed by Smilegate RPG and doesn’t reflect the views or opinions of
                Smilegate RPG or anyone officially involved in producing or managing Lostark. Lostark and Smilegate RPG
                are trademarks or registered trademarks of Smilegate RPG, Inc. Lostark © Smilegate RPG, Inc.
            </FooterInner>
        </div>
    );
}
