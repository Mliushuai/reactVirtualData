import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {is, fromJS} from 'immutable';
import {Form, Input, Select, Row, Col, Card, Button, Modal, Radio, message, Tree} from 'antd';

const ButtonGroup = Button.Group;
import './style.css'
// 公共面包屑
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import EchartGauge from './EchartGauge'
import Backgrounds from '../image/img2.jpg';
import BackgroundImage from '../image/img3.jpg';
import LongBan from '../image/logBan.jpg'

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
/**
 * 北京图片引入
 * @type {{width: string, height: string, backgroundImage: string}}
 */
const sectionStyles = {
    width: "100%",
    height: "60px",
    backgroundImage: `url(${BackgroundImage})`,
borderBottom:"1px solid #d6e1e4"
};
const sectionStyle = {
    width: "100%",
    height: "80px",
    backgroundImage: `url(${Backgrounds})`,
    backgroundSize:"100% 100%",
    borderBottom:"1px solid #d6e1e4"
};


/**
 *
 * @type {[null,null]}
 */
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const tns = _tns || gData;
    const children = [];
    tns.push(
        {
            title: "一站点",
            key: "一站点",
            id: "1",
            children: [{title: "80点位", key: "80点位"}]
        }, {
            title: "二站点",
            key: "二站点",
            children: [{title: "30点位", key: "30点位"}]
        }
    );
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

const dataList = [];
const generateList = data => {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const key = node.key;
        dataList.push({key, title: key});
        if (node.children) {
            generateList(node.children, node.key);
        }
    }
};
generateList(gData);
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};
// 模拟数据
const columns = [{
    changeData: 0,
    key: "一站点",
    minArray: "小心火烛，注意山火",
    minPattern: "持续监测",
    code: "000001",
    explain: "",
    fireOut: "",
    levelType: "二级",
    location: "古翠路北山电站东南三号山林",
    meaterType: "火山警报",
    time: "2018-5-24 12:00",
    minVideoCode: "003",
    minNews: "短信",
    videoMusic: "",
    minVideo: "否",
    wodrkPepole: "张三",
    minVideoLive: "是",
    minWaring: "否",
    work: "一站点",
    workArray: "",
    workCode: "0003",
    workPosition: "80",
    workStat: "1",
    workState: "",
    workType: "扇形",
}, {
    changeData: 1,
    key: "二站点",
    minArray: "三十打更，小心火烛，注意山火",
    minPattern: "定时检测",
    code: "000001",
    explain: "",
    fireOut: "",
    levelType: "二级",
    location: "北山电站东南",
    meaterType: "火山警报",
    time: "2018-5-24 12:00",
    minVideoCode: "001",
    minNews: "系统消息",
    videoMusic: "",
    minVideo: "是",
    wodrkPepole: "李四",
    minVideoLive: "是",
    minWaring: "否",
    work: "二站点",
    workArray: "",
    workCode: "0003",
    workPosition: "30",
    workStat: "0",
    workState: "",
    workType: "扇形",
},
];

/* 以类的方式创建一个组件 */
class Mains extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: [],
            searchValue: "",
            autoExpandParent: true,
            saveButton: "add",
            visible: false,
            leftCardData: columns,
            nowData: [{
                minArray: "小心火烛，注意山火",
                minPattern: "持续监测",
                code: "000001",
                explain: "",
                fireOut: "",
                levelType: "二级",
                location: "古翠路北山电站东南三号山林",
                meaterType: "火山警报",
                time: "2018-5-24 12:00",
                minVideoCode: "003",
                minNews: "短信",
                videoMusic: "",
                minVideo: "否",
                wodrkPepole: "张三",
                minVideoLive: "是",
                minWaring: "否",
                work: "一站点",
                workArray: "",
                workCode: "0003",
                workPosition: "80",
                workStat: "1",
                workState: "",
                workType: "扇形",
            }]
        };
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };
    handleReset = () => {
        this.props.form.resetFields();
    };
    showModalAdd = () => {
        this.props.form.resetFields();
        this.setState({
            visible: true,
            saveButton: "add",
        });
    };
    showModalTest = () => {
        this.props.form.resetFields();
        this.state.nowData.map((item, index) => {
            this.props.form.setFields({
                workHome: {//站点
                    value: item.work,
                },
                minTypes: {//监测类型
                    value: item.workType
                },
                workCode: {//设备编号
                    value: item.workCode
                },
                minPrice: {//阈值
                    value: item.workPosition
                },
                minPattern: {//检测模式
                    value: item.minPattern
                },
                minArray: {//备注说明
                    value: item.minArray
                },
                minVideo: {//视频联动
                    value: item.minVideo
                },
                minVideoCode: {//视频编号
                    value: item.minVideoCode
                },
                minNews: {//消息通知
                    value: item.minNews
                },
                minPeople: {//人员
                    value: item.wodrkPepole
                },
                minVideoLive: {
                    value: item.minVideoLive
                },
                minWaring: {
                    value: item.minWaring
                }
            })
        })
        this.setState({
            visible: true,
            saveButton: "test",
        });
    }
    /**
     * 保存
     */
    submitSort = () => {
        let data = {
            work: this.props.form.getFieldsValue().workHome,
            workType: this.props.form.getFieldsValue().minTypes,
            workCode: this.props.form.getFieldsValue().workCode,
            workPosition: this.props.form.getFieldsValue().minPrice,
            minPattern: this.props.form.getFieldsValue().minPattern,
            minArray: this.props.form.getFieldsValue().minArray,
            minVideo: this.props.form.getFieldsValue().minVideo,
            minVideoCode: this.props.form.getFieldsValue().minVideoCode,
            minNews: this.props.form.getFieldsValue().minNews,
            wodrkPepole: this.props.form.getFieldsValue().minPeople,
            minVideoLive: this.props.form.getFieldsValue().minVideoLive,
            minWaring: this.props.form.getFieldsValue().minWaring,
            code: '000001',
            meaterType: "火山警报",
            time: "2018-5-24 12:00",
            workStat: "1",
            levelType: "二级",
            location: "1电站东南",
            explain: ""
        };
        this.state.leftCardData.push(data);
        message.success("添加成功！！");
        this.setState({
            visible: false,
        });
    };
    /**
     * submitChange 编辑编辑
     */
    submitChange = () => {
        this.state.nowData.map((item, index) => {
            this.state.nowData = [{
                work: this.props.form.getFieldsValue().workHome,
                workType: this.props.form.getFieldsValue().minTypes,
                workCode: this.props.form.getFieldsValue().workCode,
                workPosition: this.props.form.getFieldsValue().minPrice,
                minPattern: this.props.form.getFieldsValue().minPattern,
                minArray: this.props.form.getFieldsValue().minArray,
                minVideo: this.props.form.getFieldsValue().minVideo,
                minVideoCode: this.props.form.getFieldsValue().minVideoCode,
                minNews: this.props.form.getFieldsValue().minNews,
                wodrkPepole: this.props.form.getFieldsValue().minPeople,
                minVideoLive: this.props.form.getFieldsValue().minVideoLive,
                minWaring: this.props.form.getFieldsValue().minWaring,
                code: '000001',
                meaterType: "火山警报",
                time: "2018-5-24 12:00",
                workStat: "1",
                levelType: "二级",
                location: "1电站东南",
                explain: ""
            }];
        })
        this.setState({
            visible: false,
        });
    }

    /**
     * res = workStat
     * 1 已完成
     * 0 未完成
     * */
    showStatus = (res) => {
        if (res === "1") {
            return "已完成";
        } else if (res === "0") {
            return "未完成";
        }
    }

    /**
     *表单
     * */
    testForm() {
        const {getFieldDecorator} = this.props.form;
        const childernForm = []
        childernForm.push(
            <Form onSubmit={this.handleSubmit} key={1}>
                <div className="from-mind">
                    <div className="from-head">
                        <FormItem
                            label="站点"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator(`workHome`, {
                                rules: [{
                                    required: true,
                                    message: 'Input something!',
                                }],
                            })(
                                <Select style={{width: 170}} onChange={this.handleChange}>
                                    <Option value="一站点">一站点</Option>
                                    <Option value="二站点">二站点</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="监测类型："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minTypes', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <Select style={{width: 170}} onChange={this.handleChange}>
                                    <Option value="扇形">扇形</Option>
                                    <Option value="柱状">柱状</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="设备编号："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('workCode', {
                                rules: [{required: true, message: '请输入设备编号!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            label="阈值"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minPrice', {
                                rules: [{required: true, message: '请输入阈值!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            label="检测模式"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minPattern', {
                                rules: [{required: true, message: '请输入检测模式!'}],
                            })(
                                <Select style={{width: 170}}>
                                    <Option value="持续监测">持续监测</Option>
                                    <Option value="定时检测">定时检测</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="备注说明"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minArray', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <textarea cols="26" rows="2">

                            </textarea>
                            )}
                        </FormItem>
                    </div>
                    <div className="from-head">
                        <FormItem
                            label="视频联动"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minVideo', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <RadioGroup>
                                    <Radio value="是">是</Radio>
                                    <Radio value="否">否</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            label="视频编号"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minVideoCode', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <Input/>
                            )}
                        </FormItem>
                        <FormItem
                            label="消息通知"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minNews', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <RadioGroup onChange={this.onChange} style={{width: 270}}>
                                    <Radio value="短信">短信</Radio>
                                    <Radio value="Email">Email</Radio>
                                    <Radio value="系统消息">系统消息</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            label="人员"
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minPeople', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <Select style={{width: 170}} onChange={this.handleChange}>
                                    <Option value="张三">张三</Option>
                                    <Option value="李四">李四</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label="音频广播："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minVideoLive', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <RadioGroup onChange={this.onChange}>
                                    <Radio value="是">是</Radio>
                                    <Radio value="否">否</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                        <FormItem
                            label="警报："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 10}}
                        >
                            {getFieldDecorator('minWaring', {
                                rules: [{required: true, message: '请输入分类编码!'}],
                            })(
                                <RadioGroup onChange={this.onChange}>
                                    <Radio value="是">是</Radio>
                                    <Radio value="否">否</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </div>
                </div>
                <Button type="primary" onClick={this.state.saveButton === "add" ? this.submitSort : this.submitChange}
                        style={{marginLeft: "43%"}}>
                    保存提交
                </Button>
            </Form>
        )
        return childernForm
    }

    /**
     * 选择 对应刷新
     * @param item:选择的KEY值
     */
    handleOpen = (item) => {
        this.state.leftCardData.map((items, index) => {
            if (item == items.key) {
                let nodeDate = this.state.leftCardData[items.changeData]
                this.setState({
                    nowData: [nodeDate]
                })
            }
        })
        this.setState({
            visible: false,
        });
    };
    /**
     * 加载完整结构
     * @param expandedKeys
     */
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    onChange = e => {
        const value = e.target.value;
        const expandedKeys = dataList
            .map(item => {
                if (item.title.indexOf(value) > -1) {
                    return getParentKey(item.key, gData);
                }
                return null;
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true
        });
    };

    render() {
        console.log(this.props,"this.propsthis.props")
        const {nowData} = this.state;
        const minLayout = {
            xs: {span: 24},
            sm: {span: 24},
            md: {span: 24},
            lg: {span: 10},
            xl: {span: 10}
        };
        const {searchValue, expandedKeys, autoExpandParent} = this.state;
        const loop = data =>
            data.map(item => {
                const index = item.title.indexOf(searchValue);
                const beforeStr = item.title.substr(0, index);
                const afterStr = item.title.substr(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
              {beforeStr}
                            <span style={{color: "#f50"}}>{searchValue}</span>
                            {afterStr}
            </span>
                    ) : (
                        <span>{item.title}</span>
                    );
                if (item.children) {
                    return (
                        <TreeNode key={item.key} title={title}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode key={item.key} title={title}/>;
            });
        return (
            <div style={{width: "100%", height: "800px", backgroundColor: "#fff"}}>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6}>
                            <div style={sectionStyles}>
                                <h3 style={{marginLeft:14,paddingTop:14}}>点位列表</h3>
                            </div>
                        <div style={{width:"100%",height:680,overflow:"auto"}}>
                            <Search
                                style={{marginBottom: 8,width:"90%",marginLeft:"4%",marginTop:10}}
                                placeholder="Search"
                                onChange={this.onChange}
                            />
                            <Tree
                                onExpand={this.onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                onSelect={this.handleOpen}
                            >
                                {loop(gData)}
                            </Tree>
                            <div className="add-buts">
                                <Button type="primary" size="large" onClick={this.showModalAdd}>新增</Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18}>
                            <div className="test-mins">
                                <div style={sectionStyle}>
                                </div>
                                <div>
                                    {this.state.nowData.map((item, index) => {
                                        return (
                                            <div key={index}>
                                                <Col {...minLayout} style={{marginRight: 40,marginTop:40,marginLeft:40}}>
                                                    <div>
                                                        <img width="100%" src={require("../../public/index.jpg")}
                                                             alt=""/>
                                                        <h3><span>{item.work}：{item.location}油位监测点</span></h3>
                                                        <h3><span>视频编号：</span><span>{item.minVideoCode}</span></h3>
                                                        <h3><span>设备类型：</span><span>枪机</span></h3>
                                                        <h3><span>云台预设：</span><span>已预设</span></h3>
                                                        <h3><span>关联视频：</span><span>{item.minVideo}</span></h3>
                                                        <h3><span>说明：</span><span>{item.minArray}</span></h3>
                                                    </div>
                                                </Col>
                                                <Col  {...minLayout} style={{marginRight: 40,marginTop:40}}>
                                                    <div>
                                                        <EchartGauge
                                                            min={0}
                                                            max={100}
                                                            xLength={10}
                                                            GaugeSize={100}
                                                        />
                                                    </div>
                                                    <h3><span>检测设备类型：</span><span>{item.workType}设备类型</span></h3>
                                                    <h3><span>量程：</span><span>0-{item.workPosition}</span></h3>
                                                    <h3><span>阈值设置：</span><span>&lt;{item.workPosition}</span></h3>
                                                </Col>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="join-but">
                                <Button
                                    type="primary"
                                    onClick={this.showModalTest}>编辑
                                </Button>
                            </div>
                            <Modal
                                title="编辑"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                width={900}
                                bodyStyle={{height: "500px"}}
                                onCancel={this.handleCancel}
                                footer={null}
                            >
                                {this.testForm()}

                            </Modal>
                            <Modal
                                title="编辑"
                                visible={this.state.visible}
                                onOk={this.handleOk}
                                width={900}
                                bodyStyle={{height: "500px"}}
                                onCancel={this.handleCancel}
                                footer={null}
                            >
                                {this.testForm()}

                            </Modal>

                    </Col>

                </Row>

            </div>

        )
            ;
    }
}

const Main = Form.create()(Mains)
export default Main;


