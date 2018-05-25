import React from 'react';
import { Button,Navbar,Nav,NavItem} from 'react-bootstrap'
import './home.css'
import SideNavBar from '../Home/sidenav'
export default class Home extends React.Component{

    constructor(props){
        super(props);

        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleLogout=this.handleLogout.bind(this);
    }

    handleCreateEvent(e) {

    }
    handleLogout(){
       localStorage.setItem("redirect","false")
        this.props.history.push('/');
    }
    render(){
        return(<div>

            <Navbar  >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <Button   onClick={this.handleCreateEvent} bsStyle="primary">Create Event</Button>
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            <Button   onClick={this.handleLogout} bsStyle="primary">LOGOUT</Button>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <SideNavBar/>

        </div>);
    }
}