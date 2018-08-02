import {CHANGHEADERTITLE} from '../../redux/constants/changHeaderTitleConstans'

export const changHeaderTitleData =(prams)=>{
    return dispatch=>{
        dispatch({type:CHANGHEADERTITLE,changeHeaderTitle:prams})
    }
}