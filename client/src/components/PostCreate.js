import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const POST_CREATE = gql`
    mutation CREATE_PROFILE($content: String, $title: String) {
      postCreate(input: { content: $content, title: $title }) {
        post {
          content
          title
        }
        userErrors {
          message
        }
      }
    }
  `;

  const [postCreateByMe, { data, loading, error }] = useMutation(POST_CREATE);

  const handleClick = () => {
    postCreateByMe({
      variables: {
        content,
        title,
      },
    });
  };

  return (
    <div>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='title'
      />
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='content'
      />
      <button onClick={handleClick}>Create Post</button>
    </div>
  );
};

export default PostCreate;
