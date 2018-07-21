import Tool from './xhr/index';
class showModelSeverce {

    /**
     * 登录界面
     * @param {username} 用户名
     * @param {password} 密码
     * @return {登录信息}
     */
    showModel(params, success, fail) {
        return Tool.get('/approval/'+params.approvalId+'/detail',params, success, fail)
    }
    testSource(params, success, fail){
        return Tool.get('/new/materials',params, success, fail)
    }
}

// 实例化再导出
export default new showModelSeverce();
