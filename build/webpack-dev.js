const webpack=require('webpack');
const merge=require('webpack-merge');
//引入base默认的配置
const baseWebpackConfig=require('./webpack-base');
module.exports=merge(baseWebpackConfig,{
    //生成source-map方便查找出错的位置
     devtool:'cheap-eval-source-map',
     devServer:{
         hot:true,
         //默认用谷歌浏览器打开
        //  open:'Google Chrome',
         open:true,
         port:5200,
         host:'10.1.6.137',
         overlay:true,
         proxy:{
             
         }
     },
     module:{
         rules:[
        ]
     },
     plugins:[
         //在业务组件拿到环境变量
        new webpack.DefinePlugin({
          'process.env': { NODE_ENV: '"development"' } 
        }),
         //热加载
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
     ]
})
console.log(process.env.NODE_ENV)