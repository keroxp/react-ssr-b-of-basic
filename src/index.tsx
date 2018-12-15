import * as express from "express";
import * as React from "react"
import {renderToString} from "react-dom/server"
import {Layout} from "./components/Layout";
import {Index} from "./components";

const app = express();
let clickCount = 0;
app.set("view engine", "pug");
app.set("views", "pug");
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send(renderToString(
    <Layout title={"SSR "}>
      <h1>React SSR B of Basic</h1>
      <ul>
        <li>
          <a href={"/render"}>Client Side Rendering</a>
        </li>
        <li>
          <a href={"/hydrate"}>Server Side Rendering</a>
        </li>
        <li>
          <a href={"/hybrid"}>Hybrid Rendering</a>
        </li>
      </ul>
    </Layout>
    )
  )
});
app.get("/render", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>${"Client Side Rendering"}</title>
      </head>
      <body>
        <div id="root"></div>
        <div>
           クライアントサイドレンダリングは、VDOMの初期propsの取得もクライアントで行い、
           サーバーはbodyが空のhtmlをサーブするだけという構成です。
        </div>
        <script src="/dist/render.js"></script>       
      </body>
    </html>
  `);
});
app.get("/hydrate", (req, res) => {
  const title = "Server Side Rendering";
  res.send(renderToString(
    <Layout title={title}>
      <div id={"hydration-data"} data-props={JSON.stringify({title, count: clickCount})}></div>
      <div id={"root"}>
        <Index title={title} count={clickCount}/>
      </div>
      <div>
        <p>サーバーサイドレンダリングは、Reactのコンポーネントをサーバーサイドで解釈し、
          html文字列に書き出してサーブする構成です。</p>
        <p>VDOMの初期propsの用意もサーバーで行うため、クライアント側でのajax読み込みを省くことができます。</p>
        <p>クライアントサイドでもReactアプリケーションとしてVDOMを引き継ぐ場合、ReactDOM.hydrate()を使います。</p>
        <p>クライアントサイドでhydrateするために、ルートコンポーネントのpropsも同時にhtmlとして送る必要があります。</p>
        <p>一見もっとも理想的な構成に見えますが、クライアントとサーバーで全く同じコンポーネントをレンダリングするというのは予想以上に困難なので、実は使い所が難しい技術です。</p>
      </div>
      <script src={"/dist/hydrate.js"}></script>
    </Layout>
  ))
});
app.get("/hybrid", (req, res) => {
  const title = "Hybrid Rendering";
  res.send(renderToString(
    <Layout title={title}>
      <div id={"hydration-data"} data-props={JSON.stringify({title, count: clickCount})}></div>
      <div id={"root"}>
        <Index title={title} count={clickCount}/>
      </div>
      <div>
        <p>ハイブリッドレンダリングは、CSRとSSRの良いところを合わせた使い方です。ちなみに筆者命名なのでそういう言葉があるかは知りません。</p>
        <p>基本的にCSRでrenderを使うのですが、SSRと同様ルートコンポーネントのpropsをhtmlでサーブするため、TTI（Time to
          interactive）までの時間がCSRよりも若干短くなるという利点があります。</p>
      </div>
      <script src={"/dist/hybrid.js"}></script>
    </Layout>
  ))
});
app.get("/api/click", (req, res) => {
  res.json({
    count: clickCount
  })
});
app.post("/api/click", (req, res) => {
  res.json({
    count: ++clickCount
  })
});
app.listen(8020);