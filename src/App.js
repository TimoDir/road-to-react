import * as React from 'react';

function List({list, onRemoveDef}){
  if(list[0] === undefined){
    return ;
  } else return (
    <article>
      {list.map((word) =>{
        return <Word key={`${word.word}${list.indexOf(word)}`} info={word} onRemoveDef={onRemoveDef} />
        }
      )}
    </article>
  );
};

function Word({info , onRemoveDef}){

  const definitions=()=>{
    const word = [];
    for (let i = 0; i < info.meanings.length; i++) {
      word.push((<h4>{info.word} - {info.meanings[i].partOfSpeech}</h4>))
      const def = []
      for (let y = 0; y < info.meanings[i].definitions.length; y++) {
        def.push((<li key={`${info.license.name}.${i}.${y}`}>{info.meanings[i].definitions[y].definition}</li>))
      }
      word.push(<ul key={`${info.license.name}.${i}`}>{def}</ul>)
    }
    return word
  };

  const handleRemoveDict = () =>{
    onRemoveDef(info);
  };

  return(
    <div key={info.license.name}>
    <h3>{info.word}</h3>
    <>
      {definitions()}
    </>
    <span>
      <button type='button' onClick={handleRemoveDict}>Dismiss</button>
    </span>
  </div>
  );
}

const InputWithLabel = ({id, children, isFocused, type='text', value, onInputChange}) =>{
  const inputRef = React.useRef();

  React.useEffect(()=>{
    if(isFocused && inputRef.current){
      inputRef.current.focus();
    }
  }, [isFocused]) 

  return(
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef}
        type={type} 
        id={id} 
        value={value}
        onChange={onInputChange} 
      />
    </>
  );
};
/*
const Dropdown = ({label, options, value, onChange}) =>{
  return(
    <>
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map(option => (<option value={option.title}>{option.title}</option>) )}
        </select>
      </label>
    </>
  );
};
*/

const useStorageState = (key, initialState) =>{
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
  
  React.useEffect(()=>{
    localStorage.setItem(key, value)
  }, [value, key]);

  return [value, setValue];
};
/*
const dictionary = [{
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
*/
const API_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const dictReducer = (state, action) =>{
  switch(action.type){
    case 'LOADING_DICT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    case 'GET_DICT':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'ERROR_FETCH':
      return{
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_DICT':
      return {
        ...state,
        data: state.data.filter( 
          (def) => action.payload.id !== def.id
        ),
      };
    default:
      throw new Error();
  }
};

function App() {

    const [searchTerm, setSearchTerm] = useStorageState('search', 'example');
    //const [dropTerm, setDropTerm] =useStorageState('drop', '');
    const [dict, dispatchDict] =  React.useReducer(
      dictReducer,
      {data: [], isLoading: false, isError: false}
    );
    const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`)

    const handleFetchStories = React.useCallback(()=>{
      if (!searchTerm) return;
      dispatchDict({type:'LOADING_DICT'})

      fetch(url).then((response) =>
        response.json()).then((result) =>{
          dispatchDict({
            type: 'GET_DICT',
            payload: dict.data = result,
          })
        }).catch(()=>
            dispatchDict({type:'ERROR_FETCH'})
          );
    }, [url])

    React.useEffect(() =>{
      handleFetchStories()
    }, [handleFetchStories]);
    
    const handleSearch = (event) =>{
      setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () =>{
      setUrl(`${API_ENDPOINT}${searchTerm}`)
    }
    /*
    const handleDrop = (event) =>{
      setDropTerm(event.target.value)
    };
    */
    const handleRemoveDict = (item) =>{
      dispatchDict({
        type: 'REMOVE_DICT',
        payload: item,
      });
    };

    //const searchedDict = dict.data.filter(word => word.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    //const dropedDict = dict.data.filter(word => word.title.toLocaleLowerCase().includes(dropTerm.toLocaleLowerCase()))

  return (
    <>
      <h1>Welcome to the dictionary</h1>
      <p>Type the word you want a definition in the searchbar section.</p>

      <h2>Searchbar</h2>
      <InputWithLabel
        isFocused
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search : </strong>
      </InputWithLabel>
      <button
        type='button'
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >Submit</button>

      {dict.isError && <p>Something went wrong ...</p>}
      { dict.isLoading ? (
        <p>Loading ...</p>
      ):(<List list={dict.data} onRemoveDef={handleRemoveDict} />)}

      {/*<h2>Navigate with the dropdown</h2>
      <Dropdown
        label='Chose an definition : '
        options={dict.data}
        value={dropTerm}
        onChange={handleDrop}
      />
      {dict.isError && <p>Something went wrong ...</p>}
      { dict.isLoading ? (
        <p>Loading ...</p>
      ):(<List list={dict.data} />)}*/}
    </>
  );
};

export default App;