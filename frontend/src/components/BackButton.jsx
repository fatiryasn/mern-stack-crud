//modules
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

//font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

//component
const BackButton = ({destination}) => {
  //display!
  return (
    <>
    <div>
        <Link to={destination}><button><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button></Link>
    </div>
    <Outlet />
    </>
  )
}

export default BackButton