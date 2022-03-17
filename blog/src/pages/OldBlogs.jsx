import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import edit from "../images/edit.png";
import del from "../images/delete.png";
import "./OldBlogs.css"
import { useNavigate } from "react-router-dom";


const OldBlogs = () => {
const user = useSelector(state => state.user);
const dispatch = useDispatch();
let navigate = useNavigate();

useEffect(() => {
axios.get('http://localhost:5000/blogs/fetch', {headers: {'x-auth-token': user.token }})
.then(res => dispatch({ type: 'UPDATE_ARTICLES_DATA', payload: res.data }))
.catch(err => console.log(err))
}, [])

const handleDelete = (article) =>{
dispatch({ type: 'UPDATE_SELECTED_ARTICLE_DATA', payload: {}})
axios.delete(`http://localhost:5000/blogs/delete/${article._id}`, {headers: {'x-auth-token': user.token }})
dispatch({ type: 'UPDATE_ARTICLES_DATA', payload: user.articles.filter(item => article._id !== item._id) })
}

const handleEdit = (article) =>{
dispatch({ type: 'UPDATE_SELECTED_ARTICLE_DATA', payload: article })
navigate("/blogForm");
}

const handleClick= (article) =>  {
  dispatch({ type: 'UPDATE_SELECTED_ARTICLE_DATA', payload: article })
  navigate("/completeblog");
}

return (
<>
  <h1 className='text-center mt-3'>Old Blogs</h1>
  <div className="container d-flex flex-wrap justify-content-between">
    {user.articles && user.articles.length > 0 && user.articles.map(article => (
    <div className="col-12 col-sm-8 col-md-5 col-lg-3 m-3">
      <div className="card inner " onClick={() => handleClick(article)}>
        <img className="card-img" style={{height: "200px"}} src={article.url} alt="url broken" />
        <div class="card-img-overlay">
          <div className="button">
            <img className="icon-img btn btn-light btn-sm" src={edit} alt='' onClick={()=> handleEdit(article)}/>
            <img className="icon-img btn btn-light btn-sm" src={del} alt='' onClick={ ()=> { window.confirm("Do you really want to delete?")
            && handleDelete(article)}}/>
          </div>
        </div>
        <div className="card-body">
          <h4 className="card-title text-truncate">{article.title}</h4>
          <p className="card-text module line-clamp">{article.data}</p>
        </div>
      </div>
    </div>
    ))}
  </div>
</>
)

}

export default OldBlogs