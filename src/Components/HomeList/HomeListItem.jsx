import React from 'react'

export default function HomeListItem({index, url , description}) {
  return (
    <div>
      <li key={index}>
          <a href={url}>{description}</a>
        </li>
    </div>
  )
}
