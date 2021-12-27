import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from '../components/pagination'
import { useParams } from 'react-router-dom'
import GroupList from '../components/groupList'
import api from '../api'
import SearchStatus from '../components/searchStatus'
import User from '../components/user'
import UserTable from '../components/userTable'
import _ from 'lodash'

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [professions, setProfessions] = useState(api.professions.fetchAll())
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name ', order: 'asc' })
  const pageSize = 8
  const params = useParams()
  const [users, setUsers] = useState()
  const [userById, setUserById] = useState()
  const { userID } = params

  useEffect(() => {
    api.users.getById(userID).then((data) => setUserById(data))
  }, [])

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId))
  }
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark }
        }
        return user
      })
    )
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])

  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : users
  if (users) {
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const usersCrop = paginate(sortedUsers, currentPage, pageSize)
    const clearFilter = () => {
      setSelectedProf()
    }

    if (userID) {
      return <User user={userById} />
    } else {
      return (
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus length={count} />
            {count > 0 && (
              <UserTable
                users={usersCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
              />
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )
    }
  }
  return <h1>Loading ...</h1>
}
Users.propTypes = {
  users: PropTypes.array
}

export default Users
