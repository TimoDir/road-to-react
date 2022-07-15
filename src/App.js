import * as React from 'react';

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

const InputWithLabel = ({id, children, isFocused, type='text', value, onInputChange}) =>{
  //Declare that inputRef is now an ref object inputRef = {current = *whatever we put inside the ()*}
  const inputRef = React.useRef();

  React.useEffect(()=>{
    if(isFocused && inputRef.current){
      //it will call the element to focus if isFocused is declare as a props and be True
      inputRef.current.focus(); //So inputRef will be equal to {current = focus()} and calling the focus of an HTMLelement
    }
  }, [isFocused]) 

  return(
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef} // depending of the ref object and so if isFocused is pass as a props it will triger the focus without rerender the component
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

    const [searchTerm, setSearchTerm] = useStorageState('search', '');
    const [dropTerm, setDropTerm] =useStorageState('drop', '');
    
    const handleSearch = (event) =>{
      setSearchTerm(event.target.value);
    };

    const handleDrop = (event) =>{
      setDropTerm(event.target.value)
    };

    const searchedDict = dict.filter(word => word.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
    const dropedDict = dict.filter(word => word.title.toLocaleLowerCase().includes(dropTerm.toLocaleLowerCase()))
  
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
      <List list={searchedDict} />

      <h2>Navigate with the dropdown</h2>
      <Dropdown
        label='Chose an definition : '
        options={dict}
        value={dropTerm}
        onChange={handleDrop}
      />
      <List list={dropedDict} />
    </>
  );
};

export default App;