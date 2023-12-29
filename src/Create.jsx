import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true)

    const url = 'http://localhost:8000/blogs';
    fetch(url, {
      method: "POST",
      headers: { "Content-type" : "application/json" },
      body: JSON.stringify(blog)
    }).then((res) => {
      setIsPending(false)
      if (res.ok) {
        setTitle('');
        setBody('');
        setAuthor('mario');
        navigate('/');
      } else {
        setErrorMessage('There was an error posting your blog. Please try again.');
      }
    }).catch((err) => {
      setErrorMessage(`There was a server error. Please try again later. Error message: ${err.message}`)
      setIsPending(false);
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button className="btn">Add Blog</button>}
        {isPending && <button style={{"background" : "hsl(0, 0%, 65%)"}} className="btn-disabled" disabled>Adding Blog...</button>}
        <p style={{"paddingTop" : "10px"}}>
          {errorMessage}
        </p>
      </form>
    </div>
  );
}
 
export default Create;