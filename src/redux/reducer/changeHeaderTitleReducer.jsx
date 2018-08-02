import {CHANGHEADERTITLE} from '../../redux/constants/changHeaderTitleConstans'

const changHeaderTitleSource = {
    changHeaderTitleData: ''
};
const changeHeaderReducer = (state = changHeaderTitleSource, action) => {
    switch (action.type) {
        case CHANGHEADERTITLE:
            return {...state, changHeaderTitleData: action.changeHeaderTitle};
        default:
            return state
    }
};
export default changeHeaderReducer