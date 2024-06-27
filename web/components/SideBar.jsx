"use client";
import React from "react";

import MenuBar from "./MenuBar";

function SideBar() {
  return (
    // <div className="sidebar">
      <div className="scroll-wrapper scrollbar-inner sidebar-wrapper" style={{height: 'auto', marginBottom: '0px',marginRight: '0px',maxHeight: '292px'}} >
        <MenuBar />
      {/* </div> */}
    </div>
  );
}

export default SideBar;
