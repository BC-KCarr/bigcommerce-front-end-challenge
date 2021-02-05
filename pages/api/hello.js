// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {

  // console.log(req)

  async function fetchData(url) {
    const response = await fetch(url)
    return response.json();
  }
  return fetchData('https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryIds')
    .then(ids => {
      return fetchData(`https://www.bigcommerce.com/actions/bcCore/interview/getShowcaseEntryById?id=${ids[0]}`)
      .then(response => {
        return res.status(200).json({ results: response, totalPages: ids.length })
      })
    })
}
