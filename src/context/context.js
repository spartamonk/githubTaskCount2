import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [followers, setFollowers] = useState(mockFollowers)
  const [repos, setRepos] = useState(mockRepos)
  const [requestCount, setRequestCount] = useState(0)
  const [user, setUser] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  })

  const handleChange = (e) => {
    setUser(e.target.value)
  }

  //toggle error
  const toggleError = (isError = false, errorMsg = '') => {
    setError({
      isError,
      errorMsg,
    })
  }
  //check requests rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`).then((response) => {
      let {
        data: {
          rate: { remaining },
        },
      } = response
      setRequestCount(remaining)
      if (remaining === 0) {
        toggleError(true, 'you have used all your hourly request limit')
      }
    })
  }

  useEffect(checkRequests, [])

  //fetch github user
  const fetchGithubUser = async () => {
    toggleError()
    setIsLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) =>
      console.log(error)
    )
    if (response) {
      const { data } = response
      setGithubUser(data)
      const { login, followers_url } = data
      //fetching one at a time
      // axios(`${followers_url}?per_page=100`).then(response=> {
      //   const {data}= response;
      //   setFollowers(data);
      // }).catch(error=> console.log(error))
      // axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response=> {
      //   const {data} = response;
      //   setRepos(data)
      // }).catch(error=> console.log(error))

      //fetching when all requests are settled
      await Promise.allSettled([
        axios(`${followers_url}?per_page=100`),
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
      ]).then(([followers, repos])=> {
        const status = 'fulfilled'
        if(followers.status === status) {
          setFollowers(followers.value.data)
        }
        if(repos.status === status) {
         setRepos(repos.value.data)
        }
      })
    } else {
      toggleError(true, 'There Is No User With That Username')
    }
    setIsLoading(false)
    checkRequests()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (user) {
      fetchGithubUser()
    }
  }
  return (
    <GithubContext.Provider
      value={{
        githubUser,
        followers,
        repos,
        handleChange,
        handleSubmit,
        user,
        ...error,
        requestCount,
        isLoading
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

const useGlobalContext = () => {
  return React.useContext(GithubContext)
}

export { useGlobalContext, GithubProvider }
