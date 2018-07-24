import { fromJS } from 'immutable';
export const MATERIALSOURCE = 'MATERIALSOURCE'; // 测试接口

// 初始化state数据
const sour = {
    sour: []
};

const source = (state=sour, action) => {
    return {sour:"88"}
    // switch (action.type) {
    //     case 'MATERIALSOURCE': fromJS(state).merge({sour: action.source}).toJS();
    //     default: return state;
    // }
};

export default source;
