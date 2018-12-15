import * as React from "react"
import {hydrate} from "react-dom"
import {Index} from "../components";

window.addEventListener("DOMContentLoaded", () => {
  const dataDom = document.getElementById("hydration-data");
  const props = JSON.parse(dataDom.getAttribute("data-props"));
  hydrate(
    <Index {...props} />, document.getElementById("root")
  );
});
