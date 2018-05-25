import React from 'react'
import {Redirect} from 'react-router-dom'
import {Button, Form, FormGroup, FormControl, Tabs, Tab, HelpBlock} from 'react-bootstrap'
import './Login.css'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: '',
            key: 1,
            loginResult: '',
            socialLoginResult: '',
            name: '',
            confirmpassword: '',
            showNameResults: '',
            showUserNameResults: '',
            showPasswordResults: '',
            showConfirmPasswordResults: '',

        };
        //
        this.signup = this.signup.bind(this);

        //
        this.handleSelect = this.handleSelect.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handelForgetPassword = this.handelForgetPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleReEmailChange = this.handleReEmailChange.bind(this);
        this.handleRePasswordChange = this.handleRePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    signup(res, type) {
        let postData;
        let registeredThrough
        if (type === 'facebook' && res.email) {
            postData = {
                name: res.name,
                provider: type,
                email: res.email,
                provider_id: res.id,
                token: res.accessToken,
                provider_pic: res.picture.data.url
            };
            registeredThrough = 'facebook';
        }

        if (type === 'google' && res.w3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };
            registeredThrough = 'google';
        }

        if (postData) {
            console.log("postData:" + postData);

            const name = postData.name;
            const username = postData.email;
            const authType = 'Oauth';
            console.log("postData:" + {name, username, authType, registeredThrough});
            axios.post('http://localhost:4040/api/auth/login', {name, username, authType, registeredThrough})
                .then((result) => {
                    console.log("result:" + result);
                    if (result.data.success) {
                        localStorage.setItem("redirect", 'true');
                        this.props.history.push("/home");
                        /* ReactDOM.findDOMNode(this.loginForm).reset();
                         this.setState(function () {
                             return {
                                 username: '',
                                 password: ''

                             }
                         });*/
                    } else {

                        this.setState({socialLoginResult: result.data.message});
                    }

                });
            /* PostData('signup', postData).then((result) => {
                 let responseJson = result;
                 sessionStorage.setItem("userData", JSON.stringify(responseJson));
                 this.setState({ redirect: true });
             });*/
        } else {
        }
    }

    handleSelect(key) {
        this.setState({key});
        if (key === 2) {
            console.log(key)
            this.setState(function () {
                return {
                    name: '',
                    username: '',
                    password: '',
                    confirmpassword: ''

                }
            });
        }
    }

    handleEmailChange(e) {
        var username = e.target.value;
        this.setState({username: username});
    }

    handlePasswordChange(e) {
        var password = e.target.value;
        this.setState({password: password});
    }

    handelForgetPassword() {
        this.props.history.push("/forgot-password");
    }

    getEmailValidationState() {
        const length = this.state.username.length;
        if (length <= 0) return;
        const username = this.state.username;
        if (!/.+@.+\..+/.test(username)) {
            return 'error';
        } else {
            return 'success'

        }

    }

    getPasswordValidationState() {
        const length = this.state.password.length;
        if (length > 5) return 'success';
        else if (length > 4) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleSubmit(e) {
        // Prevent default so the default form submission doesn't
        // get triggered.
        e.preventDefault();
        // This is where the data is sent to the server.
        const usernameLength = this.state.username.length;
        const pwdLength = this.state.password.length;
        if (usernameLength <= 0 && pwdLength <= 0) {
            alert("Please Enter Email && Password")
        } else {

            const {username, password} = this.state;
            const registeredThrough = 'custom';
            axios.post('http://localhost:4040/api/auth/login', {username, password, registeredThrough})
                .then((result) => {
                    console.log(result);
                    if (result.data.success) {
                        localStorage.setItem("redirect", 'true');
                        this.props.history.push("/home");
                        /* ReactDOM.findDOMNode(this.loginForm).reset();
                         this.setState(function () {
                             return {
                                 username: '',
                                 password: ''

                             }
                         });*/
                    } else {

                        this.setState({loginResult: result.data.message});
                    }

                });


        }

    }

    //
    handleNameChange(e) {
        var name = e.target.value;
        const length = name.length;
        if (length > 5) {
            this.setState({showNameResults: ''})
        } else {
            this.setState({showNameResults: 'Minimum 6 Characters'})
        }
        this.setState({name: name});
    }

    handleReEmailChange(e) {
        var username = e.target.value;
        this.setState({username: username});
    }

    handleRePasswordChange(e) {
        var password = e.target.value;
        const length = password.length;
        if (length > 5) {
            this.setState({showPasswordResults: ''})
        } else {
            this.setState({showPasswordResults: 'Minimum 6 Characters'})
        }
        this.setState({password: password});
    }

    handleConfirmPasswordChange(e) {
        var confirmpassword = e.target.value;
        const length = confirmpassword.length;
        if (length > 5) {
            this.setState({showConfirmPasswordResults: ''})
        } else {
            this.setState({showConfirmPasswordResults: 'Minimum 6 Characters'})
        }
        this.setState({confirmpassword: confirmpassword});
    }

    getNameValidationState() {
        const length = this.state.name.length;
        if (length > 5) return 'success';
        else if (length > 4) return 'warning';
        else if (length > 0) return 'error';
        return null;

    }

    getReEmailValidationState() {
        const length = this.state.username.length;
        if (length <= 0) return;
        const username = this.state.username;
        if (!/.+@.+\..+/.test(username)) {
            return 'error';
        } else {
            return 'success'

        }

    }

    getRePasswordValidationState() {
        const length = this.state.password.length;
        if (length > 5) return 'success';
        else if (length > 4) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    getConfirmPasswordValidationState() {
        const length = this.state.confirmpassword.length;
        if (length > 5) return 'success';
        else if (length > 4) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleRegisterSubmit(e) {
        // Prevent default so the default form submission doesn't
        // get triggered.
        e.preventDefault();
        // This is where the data is sent to the server.
        console.log("1username" + this.state.username);
        console.log("name" + this.state.name);

        var pwd = this.state.password;
        var confirmpassword = this.state.confirmpassword;
        if (pwd === confirmpassword) {
            const {name, username, password} = this.state;
            const registeredThrough = 'custom';
            axios.post('http://localhost:4040/api/accounts', {name, username, password, registeredThrough})
                .then((result) => {

                    if (result.data.success) {
                        //localStorage.setItem("redirect", 'true');
                        this.props.history.push("/thank-you");
                        /*ReactDOM.findDOMNode(this.registerForm).reset();
                        this.setState(function () {
                            return {
                                name: '',
                                username: '',
                                password: '',
                                confirmpassword: ''

                            }
                        });*/
                    } else {
                        console.log("2" + result.data.message);
                        this.setState({showUserNameResults: result.data.message});
                    }

                });


        } else {
            this.setState({showConfirmPasswordResults: 'Password & Confirm Password not mach'});

        }

    }


    render() {
        const redirect = localStorage.getItem("redirect");
        console.log(redirect);
        if (redirect === 'true') {
            return <Redirect push to="/home"/>;
        }
        const responseFacebook = (response) => {
            this.signup(response, 'facebook');
        }
        const responseGoogle = (response) => {
            this.signup(response, 'google');
        }

        return (<div className={'login-form'}>
                {/*<ReduxDemo/>*/}
                <div>
                    <h1>KEELA</h1>
                </div>

                <div className="row">
                    <div className="column">


                        <div className={'social-login'}>

                            <span className="button">
                                <GoogleLogin id={'google'}
                                             clientId='508242802939-dmf4sjubbo3mhkibocrdfb5i4u6f3enb.apps.googleusercontent.com'
                                             buttonText="Login With Google +"
                                             onSuccess={responseGoogle}
                                             onFailure={responseGoogle}
                                />
                                <HelpBlock><span
                                    id={'name-help'}>{this.state.socialLoginResult}</span></HelpBlock>
                                 </span>
                            <span className="fbutton">
                                <FacebookLogin appId="377043436037952"
                                               autoLoad={false}
                                               fields="name,email,picture"
                                               callback={responseFacebook}
                                />
                            </span>


                        </div>
                    </div>
                    <div className="column">

                        <Tabs
                            activeKey={this.state.key}
                            onSelect={this.handleSelect}

                        >
                            <Tab eventKey={1} title="Sign In">
                                <div className={"local-login"}>
                                    <Form id='loginForm'
                                          className="form"
                                          ref={form => this.loginForm = form}>
                                        <HelpBlock><span
                                            id={'name-help'}>{this.state.loginResult}</span></HelpBlock>
                                        <FormGroup controlId="formValidationError2"
                                                   validationState={this.getEmailValidationState()}
                                        >
                                            <FormControl placeholder="Email" type="text"

                                                         onChange={this.handleEmailChange}/>
                                            <FormControl.Feedback/>
                                        </FormGroup>
                                        <FormGroup controlId="formValidationError2"
                                                   validationState={this.getPasswordValidationState()}
                                        >
                                            <FormControl placeholder="Password" type="password"
                                                         ref={"passwordInput"}
                                                         onChange={this.handlePasswordChange}/>
                                            <FormControl.Feedback/>

                                        </FormGroup>

                                        <Button className={'login-form-submit'} onClick={this.handleSubmit}
                                                bsStyle="primary">LOGIN</Button>
                                    </Form>
                                    <div>
                                        <label id={'forgot-pwd-label'} onClick={this.handelForgetPassword}>Forgot
                                            Password ?</label>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey={2} title="Register">
                                <div className={"local-login"}>
                                    {/*<Register/>*/}
                                    <Form id='registerForm'
                                          className="form"
                                          ref={form => this.registerForm = form}>
                                        <FormGroup controlId="formValidationError2"
                                                   validationState={this.getNameValidationState()}
                                        >
                                            <FormControl placeholder="Name" type="text"
                                                         onChange={this.handleNameChange}/>
                                            <FormControl.Feedback/>
                                            <HelpBlock><span
                                                id={'name-help'}>{this.state.showNameResults}</span></HelpBlock>

                                        </FormGroup>
                                        <FormGroup controlId="formValidationError2"
                                                   validationState={this.getReEmailValidationState()}
                                        >
                                            <FormControl placeholder="Email" type="text"
                                                         onChange={this.handleReEmailChange}/>
                                            <FormControl.Feedback/>
                                            <HelpBlock><span
                                                id={'name-help'}>{this.state.showUserNameResults}</span></HelpBlock>
                                        </FormGroup>
                                        <FormGroup controlId="formValidationError2"
                                                   validationState={this.getRePasswordValidationState()}
                                        >
                                            <FormControl placeholder="Password" type="password"
                                                         ref={"passwordInput"}
                                                         onChange={this.handleRePasswordChange}/>
                                            <FormControl.Feedback/>
                                            <HelpBlock><span
                                                id={'name-help'}>{this.state.showPasswordResults}</span></HelpBlock>
                                        </FormGroup>
                                        <FormGroup controlId="formValidationError2"
                                                   validationState={this.getConfirmPasswordValidationState()}
                                        >
                                            <FormControl placeholder="Confirm Password" type="password"
                                                         ref={"passwordInput"}
                                                         onChange={this.handleConfirmPasswordChange}/>
                                            <FormControl.Feedback/>
                                            <HelpBlock><span
                                                id={'name-help'}>{this.state.showConfirmPasswordResults}</span></HelpBlock>
                                        </FormGroup>
                                        <Button className={'login-form-submit'} onClick={this.handleRegisterSubmit}
                                                bsStyle="primary">Register</Button>
                                    </Form>

                                </div>
                            </Tab>

                        </Tabs>


                    </div>
                </div>

            </div>
        )
    }

}


