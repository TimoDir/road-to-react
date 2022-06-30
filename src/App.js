import * as React from 'react';

function getTitle(title){
  return title;
};

const dict = [{
  def1: 'An error in chronology',
  def2: 'A person or a thing that is chronologically out of place',
  def3: 'The state or condition of being chronologically out of place', 
  title: 'Anachronism'},
  {def1: 'Disposed to seek revenge',
  def2: 'Intended for or involving revenge',
  def3: 'The state or condition of being chronologically out of place', 
  title: 'Vindictive'},
  {def1: 'An instrument for reproducing sounds by means of the vibration of a stylus or needle following a spiral groove on a revolving disc or cylinder',
  def2: 'Voyager 1 and 2 took with them golden phonograph records with images and sounds meant to reflect human culture.',
  def3: 'That was life up until Thomas Edison revolutionized music consumption for the first time in history with the invention of the phonograph, a 10-inch, 78 RPM cylinder disc that could only contain about three minutes of music per side.',  
  title: 'Phonograph '}];

function App() {
  return (
    <div >
      <h1>
        {getTitle('Welcome to the dictionary')}
      </h1>
      <p>Just 3 defenition avaible now but more will come in the future.</p>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' />
      <article>
      {dict.map( function (word){
        return (<div>
          <h3>{word.title}</h3>
          <ul>
            <li>{word.def1}</li>
            <li>{word.def2}</li>
            <li>{word.def3}</li>
          </ul>
        </div>);
        }
      )}
      </article>
    </div>
  );
}

export default App;
