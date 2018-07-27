import {NUMBERSOURCE,NUMBERSOURCE1,NUMBERSOURCE2,NUMBERSOURCE3,LOADINGS,SIGN,SIGN1} from "../constants/NumberSource";

export const numberSource =(prams,type)=>{

    return  dispatch =>{
        if(type==="0"){
            dispatch({type:NUMBERSOURCE,num:prams})
        }else if(type==="1"){
            dispatch({type:NUMBERSOURCE1,num:prams})
        }else if(type==="2"){
            dispatch({type:NUMBERSOURCE2,num:prams})
        }else if(type==="3"){
            dispatch({type:NUMBERSOURCE3,num:prams})
        }else if(type==="sign"){
            dispatch({type:SIGN,sign:prams})
        }else if(type==="sign1"){
            dispatch({type:SIGN1,sign:prams})
        }
    }
}
export const loadings=(params)=>{
    return dispatch=>{
        dispatch({type:LOADINGS,load:params})
    }
}