import { useQuery, gql } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import Post from '../components/Post';

const Profile = () => {
  const { id } = useParams();
  const GET_PROFILE = gql`
    query GET_PROFILE_BY_ID($userId: ID!) {
      profile(userId: $userId) {
        bio
        isMyProfile
        user {
          id
          name
          email
          posts {
            id
            content
            title
            user {
              email
            }
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_PROFILE, {
    variables: {
      userId: id,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    <h1>Error...</h1>;
  }

  return (
    <>
      <h1>Profile User :: {data.profile.user.name} </h1>
      <p style={{ color: 'red' }}>My Bio is: {data.profile.bio}</p>

      <div>
        {data.profile.user.posts.map((post) => {
          return (
            <Post
              key={post.id}
              content={post.content}
              title={post.title}
              author={data.profile.user.name}
            />
          );
        })}
      </div>
    </>
  );
};

export default Profile;
