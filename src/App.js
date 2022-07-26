import * as React from 'react';

function List({list, onRemoveDef}){
  return (
    <article>
      {list.map((word) =>{
        console.log(word.id)
        return <Word key={word.id} info={word} onRemoveDef={onRemoveDef} />
        }
      )}
    </article>
  );
};

function Word({info , onRemoveDef}){

  const definitions=()=>{
    const definition = [];
    for (let index = 0; index < info.def.length; index++) {
      definition.push((<li key={info.def.arrayID}>{info.def[index]}</li>))
    }
    return definition
  };

  const handleRemoveDict = () =>{
    onRemoveDef(info);
  };

  return(
    <div key={info.id}>
    <h3>{info.title}</h3>
    <ul>
      {definitions()}
    </ul>
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

const useStorageState = (key, initialState) =>{
  const [value, setValue] = React.useState(localStorage.getItem(key) || initialState);
  
  React.useEffect(()=>{
    localStorage.setItem(key, value)
  }, [value, key]);

  return [value, setValue];
};

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

const getAsyncDict = () => new Promise ((resolve, reject) =>
  //setTimeout(reject, 1500)
  setTimeout(() => 
  resolve({data: {dict: dictionary}}), 1000)
  );

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

    const [searchTerm, setSearchTerm] = useStorageState('search', '');
    const [dropTerm, setDropTerm] =useStorageState('drop', '');
    const [dict, dispatchDict] =  React.useReducer(
      dictReducer,
      {data: [], isLoading: false, isError: false}
    );

    React.useEffect(() =>{
      dispatchDict({type:'LOADING_DICT'})

      getAsyncDict().then(result =>{
        dispatchDict({
          type: 'GET_DICT',
          payload: result.data.dict,
        });
      }).catch(()=>
      dispatchDict({type:'ERROR_FETCH'})
      );
    }, []);
    
    const handleSearch = (event) =>{
      setSearchTerm(event.target.value);
    };

    const handleDrop = (event) =>{
      setDropTerm(event.target.value)
    };

    const handleRemoveDict = (item) =>{
      dispatchDict({
        type: 'REMOVE_DICT',
        payload: item,
      });
    };

    const searchedDict = dict.data.filter(word => word.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    const dropedDict = dict.data.filter(word => word.title.toLocaleLowerCase().includes(dropTerm.toLocaleLowerCase()))
    
  return (
    <>
      <h1>Welcome to the dictionary</h1>
      <p>Just 3 defenition avaible now but more will come in the future.</p>

      <h2>Navigate with the searchbar</h2>
      <InputWithLabel
        isFocused
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search : </strong>
      </InputWithLabel>
      {dict.isError && <p>Something went wrong ...</p>}
      { dict.isLoading ? (
        <p>Loading ...</p>
      ):(<List list={searchedDict} onRemoveDef={handleRemoveDict} />)}

      <h2>Navigate with the dropdown</h2>
      <Dropdown
        label='Chose an definition : '
        options={dict}
        value={dropTerm}
        onChange={handleDrop}
      />
      {isError && <p>Something went wrong ...</p>}
      { isLoading ? (
        <p>Loading ...</p>
      ):(<List list={dropedDict} />)}
    </>
  );
};

export default App;