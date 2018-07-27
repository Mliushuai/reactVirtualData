import {CHANGEKEYDATA} from '../../redux/constants/changKeyConstanst'

export const changekeyData =(prams,type)=>{
   return dispatch=>{
       dispatch({type:CHANGEKEYDATA,changeData:prams,types:type})
   }
}