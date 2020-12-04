import React from 'react'
import {Link} from 'react-router-dom'
import '../Styles/Layout/layout.css'

interface ILayout {
    searchBar?: React.ReactNode
}

const Layout: React.FC<ILayout> = ({searchBar, children}) => {
  return (
    <div id="layout-wrapper">
        <div id="layout">
            <nav id="web">
                <Link to="/"><h1> Desafio </h1></Link>
                {searchBar && searchBar}
            </nav>
            <main>
                {children}
            </main>
        </div>
    </div>
  );
}

export default Layout;