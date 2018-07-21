//
// import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
// import { connect } from 'react-redux';
// import { is, fromJS } from 'immutable';
//
// /* 以类的方式创建一个组件 */
// class Main extends Component {
//     constructor(props) {
//     	super(props);
//     }
//     shouldComponentUpdate(nextProps, nextState) {
//         return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
//     }
// 	render() {
// 		return (
// 		<div className="general-container">

// 			<FormItem
// 				label="监测类型："
// 				labelCol={{span: 6}}
// 				wrapperCol={{span: 10}}
// 			>
//                 {getFieldDecorator('minCode', {
//                     rules: [{required: true, message: '请输入分类编码!'}],
//                 })(
// 					<Input/>
//                 )}
// 			</FormItem>
// 			<FormItem
// 				label="设备编号："
// 				labelCol={{span: 6}}
// 				wrapperCol={{span: 10}}
// 			>
//                 {getFieldDecorator('minCode', {
//                     rules: [{required: true, message: '请输入分类编码!'}],
//                 })(
// 					<Input/>
//                 )}
// 			</FormItem>
// 			<FormItem
// 				label="阈值"
// 				labelCol={{span: 6}}
// 				wrapperCol={{span: 10}}
// 			>
//                 {getFieldDecorator('minCode', {
//                     rules: [{required: true, message: '请输入分类编码!'}],
//                 })(
// 					<Input/>
//                 )}
// 			</FormItem>
// 			<FormItem
// 				label="阈值"
// 				labelCol={{span: 6}}
// 				wrapperCol={{span: 10}}
// 			>
//                 {getFieldDecorator('minCode', {
//                     rules: [{required: true, message: '请输入分类编码!'}],
//                 })(
// 					<Input/>
//                 )}
// 			</FormItem>
// 			<FormItem
// 				label="备注说明"
// 				labelCol={{span: 6}}
// 				wrapperCol={{span: 10}}
// 			>
//                 {getFieldDecorator('minCode', {
//                     rules: [{required: true, message: '请输入分类编码!'}],
//                 })(
// 					<Input/>
//                 )}
// 			</FormItem>
// 		</div>
//             <div className="from-head">
//             <FormItem
//         label="视频联动"
//         labelCol={{span: 6}}
//         wrapperCol={{span: 10}}
//     >
//         {getFieldDecorator('minVideo', {
//             rules: [{required: true, message: '请输入分类编码!'}],
//         })(
// 			<RadioGroup onChange={this.onChange} >
// 				<Radio value={1}>是</Radio>
// 				<Radio value={2}>否</Radio>
// 			</RadioGroup>
//         )}
//     </FormItem>
// 		<FormItem
// 			label="视频编号"
// 			labelCol={{span: 6}}
// 			wrapperCol={{span: 10}}
// 		>
//             {getFieldDecorator('minVideo', {
//                 rules: [{required: true, message: '请输入分类编码!'}],
//             })(
// 				<Input/>
//             )}
// 		</FormItem>
// 		<FormItem
// 			label="消息通知"
// 			labelCol={{span: 6}}
// 			wrapperCol={{span: 10}}
// 		>
//             {getFieldDecorator('minVideo', {
//                 rules: [{required: true, message: '请输入分类编码!'}],
//             })(
// 				<RadioGroup onChange={this.onChange}  style={{width:270}}>
// 					<Radio value={1}>短信</Radio>
// 					<Radio value={2}>Email</Radio>
// 					<Radio value={3}>系统消息</Radio>
// 				</RadioGroup>
//             )}
// 		</FormItem>
// 		<FormItem
// 			label="人  员  "
// 			labelCol={{span: 6}}
// 			wrapperCol={{span: 10}}
// 		>
//             {getFieldDecorator('minVideo', {
//                 rules: [{required: true, message: '请输入分类编码!'}],
//             })(
// 				<Input/>
//             )}
// 		</FormItem>
// 		<FormItem
// 			label="音频广播："
// 			labelCol={{span: 6}}
// 			wrapperCol={{span: 10}}
// 		>
//             {getFieldDecorator('minVideo', {
//                 rules: [{required: true, message: '请输入分类编码!'}],
//             })(
// 				<RadioGroup onChange={this.onChange} >
// 					<Radio value={1}>是</Radio>
// 					<Radio value={2}>否</Radio>
// 				</RadioGroup>
//             )}
// 		</FormItem>
// 		<FormItem
// 			label="警报："
// 			labelCol={{span: 6}}
// 			wrapperCol={{span: 10}}
// 		>
//             {getFieldDecorator('minVideo', {
//                 rules: [{required: true, message: '请输入分类编码!'}],
//             })(
// 				<RadioGroup onChange={this.onChange} >
// 					<Radio value={1}>是</Radio>
// 					<Radio value={2}>否</Radio>
// 				</RadioGroup>
//             )}
// 		</FormItem>
//     </div>
//     </div>
// 		<Button type="primary" onClick={this.submitSort} style={{marginLeft:"43%"}}>
// 			保存提交
// 		</Button>
//     // </Form>
// 		</div>
// 		);
// 	}
// }
//
// export default Main;
//
//
