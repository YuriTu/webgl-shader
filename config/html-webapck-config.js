/* eslint-disable */
let fs = require('fs');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
    let htmlWebpackPluginConfig = [];
    if (false) {
        let fileDirs = fs.readdirSync('./template');
        fileDirs.forEach(dirname => {
            if (dirname == 'imgs') {
                return;
            }
            let htmlFiles = fs.readdirSync('./template/' + dirname);
            htmlFiles.forEach(htmlName => {
                if (!/.html$/.test(htmlName)) {
                    return;
                }
                // console.log('htmlName ----->>>', htmlName);
                var config = {
                    template: './template/' + dirname + '/' + htmlName,
                    filename: htmlName,
                    hash: true,
                    inject: true,
                    chunks: [dirname]
                };
                if (htmlName == 'jump.html') {
                    config.chunks = [];
                }
                htmlWebpackPluginConfig.push(new HtmlWebpackPlugin(config));
            });
        });
    } else {
        htmlWebpackPluginConfig.push(new HtmlWebpackPlugin({
            template: './public/index.html',
            // filename: htmlName,
            hash: true,
            inject: true,
            // chunks: [dirname]
        }));
    }

    return htmlWebpackPluginConfig;
};
