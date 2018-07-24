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
            title: {
                text: '油位变化表',
                // subtext: '纯属虚构'
            },
            // backgroundColor:'#2d2d31',
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['油位线','线性','警戒线']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {type: ['line', 'bar']},
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis:  {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} °C'
                }
            },
            series: [
                {
                    name:'线性',
                    type:'line',
                    data:[94, 88, 82, 76, 70, 64, 58],
                    // markPoint: {
                    //     data: [
                    //         {name: '周最低', value: -2, xAxis: 1, yAxis: 0}
                    //     ]
                    // },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'},
                    //         [{
                    //             symbol: 'none',
                    //             x: '90%',
                    //             yAxis: 'max'
                    //         }, {
                    //             symbol: 'circle',
                    //             label: {
                    //                 normal: {
                    //                     position: 'start',
                    //                     formatter: '最大值'
                    //                 }
                    //             },
                    //             type: 'max',
                    //             name: '最高点'
                    //         }]
                    //     ]
                    // }
                },
                {
                    name:'油位线',
                    type:'line',
                    data:[98, 92, 92, 86, 75, 63, 58],
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'},
                    //         {type: 'min', name: '最小值'}
                    //     ]
                    // },
                    // markLine: {
                    //     data: [
                    //         {type: 'average', name: '平均值'}
                    //     ]
                    // }
                },
                {
                    name:'警戒线',
                    type:'line',
                    data:[60, 60, 60, 60, 60, 60, 60],
                    // markPoint: {
                    //     data: [
                    //         {type: 'max', name: '最大值'},
                    //         {type: 'min', name: '最小值'}
                    //     ]
                    // },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                },

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




