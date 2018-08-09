import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import axios from 'axios'
import data from '../api/news.json'

const Index = (props) => (
  <div>
    <Head title="Home" />
    <Nav />

    <div className="hero">
      <h1 className="title">Simple Read News Later</h1>
      <p className="description">
        there is a news list that you can read, or you can add it to your pockets, so you can read it later.
      </p>
      <div className="container">
        {
          props.data.articles.map((news, idx) => (
              <Link href={ `/news?title=${news.title}` } key={idx}>
                <a className="card">
                  <p>{ news.title }</p>
                  <img className="image" src={ news.urlToImage } />
                  <p>Author: { news.author }</p>
                </a>
              </Link>
          ))
        }
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 30px;
        line-height: 1.15;
        font-size: 38px;
      }
      .title,
      .description {
        text-align: center;
      }
      .container {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: center;
      }
      .card {
        display: flex;
        margin: 15px;
        padding: 18px 18px 24px;
        width: 20%;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
        flex-direction: column;
        .card:hover {
          border-color: #067df7;
        }
        .card p {
          display: flex;
          width: 100%;
          color: #067df7;
          font-size: 18px;
        }
      }
      .image {
        display: flex;
        width: 100%;
        height: 150px;
      }
    `}</style>
  </div>
)
Index.getInitialProps = async () => {
  const newsapi = await axios.get('https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=1532b0ef4ecc4d099477ea1bd3e6ab7d')
  const data = await newsapi.data
  return ({
    data
  })
}

export default Index
