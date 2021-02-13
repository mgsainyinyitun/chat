import React from 'react';
import {connect} from 'react-redux';
import {Tabs} from 'antd';
import {Card} from 'react-bootstrap';
const {TabPane} = Tabs;

class AboutUs extends React.Component {
    componentDidUpdate(){
        console.log("This props::",this.props);
    }
    render(){
        const theme = this.props.theme;
        const style = theme==='dark'?'bg-dark text-white':'';
        return(
        
                <Card className={`p-3 m-2 ${style}`} style={{height:"98%"}}>
                    <Tabs defaultActiveKey="1" className={`${style}`}>
                        <TabPane tab={<h6 className="text-primary">ABOUT</h6>} key="1">
                                Hi My name is Mg Sai Nyi Nyi Tun.
                        </TabPane>
                        <TabPane tab={<h6 className="text-primary">CONTACT</h6>} key="2">
                                <p>Phone : +959 440096573</p>
                                <p>E-mail : mgsainyinyitun.tumdy@gmail.com</p>
                        </TabPane>
                        <TabPane tab={<h6 className="text-primary">FAQs</h6>} key="3">
                                
                        </TabPane>
                    </Tabs>
                </Card>
        )
    }
}
const mapStateToProps = state => {
    return {
        theme:state.theme,
    }
}
export default connect(mapStateToProps)(AboutUs);