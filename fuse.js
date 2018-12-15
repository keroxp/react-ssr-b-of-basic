const {FuseBox} = require("fuse-box");
const fuse = FuseBox.init({
  homeDir: "src",
  sourceMaps: true,
  target: "browser@es6",
  output: "./public/dist/$name.js",
});

fuse.bundle("render").instructions(`> client/render.tsx`).watch();
fuse.bundle("hydrate").instructions("> client/hydrate.tsx").watch();
fuse.bundle("hybrid").instructions("> client/hybrid.tsx").watch();
fuse.run();
