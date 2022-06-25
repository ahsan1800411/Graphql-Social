import React, { useState } from 'react';

const PostCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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
      <button>Create Post</button>
    </div>
  );
};

export default PostCreate;
