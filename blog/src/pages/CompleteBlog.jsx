import React from 'react'
import { useSelector } from 'react-redux';

const CompleteBlog = () => {
const home = useSelector(state => state.home);
const article = home.selectedArticle

return (
<>
    <div className="container d-flex flex-wrap justify-content-center">
        <h1 className="card-title text-truncate text-center mt-3 text-decoration-underline text-capitalize mb-4">{article.title}</h1>
        <img className="card-img" style={{height: "700px"}} src={article.url} alt="url broken" />
        <h3 className="card-text mt-3">{article.data}</h3>

    </div>
</>
)
}

export default CompleteBlog