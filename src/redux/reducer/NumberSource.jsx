import {NUMBERSOURCE,NUMBERSOURCE1,NUMBERSOURCE2,NUMBERSOURCE3,LOADINGS,SIGN,SIGN1} from "../constants/NumberSource";

// 初始化state数据
const numberSource = {
    numberSource1: [],
    numberSource2: [],
    numberSource3: [],
    numberSource4:[],
    loading:"",
    sign:"",
    sign1:"",
};

const sourceNumber = (state=numberSource, action) => {
    switch(action.type){
        case NUMBERSOURCE:
            return Object.assign({}, state, { numberSource1:action.num });
        case NUMBERSOURCE1:
            return Object.assign({}, state, { numberSource2:action.num });
        case NUMBERSOURCE2:
            return Object.assign({}, state, { numberSource3:action.num });
        case NUMBERSOURCE3:
            return Object.assign({}, state, { numberSource4:action.num });
        case LOADINGS:
            return Object.assign({}, state, { loading:action.load });
        case SIGN:
            return Object.assign({}, state, { sign:action.sign });
        case SIGN1:
            return Object.assign({}, state, { sign1:action.sign });
           default:
            return state;
    }
};

export default sourceNumber;