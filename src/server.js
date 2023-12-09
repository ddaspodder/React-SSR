import path from "path";
import React from "react";
import { renderToString } from "react-dom/server";
import StaticRouter from "./router/StaticRouter";
import App from "./App";
import serialize from "serialize-javascript";
import express from "express";
import webpack from "webpack";
import wpDevMiddleware from "webpack-dev-middleware";
// import wpHotMiddleware from "webpack-hot-middleware";
import webpackDevClientConfig from "../webpack.config/webpack.dev.client.config";
import { filterRoutes } from "./router/Routes";

const app = express();

let compiler;

if (process.env.NODE_ENV === "development") {
  compiler = webpack(webpackDevClientConfig);
  app.use(wpDevMiddleware(compiler));
  //webpack hot middleware and fast refresh dosent work with server refresh
  //app.use(wpHotMiddleware(compiler));
}

app.use(express.static("dist"));

app.get("*", async (req, res, next) => {
  try {
    const { activeRoute, activeMatch } = filterRoutes(
      req.path
    );

    if (!activeMatch.pathname)
      throw new Error("Page not found");

    let data = {};
    if (activeRoute.loader)
      data = await activeRoute.loader(
        activeMatch.params,
        req.query
      );

    if (process.env.NODE_ENV === "development") {
      const filename = path.join(
        compiler.outputPath,
        "template.html"
      );

      compiler.outputFileSystem.readFile(
        filename,
        "utf-8",
        (err, content) => {
          if (err) {
            return next(err);
          }

          const html = content
            .replace(
              `  <script id="inject-data"></script>`,
              `<script id="inject-data">
              window.__InitialData__ = ${serialize(data)}
            </script>`
            )
            .replace(
              `<div id="root"></div>`,
              `<div id="root">${renderToString(
                <StaticRouter
                  location={req.url}
                  context={data}
                >
                  <App />
                </StaticRouter>
              )}</div>`
            );
          return res.status(200).send(html);
        }
      );
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      const filename = path.join(
        compiler.outputPath,
        "template.html"
      );

      compiler.outputFileSystem.readFile(
        filename,
        "utf-8",
        (err, content) => {
          if (err) {
            return res
              .status(500)
              .send("Something went wrong");
          }
          const html = content.replace(
            `<div id="root"></div>`,
            `<div id="root">${renderToString(
              <StaticRouter location={req.url} context={{}}>
                <App />
              </StaticRouter>
            )}</div>`
          );
          return res.status(404).send(html);
        }
      );
    }
  }
});

app.use((error, req, res, next) => {
  return res.status(500).send("Something went wrong");
});

// app.use((error, req, res, next) => {
//   const html = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//         <link href="/main.css" rel="stylesheet" />
//         <script defer src='/client-bundle.js'></script>
//     </head>
//     <body>
//     <div id="root">${renderToString(
//       <StaticRouter location={req.url} context={{}}>
//         <App />
//       </StaticRouter>
//     )}</div>
//     </body>
//     </html>`;
//   res.status(404).send(html);
// });

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running");
  console.log("NODE_ENV", process.env.NODE_ENV);
});
