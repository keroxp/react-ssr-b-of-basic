import * as React from "react"
import {render} from "react-dom"
import {Index} from "../components";


window.addEventListener("DOMContentLoaded", () => {
  const dataDom = document.getElementById("hydration-data");
  const props = JSON.parse(dataDom.getAttribute("data-props"));
  render(
    <Index {...props} />, document.getElementById("root")
  );
});
