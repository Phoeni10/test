const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 4200
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Minesweeper'
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, 'src/bomb.png'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/fire.png'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/audio/click.mp3'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/audio/victory.mp3'),
          to: path.resolve(__dirname, 'dist')
        },
        {
          from: path.resolve(__dirname, 'src/audio/gameover.mp3'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
      
    }) 
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif|mp3)$/,
        use: ['file-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader','css-loader', 'sass-loader']
      }
    ]
  }
}