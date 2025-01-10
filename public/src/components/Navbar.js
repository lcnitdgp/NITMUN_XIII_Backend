
import React from 'react'
import "./Navbar.css"



const Navbar = () => {
  return (
    <div>
        <div className="container">
      <div className="navbar">
        <div className="menu">
          <h3 className="logo">Mayank<span>Rana</span></h3>
          <div className="hamburger-menu" onClick={Toggle}>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="main">
          <header>
            <div className="overlay">
              <div className="inner">
                <h2 className="title">Click on NavBar icon</h2>
                <p>
                  In this project I try to make a 3D navbar animation you can check it out by clicking on the nav bar icon on ther top right corner.
                </p>
                <button className="btn">Read more</button>
              </div>
            </div>
          </header>
        </div>

        <div className="shadow one"></div>
        <div className="shadow two"></div>
      </div>
      {/* <div className='links'>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/aboutNitmun'>About Nitmun</a>
          </li>
          <li>
            <a href='/signup'>Register</a>
          </li>
          <li>
            <a href='/signup'>Register</a>
          </li>
          
        </ul>
      </div>
       */}
    </div>
    </div>
  )
}

const hamburger_menu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".container");

// window.hamburger_menu.addEventListener("click", () => {
//   container.classList.toggle("active");
// });

const Toggle=("click",()=>{
  container.classList.toggle("active")
})

export default Navbar;