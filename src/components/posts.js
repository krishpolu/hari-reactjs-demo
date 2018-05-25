import React from 'react'
import logo from '../logo.svg';
import '../App.css';
import {connect} from 'react-redux'
import {fetchPosts} from '../actions/postsactions'
import PropTypes from 'prop-types'
import PostForm from './postforms'

class Posts extends React.Component {

    componentWillMount() {
        this.props.fetchPosts();
    }
    componentWillReceiveProps(nextProps){
     if(nextProps.newPost){
        this.props.posts.unshift(nextProps.newPost);
     }
    }

    render() {
        const postItems = this.props.posts.map(posts => (
                <div key={posts.id}>
                    <h3>{posts.title}</h3>
                    <p>{posts.body}</p>
                </div>
            )
        );
        return (<div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <PostForm/>
            <hr/>
            <div className="container">
                <h1>Posts</h1>
                {postItems}
            </div>
        </div>)
    }

}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    Posts: PropTypes.array.isRequired,
    newPost: PropTypes.object

};
const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
});
export default connect(mapStateToProps, {fetchPosts})(Posts);