const Main = {
    target: 'http://192.168.2.8:12002', //目标网站
	// target: process.env.NODE_ENV !== 'production' ? 'http://admin.sosout.com' : 'http://192.168.2.8:8761', //目标网站
    name: 'Ant Design Admin',
    prefix: 'antdAdmin',
    footerText: 'Ant Design Admin 版权所有 © 2018 由 ASEIT 支持',
    logoSrc: 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
    logoText: '业务人员',
    needLogin: true,
	message: { // 提示信息
		usernameInput: '请输入用户名',
        usernameEng: '用户名必须是字母、数字或邮箱',
		passwordInput: '请输入密码',
		loginError: '用户名或者密码错误!'
	},
     localKey: { // 本地存储Key
		userToken: 'USER_AUTHORIZATION'
	},
     /**
	 * 只能输入英文
	 * 
	 * @param {any} str
	 * @returns
	 */
	checkEng(str) {
		var reg = new RegExp(/^[A-Za-z0-9]|\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
		return str && reg.test(str);
	},
    /**
	 * 参数格式化
	 * 
	 * @param {any} data
	 * @returns
	 */
	paramFormat(data) {
		let paramArr = [];
		let paramStr = '';
		for(let attr in data) {
			paramArr.push(attr + '=' + data[attr]);
		}
		paramStr = paramArr.join('&');
		return paramStr ? '?' + paramStr : paramStr;
	},
    /**
	 * 本地数据存储或读取
	 * 
	 * @param {any} key
	 * @param {any} value
	 * @returns
	 */
	localItem(key, value) {
		if(arguments.length == 1) {
			return localStorage.getItem(key) && localStorage.getItem(key) !== 'null' ? localStorage.getItem(key) : null;
		} else {
			return localStorage.setItem(key, value);
		}
	},
	/**
	 * 删除本地数据
	 * 
	 * @param {any} k
	 * @returns
	 */
	removeLocalItem(key) {
		if(arguments.length == 1) {
			return localStorage.removeItem(key);
		} else {
			return localStorage.clear();
		}
	}
};

export default Main;
