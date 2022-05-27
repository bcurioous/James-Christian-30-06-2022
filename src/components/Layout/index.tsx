import React from "react";

import Nav from "../Nav";

type Props = {
  children?: React.ReactElement;
};

function Layout({ children }: Props) {
  return (
    <>
      <Nav />
      <main>{children}</main>
    </>
  );
}

export default Layout;
