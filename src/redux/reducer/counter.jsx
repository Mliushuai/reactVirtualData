import { INCREMENT, DECREMENT } from '../constants/counterTypes';
// 初始化state数据

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT': return state + 1;
        case 'DECREMENT': return state - 1;
        default: return state;
    }
};

export default counter;
