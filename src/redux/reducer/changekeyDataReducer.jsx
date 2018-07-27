import {CHANGEKEYDATA} from '../../redux/constants/changKeyConstanst'

const changDataSource ={
    changeData:"总体状态",
    types:""
}
const changeDataReducer =(state=changDataSource,action)=>{
    switch (action.type){
        case CHANGEKEYDATA:
            return {...state,changeData:action.changeData,types:action.types}
        default:
            return state
    }
};
export  default changeDataReducer
