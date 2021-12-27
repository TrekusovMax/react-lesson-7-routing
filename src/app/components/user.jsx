import React from 'react'
import PropTypes from 'prop-types'
import Quality from '../components/quality'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (user) {
    return (
      <>
        <h1>{user.name} </h1>
        <h2>Профессия: {user.profession.name}</h2>
        <p>
          {user.qualities.map((qual) => (
            <Quality {...qual} key={qual._id} />
          ))}
        </p>
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>

        <Link to="/users">
          <button> Все пользователи</button>
        </Link>
      </>
    )
  } else {
    return <h1>Loading ...</h1>
  }
}

User.propTypes = {
  user: PropTypes.object
}

export default User
