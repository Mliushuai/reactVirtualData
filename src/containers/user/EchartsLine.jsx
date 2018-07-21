import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/gauge'
// 标题插件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';



class EcharrtLine extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let myChart = echarts.init(this.refs.line);
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        });
    }
    render() {
        console.log(this.props,"//////")
        return(
            <div ref="line" style={{width: "100%", height: 200}}></div>
        )
    }
}
export default EcharrtLine