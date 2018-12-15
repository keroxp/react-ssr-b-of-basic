import * as React from "react"
import {render} from "react-dom"
import {Index} from "../components";
import {getClickCount} from "./api";

window.addEventListener("DOMContentLoaded", async () => {
  const {count} = await getClickCount();
  render(
    <Index title={"Client Side Rendering"} count={count}/>, document.getElementById("root")
  );
});
