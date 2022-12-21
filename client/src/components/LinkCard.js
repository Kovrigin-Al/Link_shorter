import React from 'react'

export const LinkCard = ({link}) => {
  return (
    <div style={{paddingLeft:'2rem'}}>
        <h2>Short link is created</h2>
        <p>Your link <a href={link.from} target='_blank' rel="noreferrer">{link.from}</a> is converted to:</p> 
        <p><a href={link.to} target='_blank' rel="noreferrer">{link.to}</a></p> {//TODO: ref='noopener noreference'
    }
        <p>The short link has been clicked <strong>{link.clicks}</strong> times</p> 
        <p>The link was created on <strong>{new Date(link.date).toLocaleDateString()}</strong></p> 
    </div>
  )
}

