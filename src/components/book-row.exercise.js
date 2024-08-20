/** @jsx jsx */
import {jsx} from '@emotion/core'

import { Link } from 'react-router-dom'
import * as mq from 'styles/media-queries'
import * as colors from 'styles/colors'

function BookRow({book}) {
  const {title, author, coverImageUrl} = book

  const id = `book-row-book-${book.id}`

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <Link to={`/book/${book.id}`}>
        aria-labelledby={id}
        {/* ncaught Error: Objects are not valid as a React child (found: object with keys {minHeight, flexGrow, display, gridTemplateColumns, gridGap, border, color, padding, borderRadius, :hover,:focus}). If you meant to render a collection of children, use an array instead. */}
        {/* css={{
          minHeight: 270,
          flexGrow: 2,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }} */}
      </Link>
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            css={{maxHeight: '100%', width: '100%'}}
          />
        </div>
        <div css={{flex: 1}}>
          <div css={{display: 'flex', justifyContent: 'space-between'}}>
            <div css={{flex: 1}}>
              <h2
                id={id}
                css={{
                  fontSize: '1.25em',
                  margin: '0',
                  color: colors.indigo,
                }}
              >
                {title}
              </h2>
            </div>
            <div css={{marginLeft: 10}}>
              <div
                css={{
                  marginTop: '0.4em',
                  fontStyle: 'italic',
                  fontSize: '0.85em',
                }}
              >
                {author}
              </div>
              <small>{book.publisher}</small>
            </div>
          </div>
          <small css={{whiteSpace: 'break-spaces', display: 'block'}}>
            {book.synopsis.substring(0, 500)}...
          </small>
        </div>
      </div>
  )
}

export {BookRow}
