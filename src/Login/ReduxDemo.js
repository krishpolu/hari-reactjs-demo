import React from 'react'
import {createStore} from 'redux'

export default class ReduxDemo extends React.Component{
      componentWillMount(){
          fetch("https://jsonplaceholder.typicode.com/posts")
              .then(res=>res.json())
              .then(data=>console.log(data));
      }
    render(){

        const reducer=function (state,action) {
            if(action.type==="ATTACK"){
                return action.payload
            }
            if(action.type==="GREENATTACK"){
                return action.payload
            }
           return state;
        }

        const store=createStore(reducer,"Place");

        store.subscribe(()=>{
            console.log("Store is Now",store.getState());
        });
        store.dispatch({type:"ATTACK",payload:'I am new state ATTACK'})
        store.dispatch({type:"GREENATTACK",payload:'I am new state GREENATTACK'})

        return(<div></div>)
    }

}