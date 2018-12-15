import * as React from "react"
import {SFC} from "react";

export const Layout: SFC<{ title }> = ({title, children}) => (
  <html>
  <head>
    <title>{title}</title>
  </head>
  <body>
  {children}
  </body>
  </html>
);