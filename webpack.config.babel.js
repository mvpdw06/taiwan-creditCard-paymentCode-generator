import path from "path";
import webpack from "webpack";

const env = process.env.NODE_ENV || "development";
const isDevEnv = env === "development";

console.log(`Now is using ${env} mode run webpack settings!`);

const getDevtoolSetting = () => {
  return isDevEnv ? "eval" : "nosources-source-map";
};

const getPluginsSetting = () => {
  const plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env)
    })
  ];
  if (isDevEnv) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: false
        }
      })
    );
  }
  return plugins;
};

const getEntrySetting = () => {
  let entry;
  if (isDevEnv) {
    entry = [
      "react-hot-loader/patch",
      path.join(__dirname, "src/index"),
      "webpack-dev-server/client?http://localhost:9487",
      "webpack/hot/only-dev-server"
    ];
  } else {
    entry = [path.join(__dirname, "src/index")];
  }
  return entry;
};

const webpackConfig = {
  entry: getEntrySetting(),
  output: {
    path: path.join(__dirname, "output/assets"),
    filename: "app.js",
    publicPath: "/assets"
  },
  plugins: getPluginsSetting(),
  devtool: getDevtoolSetting(),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};

export default webpackConfig;
