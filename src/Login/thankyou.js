import React from 'react'
import {Grid,Row,Col,Thumbnail} from 'react-bootstrap'
import logo from '../img/thankyou.jpg'
export default class Thankyou extends React.Component{

    render(){
        return(
            <div className={'thank-you'} >
                <Grid>
                    <Row>

                        <Col xs={6} md={4}>
                            <Thumbnail src={logo} alt="171x180">
                                <h3>Thanks For Signing Up !</h3>
                                <p>Please Check Your Registerd Mail To Activate Your Account</p>

                            </Thumbnail>
                        </Col>
                    </Row>
                </Grid>
                

            </div>
        )
    }
}