import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);

  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  function handleClick() {
    const url = `http://localhost:8000/blogs/${id}`;
    fetch(url, {
      method: "DELETE"
    }).then((res) => {
      if (res.ok) {
        navigate('/');
        setErrorMsg('')
      } else {
        setErrorMsg('There was an error deleting the blog. Please try again.')
      }
    }).catch((err) => {
      setErrorMsg('There was an error on the server. Error: ' + err.message + '.')
    })
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
          <button className="btn-danger" onClick={handleClick}>Delete Blog</button>
          {errorMsg}
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;