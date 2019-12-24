const webpack=require('webpack');
const path=require('path');
const htmlWepackPlugin=require('html-webpack-plugin'); 
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//读取文件路径的方法
const utils=require('./utils');
//把css压缩提取出来
const miniCss=require('mini-css-extract-plugin');
module.exports={
    mode:process.env.NODE_ENV,
    entry:{
        app:path.join(__dirname,'../src/main.js'),
    },
    output:{
        path:path.join(__dirname,'./../dist'),
        filename:'[name].js',
    },
    resolve: {
        alias:{
            'vue$':'vue/dist/vue.esm.js',//配置别名 确保webpack可以找到.vue文件,
             '@':utils.reslove('src/components/')
         },
        extensions: ['.js', '.jsx','.json']
    },
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.js$/,
                use:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                  {
                     loader:process.env.NODE_ENV === 'production' ? miniCss.loader:'style-loader', //代替style-loader
                     options:process.env.NODE_ENV === 'production'? {
                         publicPath:'./../../'
                     }:{}
                  },
                  {
                   loader:'css-loader'
                  },
                  {
                   loader:'postcss-loader',
                   options:{
                      ident:'postcss',
                      plugins:[
                        require('postcss-cssnext')()
                      ]
                    }
                  }
               ]
            },
            //必须下载file-loader
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options:{
                  esModule: false,
                  limit:100, //小于10000转成base24
                  name:'[name].[hash:7].[ext]',
                  outputPath:'static/image'
              }
            },
            {
              test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options:{
                esModule: false,
                limit:100, 
                name:'[name].[hash:7].[ext]',
                outputPath:'static/media'
              }
            },
            {
             test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
             loader: 'url-loader',
             options:{
               esModule: false,
               limit:100, 
               name:'[name].[hash:7].[ext]',
               outputPath:'static/fonts'
             }
            },

        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new htmlWepackPlugin({
            template:'./index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        }),
         //这里引入的插件页面无需再import
         new webpack.ProvidePlugin({
            $:'jquery'
        }) 
    ]
}