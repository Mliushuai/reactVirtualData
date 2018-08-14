<Card style={{width: "100%", minHeight: 810}}>
    <div style={sectionStyles}>
        <h3 className="publicTitle">点位列表</h3>
    </div>
    <Search
        style={{marginBottom: 8, marginLeft: "20px", marginTop: "25px", width: "90%"}}
        placeholder="请输入要搜索的点位"
        onChange={this.onChange}
    />
    <Tree
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        style={{marginLeft: "16px"}}
    >
        {loop(gData)}
    </Tree>
</Card>




<Card style={{width: "100%", minHeight: 810}}>
<div style={sectionStyle}>
    <span className="publicChange">总体状态</span>
</div>
<div style={{width: "100%", height: "728px", marginTop: "80px"}}>
    <div style={{
        width: "50%",
        height: "363px",
        float: "left",
        borderBottom: "2px solid #eee",
        borderRight: "2px solid #eee"
    }}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#98d023",
                                        display: "block",
                                        float: "left",
                                        marginTop: "80px",
                                        marginLeft: "30%"
                                    }}></span>
        <p style={{
            color: "#000",
            fontSize: "50px",
            marginBottom: "0",
            marginTop: "100px",
            textAlign: "center"
        }}>
            {disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 1 + "条" : "暂无工票"}
        </p>
        <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
            待处理工票</p>
        <Link to='/onekey'>
            <Button style={{
                display: "block", margin: "0 auto",
                marginTop: "35px", width: "150px", height: "40px",
                backgroundColor: "#384042", color: "#fff"
            }}
                    onClick={()=>this.GoAction('onekey')}
            >进入</Button>
        </Link>
    </div>
    <div style={{
    width: "50%",
    height: "363px",
    float: "left",
    borderBottom: "2px solid #eee"
    }}>
    <span style={{
    width: "10px",
    height: "10px",
    backgroundColor: "#e410e7",
    display: "block",
    float: "left",
    marginTop: "80px",
    marginLeft: "30%"
    }}></span>
    <p style={{
        color: "#000",
        fontSize: "50px",
        marginBottom: "0",
        marginTop: "100px",
        textAlign: "center"
    }}>
        {disableds ? this.props.sourceNumber.numberSource3 === 0 ? "0条" : 1 + "条" : "暂无异常"}
    </p>
    <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
    环境异常</p>
    <Link to='/larum'>
        <Button style={{
            display: "block", margin: "0 auto",
            marginTop: "35px", width: "150px", height: "40px",
            backgroundColor: "#384042", color: "#fff"

        }}
                onClick={()=>this.GoAction('larum')}
        >进入</Button>
    </Link>
    </div>
    <div style={{
        width: "50%",
        height: "363px",
        float: "left",
        borderRight: "2px solid #eee"
    }}>
                                    <span style={{
                                        width: "10px",
                                        height: "10px",
                                        backgroundColor: "#f13283",
                                        display: "block",
                                        float: "left",
                                        marginTop: "80px",
                                        marginLeft: "30%"
                                    }}></span>
        <p style={{
            color: "#000",
            fontSize: "50px",
            marginBottom: "0",
            marginTop: "100px",
            textAlign: "center"
        }}>
            {disableds ? this.props.sourceNumber.numberSource2 === 0 ? "0条" : 0 + "条" : "暂无预警"}
        </p>
        <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
            预警信息</p>
        <Link to='/larum'>
            <Button style={{
                display: "block", margin: "0 auto",
                marginTop: "35px", width: "150px", height: "40px",
                backgroundColor: "#384042", color: "#fff"
            }}
                    onClick={()=>this.GoAction('larum')}
            >进入</Button>
        </Link>
    </div>
    <div style={{width: "50%", height: "363px", float: "left"}}>
    <span style={{
    width: "10px",
    height: "10px",
    backgroundColor: "#10a3e7",
    display: "block",
    float: "left",
    marginTop: "80px",
    marginLeft: "30%",
    float: "left"
    }}></span>
    <span style={{display: "block", margin: "0 auto", marginTop: "75px"}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        当前覆盖200个站点</span>
    <p style={{
    color: "#000",
    fontSize: "50px",
    marginBottom: "0",
    marginTop: "0px",
    textAlign: "center"
    }}>
    进行中
    </p>
    <p style={{fontSize: "20px", margin: "0", textAlign: "center", marginTop: "20px"}}>
        智能巡检</p>
    <Link to='/AIinspect'>
    <Button style={{
    display: "block", margin: "0 auto",
    marginTop: "35px", width: "150px", height: "40px",
    backgroundColor: "#384042", color: "#fff"
    }}
    onClick={()=>this.GoAction('AIinspect')}
    >进入</Button>
</Link>
</div>
</div>
</Card>