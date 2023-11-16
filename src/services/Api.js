import axios from 'axios';
const url = `https://developer-lostark.game.onstove.com`;
const apiKey =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAzMjk0NDYifQ.BjW5aBV3cjqd9tX6Wzspnz7eZtP73EsTvPG7DC9i22iN6itbiwBsXU8Pw3aZgbHJ-MrFgwXnk-zV8kSyM4p6tfiqMbSZJa8n9zIcQkSLE6CzGynwo74x8Rc4al_zILsYuWQNcLaSNUXAp4BBRFEADN7LmHGcD2AepOr2QiKN3Tf1k2by3zmTjrkNWpb0ky5UXQY1_N01eFnCyvI5TYHQQbio0Yu3vmmHSQ9TSd3Yrmw1vng1yYIsb47wuwf36sDQQY3Ovk-1jMXSC2Awna79yQeqRA_YSpcGjZshbui_4Prg3PgbCJ7nWCL7ZWlBpeXrYNEd5fztK1s20fYPm9ZyFA'; // 본인의 API 키로 대체

// 기본 정보 불러오는 로직
export const getChaData = async (chaName) => {
    let data = await axios.get(url + `/armories/characters/${chaName}/profiles`, {
        headers: {
            accept: 'application/json',
            Authorization: `bearer ${apiKey}`,
        },
    });

    if (data.data === null) {
        return null;
    } else {
        return data;
    }
};

// 장비 정보
export const getEquData = async (chaName) => {
    let data = await axios.get(url + `/armories/characters/${chaName}/equipment`, {
        headers: {
            accept: 'application/json',
            Authorization: `bearer ${apiKey}`,
        },
    });

    if (data.data === null) {
        return null;
    } else {
        return data;
    }
};

// 각인
export const getEngravingsData = async (chaName) => {
    let data = await axios.get(url + `/armories/characters/${chaName}/engravings`, {
        headers: {
            accept: 'application/json',
            Authorization: `bearer ${apiKey}`,
        },
    });

    if (data.data === null) {
        return null;
    } else {
        return data;
    }
};

// 모험섬
export const getIslandData = async () => {
    let data = await axios.get(url + `/gamecontents/calendar`, {
        headers: {
            accept: 'application/json',
            Authorization: `bearer ${apiKey}`,
        },
    });

    if (data.data === null) {
        return null;
    } else {
        return data;
    }
};

// 이벤트
export const getEventsData = async () => {
    let data = await axios.get(url + `/news/events`, {
        headers: {
            accept: 'application/json',
            Authorization: `bearer ${apiKey}`,
        },
    });

    if (data.data === null) {
        return null;
    } else {
        return data;
    }
};

// 카드
export const getCardData = async (chaName) => {
    let data = await axios.get(url + `/armories/characters/${chaName}/cards`, {
        headers: {
            accept: 'application/json',
            Authorization: `bearer ${apiKey}`,
        },
    });

    if (data.data === null) {
        return null;
    } else {
        return data;
    }
};
