const name = require('./package.json').name
const path = require('path')
const PUBLIC_PATH = require('./package.json').publicPath

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	// experiments: {
	// asyncWebAssembly: true,
	// },
	publicPath: PUBLIC_PATH,
	outputDir: 'dist',
	assetsDir: 'static',
	lintOnSave: false,

	// 第三方依赖polyfill
	transpileDependencies: [],
	productionSourceMap: process.env.NODE_ENV === 'development',
	chainWebpack(config) {
		config.resolve.symlinks(true)
		config.plugins.delete('prefetch')
		config.when(process.env.NODE_ENV === 'production', config => {
			config.optimization.minimizer('terser').tap(arg => {
				arg[0].terserOptions.compress.drop_console = true
				return arg
			})
			// config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

			config.optimization.splitChunks({
				chunks: 'all', // 只处理异步 chunk，这里两个缓存组都另配了 chunks，那么就被无视了
				minSize: 2000, // 4. 允许新拆出 chunk 的最小体积 字节
				minChunks: 1, // 5. 拆分前被 chunk 公用的最小次数
				maxAsyncRequests: 30, // 7. 每个异步加载模块最多能被拆分的数量
				maxInitialRequests: 30, // 6. 每个入口和它的同步依赖最多能被拆分的数量
				cacheGroups: {
					vue: {
						name: 'chunk-vuejs',
						test: /[\\/]node_modules[\\/]_?vue(.*)/,
						priority: 30
					},
					nprogress: {
						name: 'chunk-nprogress',
						test: /[\\/]node_modules[\\/]_?nprogress(.*)/,
						priority: 30
					},
					echarts: {
						name: 'chunk-nprogress',
						test: /[\\/]node_modules[\\/]_?echarts(.*)/,
						priority: 30
					},
					tinymce: {
						name: 'chunk-nprogress',
						test: /[\\/]node_modules[\\/]_?tinymce(.*)/,
						priority: 30
					},
					elementUI: {
						name: 'chunk-elementUI', // split elementUI into a single package
						priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?element-plus(.*)/ // in order to adapt to cnpm
					},
					markdown: {
						name: 'chunk-markdown', // split elementUI into a single package
						priority: 30, // the weight needs to be larger than libs and app or it will be packaged into libs or app
						test: /[\\/]node_modules[\\/]_?markdown(.*)/ // in order to adapt to cnpm
					},
					micro: {
						name: 'chunk-micro',
						priority: 30,
						test: /[\\/]node_modules[\\/]_?@micro-zoe(.*)/
					},
					axios: {
						name: 'chunk-axios',
						priority: 30,
						test: /[\\/]node_modules[\\/]_?axios(.*)/
					},
					lodash: {
						name: 'chunk-lodash',
						priority: 30,
						test: /[\\/]node_modules[\\/]_?lodash(.*)/
					},
					fuse: {
						name: 'chunk-fuse',
						priority: 30,
						test: /[\\/]node_modules[\\/]_?fuse(.*)/
					},
					utils: {
						name: 'chunk-plugins',
						test: resolve('src/plugins'),
						minChunks: 3, //  minimum common number
						priority: 15,
						reuseExistingChunk: true
					},
					component: {
						name: 'chunk-component',
						test: resolve('src/components'), // can customize your rules
						minChunks: 3, //  minimum common number
						priority: 5,
						reuseExistingChunk: true
					},
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial' // only package third parties that are initially dependent
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true
					}
				}
			})
		})
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		module: {
			rules: [
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto'
				},
				// 自定义md解析器
				{
					test: /\.md$/,
					use: [
						{
							loader: 'vue-loader',
							options: {
								compilerOptions: {
									preserveWhitespace: false
								}
							}
						},
						{
							loader: path.resolve(__dirname, './src/md-loader/index.js')
						}
					]
				}
			],
			//解决Critical dependency: require function is used in a way in which dependencies cannot be statically extracted的问题
			unknownContextCritical: false,
			//解决the request of a dependency is an expression
			exprContextCritical: false
		},
		plugins: [
			// [
			// 	'import',
			// 	{
			// 		libraryName: '@icon-park/svg',
			// 		libraryDirectory: 'es/icons',
			// 		camel2DashComponentName: false
			// 	}
			// ]
		],

		entry: {
			app: './src/main.js'
		},
		output: {
			filename: `[name].[hash:6].file.js`,
			chunkFilename: `[name].[hash:8].chunk.js`,
			library: name,
			libraryTarget: 'umd', // 把微应用打包成 umd 库格式
			jsonpFunction: `webpackJsonp_${name}`,
			globalObject: 'window'
		},
		optimization: {}
	},
	devServer: {
		port: 6071,
		host: '0.0.0.0',
		injectClient: false,
		open: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
			'Access-Control-Allow-Headers':
				'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization'
		}
	}
}