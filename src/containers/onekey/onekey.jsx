import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {bindActionCreators} from 'redux';
// import { PropTypes } from 'prop-types'
import {onDecrement, onIncrement} from '../../redux/action/counter'
import {Icon, Row, Col, Card, Modal, Steps, Button, message, Table} from 'antd';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';
import styles from './style.css'

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff", marginTop: "20px"}}>
                {/*<Bcrumb title="一键顺控" icon="onekeys"/>*/}
                {/*<Row style={{marginLeft:"15px"}}>*/}
                    {/*<Col xs={24} sm={24} md={24} lg={5} xl={5}>*/}
                        {/*<Card style={{width: "100%", minHeight: 640, padding: 10}}>*/}
                            {/*<h3 className="char-tiele">点位列表</h3>*/}
                            {/*<div className="leter-min">*/}
                                {/*<div className="left-letter">*/}
                                    {/*<span>防汛预案</span>*/}
                                {/*</div>*/}
                                {/*<div className="left-letter">*/}
                                    {/*<span>防台风预案</span>*/}
                                {/*</div>*/}
                                {/*<div className="left-letter">*/}
                                    {/*<span>防台风预案</span>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div style={{marginTop:"320px"}}>*/}
                                {/*<Button type="primary"  ><Link to="/reserve">新增</Link></Button>*/}
                                {/*<Button  type="primary"  style={{marginLeft:"120px"}}><Link to="/preplan">预案节点</Link></Button>*/}
                            {/*</div>*/}
                        {/*</Card>*/}
                    {/*</Col>*/}

                {/*</Row>*/}
            </div>
        )
    }
}


export default Main;