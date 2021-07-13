module.exports = {
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: false, //是否开启eslint
    devServer: {
        open: true, //是否自动弹出浏览器页面
        host: "localhost",
        port: '8081',
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/api': {
                target: 'http://localhost:8000/api/', //API服务器的地址
                ws: true,  //代理websockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            }
        }
    },
    // plugins: {
    //     // 兼容浏览器，添加前缀
    //     autoprefixer: {
    //         overrideBrowserslist: [
    //             "Android 4.1",
    //             "iOS 7.1",
    //             "Chrome > 31",
    //             "ff > 31",
    //             "ie >= 8",
    //             "last 10 versions", // 所有主流浏览器最近10版本用
    //         ],
    //         grid: true,
    //     },
    //     "postcss-pxtorem": {
    //         rootValue: 16, //结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
    //         propList: ["*"], //是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
    //         unitPrecision: 5, //保留rem小数点多少位
    //         //selectorBlackList: ['.radius'],  //则是一个对css选择器进行过滤的数组，比如你设置为['fs']，那例如fs-xl类名，里面有关px的样式将不被转换，这里也支持正则写法。
    //         replace: true, //这个真不知到干嘛用的。有知道的告诉我一下
    //         mediaQuery: false, //媒体查询( @media screen 之类的)中不生效
    //         minPixelValue: 12, //px小于12的不会被转换
    //     },
    // }

}
