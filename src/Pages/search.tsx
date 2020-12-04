import React, {useState, useEffect, useRef} from 'react'
import { useLocation, useHistory } from "react-router-dom";
import axios from 'axios';

import api from '../api/api'
import Layout from '../Layout/layout';

import '../Styles/Pages/search.css'
import SearchIcon from '../img/search.svg'

import Card from '../Components/card'
import Spinner from '../Components/spinner'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface IRepositories {
  avatarUrl: string,
  description:string,
  forks: number,
  name: string,
  targazersCount: number,
  createdAt: string,
  login: string
}

const Search: React.FC = () => {
  const [repositories, setRepositories] = useState<IRepositories[]>([])
  const [pageNumber, setPageNumber] = useState(0)
  const [showLoading, setShowLoading] = useState(false)
  const [scrollRatio, setScrollRatio] = useState<Number>(0)
  const [language, setLanguage] = useState<string>('')
  const divInfiniteScroll = useRef<HTMLDivElement>(null)
  const query = useQuery()
  const history = useHistory()
  const queryInUrl = query.get('language')

  const intersectionObserver = new IntersectionObserver((entries) => {
    const ratio = entries[0].intersectionRatio
    setScrollRatio(ratio)
  })


  useEffect(() => {
      queryInUrl && setLanguage(queryInUrl)
      if(divInfiniteScroll.current) intersectionObserver.observe(divInfiniteScroll.current)
      return () => { intersectionObserver.disconnect()}
  },[])

  useEffect(() => {
      if(scrollRatio > 0 && language !== '') {
        const novaPagina = pageNumber + 1
        setPageNumber(novaPagina)
        setShowLoading(true)
        api.get<IRepositories[]>(`repository?language=${queryInUrl}&pageNumber=${novaPagina}`).then(value => {
          setRepositories([...repositories, ...value.data])
          setShowLoading(false)
        }, () => {
          setShowLoading(true)
          axios.get(`https://api.github.com/search/repositories?q=language:${queryInUrl}&sort=stars&page=${novaPagina}&per_page=20`)
            .then(value => {

                  const repositoriesisAlreadyExists = value.data.items

                  let repositoriesList: IRepositories[] = []
                  
                  repositoriesisAlreadyExists.forEach((item: any) => {
                      const {
                          name, 
                          description,
                          forks,
                          stargazers_count,
                          created_at,
                      } = item
                      const {avatar_url, login} = item.owner

                      repositoriesList.push({
                          avatarUrl: avatar_url,
                          description:description,
                          forks,
                          name,
                          login,
                          targazersCount: stargazers_count,
                          createdAt: created_at
                      })
                  })



              setRepositories([...repositories, ...repositoriesList])
              setShowLoading(false)
            })
        })
      }
  }, [scrollRatio])

  function handleSearch() {
    history.push(`/search?language=${language}`)
    const newRepositorie:IRepositories[] = []
    setRepositories(newRepositorie)
    setPageNumber(0)
  } 

  return (
      <Layout searchBar={
          <div id="searchbar-container">
            <input type="text"placeholder="Digite o nome de uma linguagem de progamação" value={language} onChange={e => setLanguage(e.target.value)}/>
            <button onClick={handleSearch}><img src={SearchIcon} alt="ícone de busca"/></button>
          </div>}>
          <div id="content">

          {repositories.map((repositorie, index) => (
                <Card 
                key={index}
                profileImg={repositorie.avatarUrl}
                ownerOfProject={repositorie.login}
                projectName={repositorie.name}
                projectDateCreated={repositorie.createdAt}
                projectDescription={repositorie.description}
                projectNumberOfStars={repositorie.forks}
                projectNumberOfForks={repositorie.targazersCount}/>
            ))}

            <div ref={divInfiniteScroll}></div>
            {showLoading && <Spinner />}
          </div>
      </Layout>
  );
}

export default Search;