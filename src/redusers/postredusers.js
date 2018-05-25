import {FETCH_POSTS,NEW_POSTS}from '../actions/types';

const initialstate={
    items:[],
    item:{}
}
export default function (state=initialstate,action) {
    switch (action.type){
        case FETCH_POSTS:
            console.log('redusers1')
            return {
                ...state,
                items:action.payload
            };
        case NEW_POSTS:
            console.log('redusers2')
            return {
                ...state,
                item:action.payload
            };
        default:
            return state;
    }
    
}