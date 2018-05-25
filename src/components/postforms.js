import React from 'react'
import{connect} from 'react-redux';
import {createPosts} from '../actions/postsactions';
import PropTypes from 'prop-types';
class PostForms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.body
        }
        //call action
        this.props.createPosts(post);
    }

    render() {

        return (<div>
            <h2>Add Posts</h2>
            <form onSubmit={this.onSubmit}>
                <div>
                    <label>Title:</label><br/>
                    <input type={'text'} name={'title'} value={this.state.title} onChange={this.onChange}/>
                </div>
                <div>
                    <label>Body:</label><br/>
                    <textarea name={'body'} value={this.state.body} onChange={this.onChange}/>
                </div>
                <button type={'submit'}>submit</button>
            </form>
        </div>)
    }

}
PostForms.propTypes={
    createPosts:PropTypes.func.isRequired

};
export default connect(null,{createPosts})(PostForms);