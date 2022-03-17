import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { Badge } from 'react-bootstrap';
import{ useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./Home.css"

const Home = () => {
  const user = useSelector(state => state.home);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { category } = useParams();

  useEffect(() => {
  axios.get(`http://localhost:5000/blogs/fetch_all?category=${category}`)
  .then(res => dispatch({ type: 'ALL_ARTICLES_DATA', payload: res.data }))
  .catch(err => console.log(err))
  }, [category])

  const handleClick= (article) =>  {
    dispatch({ type: 'UPDATE_SELECTED_ARTICLE_DATA', payload: article })
    navigate("/completeblog");
  }

  return (
  <div class="container d-flex flex-wrap justify-content-between">
    {user.articles && user.articles.length > 0 && user.articles.map(article => (
      <div class="col-12 col-sm-8 col-md-5 col-lg-3 m-3 ">
        <div class="card" onClick={() => handleClick(article)}>
          <img class="card-img" style={{height: "200px"}} src={article.url} alt="" />
          <div class="card-body ">
            <h4 class="card-title text-truncate" >{article.title}</h4>
            {article.category.map(item => (<Badge bg="dark m-1">{item}</Badge>))}
            <p class="card-text m-2 module line-clamp">{article.data}</p>
            {/* <p class="card-text">{article._id.email}</p> */}
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}
export default Home