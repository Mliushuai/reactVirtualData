import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable'
import "./css/chartsStyle.css"
import LongBan from '../image/img2.jpg'

const longBan = {
    width: "100%",
    height: "64px",
    backgroundImage: `url(${LongBan})`,
    borderBottom: "1px solid #d6e1e4",
    // backgroundRepeat:"repeat-x",
    // backgroundSize:"100%"

};
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';

// 引入饼图
import 'echarts/lib/chart/pie';
import 'echarts/theme/dark'

// 引入柱状图
import 'echarts/lib/chart/bar';

//引入折线图
import 'echarts/lib/chart/line'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import {Form, Row, Col, Select, DatePicker, Button} from 'antd';
import {Bcrumb} from '../../component/bcrumb/bcrumb';

const Option = Select.Option;
const FormItem = Form.Item;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

/* 以类的方式创建一个组件 */
class Mains extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    getFields = () => {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        const children = [];
        children.push(
            <Col xl={8} lg={24} style={{textAlign: 'right', marginTop: "16px"}} key="btn1">
                <FormItem
                    {...formItemLayout}
                    label="时间段:"
                >
                    <RangePicker onChange={this.onChange}
                                 style={{width: "400px"}}
                    />
                </FormItem>
            </Col>
        )

        return children;
    };
    pie = () => {
        function genData(count) {
            let nameList = [
                '1站点', '2站点', '3站点', '4站点', '5站点', '6站点', '7站点',
            ];
            let thingList = [
                '1事件类型', '2事件类型', '3事件类型', '4事件类型', '5事件类型', '6事件类型', '7事件类型'
            ]
            let legendData = [];
            let seriesData = [];
            let selected = {};
            for (let i = 0; i < 7; i++) {
                name = nameList[i]
                legendData.push(name);
                seriesData.push({
                    name: name,
                    value: Math.round(Math.random() * 100000)
                });
                selected[name] = i < 7;
            }

            return {
                legendData: legendData,
                seriesData: seriesData,
                selected: selected
            };

        }

        // genData(50)
        let data = genData(6);
        let myChart = echarts.init(this.refs.line);
        myChart.setOption({
            title: {
                text: '',
                subtext: '',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: data.legendData,
                selected: data.selected
            },
            series: [
                {
                    name: '事件',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: data.seriesData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });


    }
    line = () => {
        let myChart = echarts.init(this.refs.lines);
        myChart.setOption({
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['1事件类型', '2事件类型', '3事件类型', '4事件类型', '5事件类型']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['1站点', '2站点', '3站点', '4站点', '5站点', '6站点', '7站点']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '1事件类型',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '2事件类型',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '3事件类型',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '4事件类型',
                    type: 'line',
                    stack: '总量',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '5事件类型',
                    type: 'line',
                    stack: '总量',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        });
    }
    bar = () => {
        let posList = [
            '1事件类型', '2事件类型', '3事件类型', '4事件类型',
            '5事件类型',
            '6事件类型', '7事件类型',
        ];
        let app = {}
        app.configParameters = {
            rotate: {
                min: -90,
                max: 90
            },
            align: {
                options: {
                    left: 'left',
                    center: 'center',
                    right: 'right'
                }
            },
            verticalAlign: {
                options: {
                    top: 'top',
                    middle: 'middle',
                    bottom: 'bottom'
                }
            },
            position: {
                options: echarts.util.reduce(posList, function (map, pos) {
                    map[pos] = pos;
                    return map;
                }, {})
            },
            distance: {
                min: 0,
                max: 100
            }
        };

        app.config = {
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            onChange: function () {
                var labelOption = {
                    normal: {
                        rotate: app.config.rotate,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        position: app.config.position,
                        distance: app.config.distance
                    }
                };
                myChart.setOption({
                    series: [{
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }, {
                        label: labelOption
                    }]
                });
            }
        };


        let labelOption = {
            normal: {
                show: false,
                position: app.config.position,
                distance: app.config.distance,
                align: app.config.align,
                verticalAlign: app.config.verticalAlign,
                rotate: app.config.rotate,
                formatter: '{c}  {name|{a}}',
                fontSize: 16,
                rich: {
                    name: {
                        textBorderColor: '#fff'
                    }
                }
            }
        };
        let myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            color: ['#003366', '#006699', '#4cabce', '#e5323e', '#fff000'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['1事件类型', '2事件类型', '3事件类型', '4事件类型', '5事件类型']
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: ['1站点', '2站点', '3站点', '4站点', '5站点',]
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '1事件类型',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    data: [320, 332, 301, 334, 390]
                },
                {
                    name: '2事件类型',
                    type: 'bar',
                    label: labelOption,
                    data: [220, 182, 191, 234, 290]
                },
                {
                    name: '3事件类型',
                    type: 'bar',
                    label: labelOption,
                    data: [150, 232, 201, 154, 190]
                },
                {
                    name: '4事件类型',
                    type: 'bar',
                    label: labelOption,
                    data: [98, 77, 101, 99, 40]
                },
                {
                    name: '5事件类型',
                    type: 'bar',
                    label: labelOption,
                    data: [20, 77, 200, 99, 150]
                }
            ]
        });
    }

    componentDidMount() {
        this.pie()
        this.line()
        this.bar()
    }

    render() {
        return (
            <div>
                <div className="data-titles" style={longBan}>
                    <Form
                        onSubmit={this.handleSearch}
                    >
                        <Row>
                            {this.getFields()}
                        </Row>
                    </Form>
                </div>
                <div>
                    <div className="chartBox">·
                        <div ref="line" style={{width: 700, height: 400}}></div>
                        <div id="main" style={{width: 700, height: 400, marginLeft: 40}}></div>
                        <div ref="lines" style={{width: 700, height: 400}}></div>
                        <div className="data-min">
                            <div className="chart-min">
                                <div className="admin-min">
                                    <span>事件详情:</span>
                                    <span style={{color: "#71f20f"}}>查看</span>
                                </div>
                                <div className="admin-min">
                                    <span>数据分析报告:</span>
                                    <span style={{color: "#71f20f"}}>查看</span>
                                </div>
                            </div>
                            <div className="chartBut">
                                <div className="adcButton">输出当前报表</div>
                                <div className="adcButton">输出所有报表</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const Main = Form.create()(Mains);
export default Main




