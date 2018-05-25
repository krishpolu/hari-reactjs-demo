import{combineReducers} from 'redux';
import postRedusers from './postredusers';

export default combineReducers({
    posts:postRedusers
})