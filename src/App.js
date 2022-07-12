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
// creation of the custom Hook 
const useStorageState = (key, initialState) =>{ // utilisation of the key and initialeState parameter to have a reusability of our Hook
  // value and setValue will be rename by calling the hook
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
  
  React.useEffect(()=>{
    localStorage.setItem(key, value)
  }, [value, key]); // because the key it's an outside element he can change and create probleme so we store the change every time the key change too

  return [value, setValue];
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
    // we use destructuring array to call our custom Hook and defined value and setValue as searchTerm and setSearchTerm
    const [searchTerm, setSearchTerm] = useStorageState('search', '');
    
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