import { Message } from 'antd';
import { browserHistory } from 'react-router';
import showModelSeverce from '../../services/showModelSeverce';
import { SHOWMODELSOURCE,TESTSOURCE } from '../constants/home';

/**
 * 获取总数据
 * @param res
 * @returns {{type, res: *}}
 */

const test=(res)=>{
    return{
        type:TESTSOURCE,
        testSource:res
    }
}

export const testSource = (params) => {

    return dispatch => {
        showModelSeverce.testSource(params,(res)=>{
             dispatch(test(res.data));
        })

    }
}
const resLogin = (res) => {
    return {
        type: SHOWMODELSOURCE,
        showSource:res
    }
}

export const showModels = (params) => {

    return dispatch => {
        showModelSeverce.showModel(params,(res)=>{
            dispatch(resLogin(res.data));
        })

    }
}
