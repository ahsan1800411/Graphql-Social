import React from 'react';

const Post = ({ content, title, author }) => {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <h1 style={{ color: 'red', marginRight: '3rem' }}>Title is :{title}</h1>
      <h2 style={{ color: 'green', marginRight: '3rem' }}>
        {' '}
        Content is :{content}
      </h2>
      <h3 style={{ color: 'blue', marginRight: '3rem' }}>
        {' '}
        Author is: {author}
      </h3>
    </div>
  );
};

export default Post;
