import React from 'react';
import styled from 'styled-components';

//스타일 시작 ===============================================================>
const GemBox = styled.div`
    display: flex;
    gap: 0.3rem;
    justify-content: space-between;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
    }
`;

const GemItemBox = styled.div`
    border-radius: 0.5rem;
    overflow: hidden;
    width: 50px;
    text-align: center;
`;

const GemIMg = styled.img`
    width: 50px;
    background-color: ${(props) => (props.level >= 6 ? '#9e5f04' : '#480d5d')};
    background-size: cover;
    background-position: center;
`;

const GemLevel = styled.div`
    text-align: center;
    background-color: var(--background-color-less);
`;
//스타일 끝 ===============================================================>
// 9e5f04 480d5d

export default function ({ gemData }) {
    console.log(gemData);
    return (
        <div className='boxBasic'>
            <GemBox>
                {gemData ? (
                    <>
                        {gemData.data.Gems.map((i) => {
                            const jsonData = JSON.parse(i.Tooltip);
                            return (
                                <GemItemBox>
                                    <GemIMg
                                        level={jsonData.Element_001.value.slotData.rtString.substr(3, 1)}
                                        src={jsonData.Element_001.value.slotData.iconPath}
                                    />
                                    <GemLevel>{jsonData.Element_001.value.slotData.rtString.substr(3, 1)}</GemLevel>
                                </GemItemBox>
                            );
                        })}
                    </>
                ) : (
                    <></>
                )}
            </GemBox>
        </div>
    );
}

// "{
//     "Element_000": {
//       "type": "NameTagBox",
//       "value": "<P ALIGN='CENTER'><FONT COLOR='#ce43fc'>5레벨 홍염의 보석</FONT></P>"
//     },
//     "Element_001": {
//       "type": "ItemTitle",
//       "value": {
//         "bEquip": 0,
//         "leftStr0": "<FONT SIZE='12'><FONT COLOR='#ce43fc'>영웅 보석</FONT></FONT>",
//         "leftStr2": "<FONT SIZE='14'>아이템 티어 3</FONT>",
//         "qualityValue": -1,
//         "rightStr0": "",
//         "slotData": {
//           "advBookIcon": 0,
//           "battleItemTypeIcon": 0,
//           "cardIcon": false,
//           "friendship": 0,
//           "iconGrade": 3,
//           "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/use/use_9_60.png",
//           "imagePath": "",
//           "islandIcon": 0,
//           "rtString": "Lv.5",
//           "seal": false,
//           "temporary": 0,
//           "town": 0,
//           "trash": 0
//         }
//       }
//     },
//     "Element_002": {
//       "type": "MultiTextBox",
//       "value": "|거래가능"
//     },
//     "Element_003": {
//       "type": "SingleTextBox",
//       "value": "보석 레벨 5"
//     },
//     "Element_004": {
//       "type": "ItemPartBox",
//       "value": {
//         "Element_000": "<FONT COLOR='#A9D0F5'>효과</FONT>",
//         "Element_001": "[블레이드] <FONT COLOR='#FFD200'>블레이드 댄스</FONT> 재사용 대기시간 10.00% 감소"
//       }
//     },
//     "Element_005": {
//       "type": "SingleTextBox",
//       "value": "<FONT SIZE='12'><FONT COLOR='#C24B46'>분해불가</FONT></FONT>"
//     },
//     "Element_006": {
//       "type": "SingleTextBox",
//       "value": "<Font color='#5FD3F1'>[에브니 큐브] </font><BR><Font color='#5FD3F1'>[카오스게이트] </font>"
//     }
//   }"
