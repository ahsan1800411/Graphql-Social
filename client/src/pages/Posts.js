import { gql, useQuery } from '@apollo/client';
import Post from '../components/Post';

const Posts = () => {
  const GET_POSTS = gql`
    query {
      posts {
        content
        published
        createdAt
        title
        user {
          name
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>Error...</h1>;
  }
  const { posts } = data;

  return (
    <div>
      {posts?.map((post) => {
        return (
          <Post
            key={post.id}
            content={post.content}
            title={post.title}
            author={post.user.name}
          />
        );
      })}
    </div>
  );
};

export default Posts;
