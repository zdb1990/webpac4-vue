const webpack=require('webpack');
const merge=require('webpack-merge');
const baseWebpackConfig=require('./webpack-base');
const path=require('path');
//把css压缩提取出来
const miniCss=require('mini-css-extract-plugin');
//打包清除dist目录
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
//雪碧图
const webpackSprites=require('webpack-spritesmith');
//拷贝文件备用
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports=merge(baseWebpackConfig,{
    devtool:'source-map',
    optimization:{
        minimize:true,//压缩js代码
        //分割业务代码第三方依赖
        splitChunks:{
          /*指定打包范围 
            all同步和异步代码拆分 
            async异步代码拆分
            initial 也会同时打包同步和异步，
            但是异步内部的引入不再考虑，直接打包在一起
            ，会将vue和b的内容直接打包成chunk,
          */
          chunks:'initial',
          //定义文件名连接符
          automaticNameDelimiter:'.'
        },
        //第三方依赖提取出来 不提取会影响app.js缓存
         runtimeChunk:{
           name:'manifest'
        }
    },
    output:{
      path:path.join(__dirname,'../dist'),
      //chunkhash根据不同的入口文件解析建立对应的chunk只要不该公用代码库保证hash不会受影响有助于浏览器依赖缓存
      filename:path.posix.join('static','js/[name].[chunkhash].js'),
    },
    module:{
      rules:[
      ]
    },
    plugins:[
      //在业务组件拿到环境变量
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: '"production"' } 
      }),
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: 'copy-static',
          ignore: ['.*']
        }
      ]),
      //将png压缩为雪碧图
      // new webpackSprites({
      //   src:{
      //     //图片的来源文件夹
      //     cwd:path.join(__dirname,'../static/img'),
      //     //处理什么类型的图片
      //     glob:'*.png'
      //   },
      //   target:{
      //     //打包到哪里
      //     image:path.join(__dirname,'../dist/static/image/sprite.png'),
      //     css:path.join(__dirname,'../dist/static/css/sprite.css')
      //   },
      //   apiOptions:{
      //     cssImageRef:"../dist/static/image/sprite.png"
      //   }
      // }),
      new miniCss({
        filename:'static/css/[name].min.css'
      })
    ]
})