import React, {useState} from 'react'
import { useHistory } from "react-router-dom";


import '../Styles/Pages/index.css'
import IndexIMG from '../img/indexImg.svg'

import Layout from '../Layout/layout'

const Index: React.FC = () => {
  const [language, setLanguage] = useState('')
  const history = useHistory();

  function handleSearch() {
    history.push(`/search?language=${language}`)
  } 

  return (
    <Layout>
      <div id="index">
          <div>
            <img src={IndexIMG} alt="Ilustração de uma pessoa com uma lupa"/>
          </div>
          <section>
            <label>
              Buscar repositórios no github
              <input 
              type="text"
              placeholder="Digite o nome de uma linguagem de progamação" 
              value={language} 
              onChange={e => setLanguage(e.target.value)}/>
            </label>
          </section>
          <button disabled={language ? false : true} onClick={handleSearch}>Buscar</button>
      </div>
    </Layout>
  );
}
export default Index;