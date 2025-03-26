import React, { Fragment } from 'react'

export const Show = ({ when, children }) => {
  return (
   <Fragment>{when ? children : null}</Fragment>
  )
}
