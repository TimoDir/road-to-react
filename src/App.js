import * as React from 'react';

function List(props){
  return (
    <article>
      {props.list.map((word) =>{
        return <Word key={word.objectID} info={word} />
        }
      )}
    </article>
  );
};

function Word(props){

  const definitions=()=>{
    const definition = [];
    for (let index = 0; index < props.info.def.length; index++) {
      definition.push((<li key={props.info.def.arrayID}>{props.info.def[index]}</li>))
    }
    return definition
  };

  return(
    <div key={props.info.id}>
    <h3>{props.info.title}</h3>
    <ul>
      {definitions()}
    </ul>
  </div>
  );
}

function Search(props){
  return(
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={props.onSearch} /> {/*taking the handle event as the props pass by the parent component (App)*/}
      <p>Searching for <strong>{props.searchTerm}</strong></p>
    </div>
  );
};

function App() {
  const dict = [{
    def:  ['An error in chronology.',
          'A person or a thing that is chronologically out of place.',
          'The state or condition of being chronologically out of place.'],
    id: 0,
    title: 'Anachronism'},
    {def: ['Disposed to seek revenge.',
          'Intended for or involving revenge.',
          'The state or condition of being chronologically out of place.',],
    id: 1,
    title: 'Vindictive'},
    {def: ['An instrument for reproducing sounds by means of the vibration of a stylus or needle following a spiral groove on a revolving disc or cylinder.',
          'Voyager 1 and 2 took with them golden phonograph records with images and sounds meant to reflect human culture.',],
    id: 2,
    title: 'Phonograph '}];
    // moving the searchTerm state inside App component directely
    const [searchTerm, setSearchTerm] = React.useState('');
    // using the callback function to set the searchTerm
    const handleSearch = (event) =>{
      setSearchTerm(event.target.value);
    };
  
  return (
    <div >
      <h1>Welcome to the dictionary</h1>
      <p>Just 3 defenition avaible now but more will come in the future.</p>
      
      <Search searchTerm={searchTerm} onSearch={handleSearch} />

      <List list={dict} />

    </div>
  );
};

export default App;