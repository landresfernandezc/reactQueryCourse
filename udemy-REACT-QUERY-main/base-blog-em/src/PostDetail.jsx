import { useMutation, useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError, error } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );
  const deleteMutation = useMutation((postId) => deletePost(postId));
  const postMutation=useMutation((postId)=>updatePost(postId))
  if (isLoading) return <h3>Is Loading...</h3>;
  if (isError) return;
  <>
    <h3>Error</h3>
    <p>{error}</p>
  </>;
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={()=>deleteMutation.mutate(post.id)}>Delete</button>
       
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting the post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>Deleted Succesfully</p>
      )}
      <button onClick={()=>postMutation.mutate(post.id)}>Update title</button>
      {postMutation.isError &&(
        <p style={{color:'red'}}>Error updating</p>
      )}
      {postMutation.isLoading &&(
        <p style={{color:'purple'}}>Updating message</p>
      )}
      {postMutation.isSuccess &&(
        <p style={{color:'green'}}>Updated Succesfully</p>
      )}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
