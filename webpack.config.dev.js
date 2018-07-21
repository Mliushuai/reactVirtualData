var path = require('path'); // node内置path模块
var webpack = require('webpack'); // webpack打包工具
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length});
// var bundleConfig = require("./antd/dist/bundle-config.json");

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 分析包体依赖

// 定义地址
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var APP_FILE = path.resolve(APP_PATH, 'app'); //根目录文件app.jsx地址
var BUILD_PATH = path.resolve(ROOT_PATH, '/antd/dist'); // 发布文件所存放的目录

module.exports = {

    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'webpack-hot-middleware/client',
            APP_FILE
        ]
    },
    output: {
        publicPath: '/antd/dist/', //编译好的文件，在服务器的路径,这是静态资源引用路径
        path: BUILD_PATH, //发布文件地址
        filename: '[name].js', //编译后的文件名字
        chunkFilename: '[name].[chunkhash:5].min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['happypack/loader?id=js'],
            include: [APP_PATH]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['happypack/loader?id=css'],
            include: [APP_PATH]
        }, {
            test: /\.less$/, // 去掉exclude: /^node_modules$/和include: [APP_PATH]是为了babel-plugin-import按需加载antd资源
            use: ['happypack/loader?id=less']
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /node_modules/,
            use: ['file-loader?name=[name].[ext]'],
            include: [APP_PATH]
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /node_modules/,
            use: ['url-loader?limit=8192&name=images/[hash:8].[name].[ext]'],
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            include: [APP_PATH]
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: ['happypack/loader?id=jsx'],
            include: [APP_PATH]
        }]
    },
    devServer:{
           hot:true,
        inline:true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development') //定义编译环境。 process.argv：当前进程的命令行参数数组。process.env：指向当前shell的环境变量，比如process.env.HOME。
            }
        }),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: '../index.html', //生成的html存放路径，相对于 path
            template: './src/template/index.html', //html模板路径
            // bundleName: bundleConfig.bundle.js,
            favicon: './favicon.ico',
            hash: false,
        }),
        new ExtractTextPlugin('[name].css'),
        // new BundleAnalyzerPlugin(),
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new webpack.NoEmitOnErrorsPlugin(), // 即使有错误也不中断运行
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            // verboseWhenProfiling:true,
            verbose: process.env.HAPPY_VERBOSE === '1',
            loaders: ['react-hot-loader', 'babel-loader?cacheDirectory'],
            // debug:true
        }),
        new HappyPack({
            id: 'jsx',
            threadPool: happyThreadPool,
            // verboseWhenProfiling:true,
            verbose: process.env.HAPPY_VERBOSE === '1',
            loaders: ['react-hot-loader', 'jsx-loader', 'babel-loader?cacheDirectory'],
            // debug:true
        }),
        new HappyPack({
            id: 'css',
            threadPool: happyThreadPool,
            // verboseWhenProfiling:true,
            verbose: process.env.HAPPY_VERBOSE === '1',
            loaders: ['style-loader', 'css-loader', 'postcss-loader'],
            // debug:true
        }),
        new HappyPack({
            id: 'less',
            threadPool: happyThreadPool,
            // verboseWhenProfiling:true,
            verbose: process.env.HAPPY_VERBOSE === '1',
            loaders: [ 'style-loader', 'css-loader', 'postcss-loader', 'less-loader' ],
            // debug:true
        }),
        // new webpack.DllReferencePlugin({
        //     context: __dirname,
        //     manifest: require('./antd/dist/bundle.manifest.json')
        // })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css'], //后缀名自动补全
    }
};
if (module.hot) {
    module.hot.accept();
}