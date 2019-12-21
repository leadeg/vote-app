import './style.css'

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem'
import { getLinks } from '../../../../redux/actions'

const LinkList = ({ links, getLinks }) => {
  const total = links.length
  const pageSize = 5
  const [page, setPage] = useState(1)
  const [currentList, setCurrentList] = useState([])

  useEffect(() => {
    getLinks()
  }, [])

  useEffect(() => {
    console.log('useEffet')
    adjustPage(page)
  }, [links])

  const adjustPage = (page) => {
    const startFrom = (page - 1) * pageSize
    const end = startFrom + pageSize
    const currentList = links.slice(startFrom, end)
    setPage(page)
    setCurrentList(currentList)
  }

  return (
    <div>
      {currentList.map((link) => (
        <LinkItem key={link.id} link={link} />
      ))}

      <Pagination
        pageSize={5}
        total={total}
        currentPage={page}
        onChange={adjustPage}
      />
    </div>
  )
}

LinkList.propTypes = {
  links: PropTypes.array,
  getLinks: PropTypes.func
}

const mapStateToProps = (state) => ({
  links: state.linkReducer.links
})

const mapDispatchToProps = {
  getLinks
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkList)
