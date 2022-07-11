import * as React from 'react';
import { createPortal } from 'react-dom';

function List({list}){
  return (
    <article>
      {list.map((word) =>{
        return <Word key={word.objectID} info={word} />
        }
      )}
    </article>
  );
};

function Word({info}){

  const definitions=()=>{
    const definition = [];
    for (let index = 0; index < info.def.length; index++) {
      definition.push((<li key={info.def.arrayID}>{info.def[index]}</li>))
    }
    return definition
  };

  return(
    <div key={info.id}>
    <h3>{info.title}</h3>
    <ul>
      {definitions()}
    </ul>
  </div>
  );
}

function Search({searchTerm, onSearch}){
  return(
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' 
      type='text' 
      value={searchTerm}
      onChange={onSearch} />
      <p>Searching for <strong>{searchTerm}</strong></p>
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
    
    const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || '');

    React.useEffect(()=>{
      localStorage.setItem('search', searchTerm) // create an item 'search' we will have the value of searchTerm everytime useEffect function will get triger uptade the value
    }, [searchTerm]); // and that whenever searchTerm will change

    const handleSearch = (event) =>{
      setSearchTerm(event.target.value);
    };

    const searchedDict = dict.filter(word => word.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
  
  return (
    <div >
      <h1>Welcome to the dictionary</h1>
      <p>Just 3 defenition avaible now but more will come in the future.</p>
      
      <Search searchTerm={searchTerm} onSearch={handleSearch} />

      <List list={searchedDict} /> 

    </div>
  );
};

export default App;