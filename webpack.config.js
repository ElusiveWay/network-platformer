const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
       contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: require.resolve('raw-loader')
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
      {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
      },
      {
        type: 'javascript/auto',
        test: /\.(png|jpe?g|gif|json)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  }
};