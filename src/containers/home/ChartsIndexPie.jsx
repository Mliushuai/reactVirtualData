/**
 *
 */

import React, {Component} from 'react';
//引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
import 'echarts/theme/dark'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
class ChartsIndexPie extends Component {
    constructor(props) {
        super(props);
        let colors=['#393939','#f5b031','#fad797','#59ccf7','#c3b4df'];
    }

    componentDidMount() {
        let myChart = echarts.init(this.refs.line);
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color:['#006e6b','#fe849d','#83d0a6','#fdc854','#10a3e7'],
            legend: {
                show:true,
                orient: 'vertical',
                x: 'left',
                y:'middle',
                data:['设备智能检测','站内外环境监测','现场作业监控','单人操作监控','辅助调控']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '60%',
                    center: ['60%', '50%'],
                    data:[
                        {value:635, name:'设备智能检测'},
                        {value:310, name:'站内外环境监测'},
                        {value:234, name:'现场作业监控'},
                        {value:135, name:'单人操作监控'},
                        {value:548, name:'辅助调控'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]        });
    }
    render() {
        return(
            <div ref="line" style={{width: "90%", height:"70%"}}></div>
        )
    }
}
export default ChartsIndexPie