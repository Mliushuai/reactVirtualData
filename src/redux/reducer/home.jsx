import {TESTSOURCE,SHOWMODELSOURCE} from '../constants/home'

// 初始化state数据
const showSource1 = {
    testSource:[],
    material:[]
};

const testSource = (state=showSource1, action) => {
    switch (action.type) {
        case 'TESTSOURCE':
            return {...state,testSource:action.testSource};
        default:
            return state
    }
};

export default testSource

