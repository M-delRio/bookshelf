/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from 'utils/api-client'
import {useState, useEffect} from 'react'

import {FaTimes} from 'react-icons/fa'

function DiscoverBooksScreen() {
  //'idle', 'loading', 'success', 'error'
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [query, setQuery] = useState(null)
  const [isSearchRan, setIsSearchRan] = useState(false)

  useEffect(() => {
    if (!isSearchRan) {
      return
    }

    const endpoint = `books?query=${encodeURIComponent(query)}`

    const fetchData = async () => {
      if (!isSearchRan) {
        return
      }

      try {
        setStatus('working')
        const response = await client(endpoint)

        if (!response.ok) {
          setStatus('error')
          setData(response)

          return
        }

        setStatus('success')
        setData(response)
      } catch (error) {
        console.error('Error fetching data: ', error)
        setStatus('error')
        setData(error)
      }

      setIsSearchRan(false)
    }

    fetchData()
  }, [isSearchRan, query])

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  function handleSearchSubmit(event) {
    event.preventDefault()

    setIsSearchRan(true)

    setQuery(event.target.elements.search.value)
  }

  let searchIcon

  if (isError) {
    searchIcon = <FaTimes aria-label="error" css={{color: 'red'}} />
  } else {
    searchIcon = <FaSearch aria-label="search" />
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : searchIcon}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? (
        <div css={{color: 'red'}}>
          <p>There was an error:</p>
          <pre>{data.message}</pre>
        </div>
      ) : null}

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
