import { combineReducers } from 'redux';
import user from './reducers/userReducer';
import homeReducer from './reducers/homeReducer'

export default combineReducers({
    user,
    home: homeReducer
})