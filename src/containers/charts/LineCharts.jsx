import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
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
import {Form, Row, Col, Select, DatePicker} from 'antd';
import {Bcrumb} from '../../component/bcrumb/bcrumb';

const Option = Select.Option;
const FormItem = Form.Item;
const {MonthPicker, RangePicker, WeekPicker} = DatePicker;

/* 以类的方式创建一个组件 */
class LineCharts extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let myChart = echarts.init(this.refs.line);
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['油位变化1', '油位变化2', '油位变化3', '油位变化4', '油位变化5']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '油位变化1',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '油位变化2',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '油位变化3',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '油位变化4',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '油位变化5',
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        });
    }

    render() {
        console.log(this.props, "//////")
        return (
            <div ref="line" style={{width: "100%", height: 400}}></div>
        )
    }
}

export default LineCharts




