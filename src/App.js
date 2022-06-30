import * as React from 'react';

function getTitle(title){
  return title;
};

function App() {
  const welcome = {
    greeting: 'Hey',
    title: 'React'
  };

  return (
    <div>
      <h1>
        {welcome.greeting} {welcome.title} {getTitle('!!!!')}
      </h1>

      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' />
    </div>
  );
}

export default App;
