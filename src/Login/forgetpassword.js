import React from 'react'
import {Grid, Row, Col, Thumbnail, Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap'
import axios from 'axios'
export default class ForgetPassword extends React.Component {
    constructor(props, context) {
        super(props, context);



        this.state = {
            value: '',
            username:'',
            showUserNameResults: '',
            showForgotEmailDiv:true,
            forgotresult:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    getValidationState() {

        const length = this.state.username.length;
        if (length <= 0) return;
        const username = this.state.username;
        if (!/.+@.+\..+/.test(username)) {
            return 'error';
        } else {
            return 'success'

        }
    }

    handleChange(e) {
        var username=e.target.value;
        this.setState({username:username });
    }
    handleRegisterSubmit(e){
        const usernameLength = this.state.username.length;
        if (usernameLength <= 0 ) {
            alert("Please Enter Email Id")
        } else {

            const {username} = this.state;

            axios.post('http://localhost:4040/api/auth/forgot', {username})
                .then((result) => {
                    console.log(result);
                    if (result.data.success) {
                        this.setState({showForgotEmailDiv:false})
                        this.setState({forgotresult:'Mail successfully sent to registrated username '+username})
                        this.handelTimeOut();
                    } else {

                        this.setState({showUserNameResults: result.data.message});
                    }

                });


        }
    }
    handelTimeOut(){
        setTimeout(function() { this.props.history.push('/') }.bind(this), 3000);
    }
    render() {
        return (
            <div className={'thank-you'}>
                <Grid>
                    <Row>

                        <Col xs={6} md={4}>
                            <Thumbnail>

                                <h1 id={'forgot-pwd-h1'}>Forgot Password</h1>
                                { this.state.showForgotEmailDiv ?  <div>
                                    <form>
                                        <FormGroup
                                            controlId="formBasicText"
                                            validationState={this.getValidationState()}
                                        >
                                            <ControlLabel>Enter Registered Email Id To Reset Password</ControlLabel>
                                            <FormControl
                                                type="text"
                                                value={this.state.username}
                                                placeholder="Enter Email"
                                                onChange={this.handleChange}
                                            />
                                            <FormControl.Feedback/>
                                            <HelpBlock><span
                                                id={'name-help'}>{this.state.showUserNameResults}</span></HelpBlock>
                                        </FormGroup>
                                        <Button className={'login-form-submit'} onClick={this.handleRegisterSubmit}
                                                bsStyle="primary">Register</Button>
                                    </form>
                                </div> : null }
                               <label>{this.state.forgotresult}</label>
                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>


            </div>
        )
    }
}