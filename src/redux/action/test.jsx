
import { Message } from 'antd';
import { browserHistory } from 'react-router';
import Config from '../../config/index';
import testService from '../../services/testService';
// import { loading } from '../index';
import { MATERIALSOURCE } from '../constants/testTypes';

/**
 * 获取物料总数据
 * @param res
 * @returns {{type, res: *}}
 */
const resLogin = (res) => {
    return {
        type: MATERIALSOURCE,
        source:res
    }
}
/**
 * 获取物料信息
 */
export const test =(params)=>{
    // return dispatch => {
    // console.log(params,'testService')
    return  dispatch =>{
        console.log(params,'testService')

    }

}