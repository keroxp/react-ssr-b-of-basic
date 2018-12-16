const {FuseBox} = require("fuse-box");
const fuse = FuseBox.init({
  homeDir: "src",
  sourceMaps: true,
  target: "browser@es6",
  output: "./public/dist/$name.js",
});

const bundles = [
  fuse.bundle("render").instructions(`> client/render.tsx`),
  fuse.bundle("hydrate").instructions("> client/hydrate.tsx"),
  fuse.bundle("hybrid").instructions("> client/hybrid.tsx"),
];
if (process.argv[1] === "watch") {
  bundles.forEach(b => b.watch())
}
fuse.run();
