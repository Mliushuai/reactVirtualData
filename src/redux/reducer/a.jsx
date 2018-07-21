import {SHOWMODELSOURCE} from '../constants/home'

// 初始化state数据
const showSource1 = {
    material:[]
};

const material = (state=showSource1, action) => {
    switch (action.type) {
        case 'SHOWMODELSOURCE':
            return {...state,material:action.showSource};

        default:
            return state
    }
};

export default material