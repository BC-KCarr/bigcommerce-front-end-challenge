import React, { useState } from 'react'
import Pagination from '@material-ui/lab/Pagination'
import styles from '../styles/Home.module.css'
import { withRouter } from 'next/router'

function Home({ data, idsArray, router }) {
  const [page, setPage] = useState(parseInt(router.query.index) + 1 || 1)

  const handleChange = (event, value) => {
    setPage(value)
    const currentPath = router.pathname;
    const currentQuery = router.query;
    currentQuery.index = value - 1

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  }

  return (
    <div className={styles.container}>
  
      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <Pagination
            count={idsArray.length}
            page={page}
            onChange={handleChange}
          />
          <h1 className={styles.title}>{data.title}</h1>
        </div>
        <img src={data.image.url} alt='' />
      </main>

      <footer className={styles.footer}>
        <div>all right reserved</div>
      </footer>
    </div>
  )
}

export const getServerSideProps = async (props) => {

  const entryIndex = props.query.index || 0
  async function fetchData(url) {
    const response = await fetch(url)
    return response.json();
  }
  return fetchData('https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds')
    .then(ids => {
      return fetchData(`https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${ids[entryIndex]}`)
        .then(response => {
          return {
            props: {
              data: response,
              idsArray: ids
            }
          }
        })
    })
}

export default withRouter(Home)
