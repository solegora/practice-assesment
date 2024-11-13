import React from "react";
import  "./Nav.css"
import {ReactComponent as Logo} from "../../Assets/Logo.svg"

export const Navigation = () => {

    return   (
    <nav className='nav'>
      {/* <div className='logo' alt="app-logo"><Logo/></div> */}
      <div className='logo' alt="app-logo">Logo</div>
    </nav>
  )

}