import * as React from "react";

//Function declaration:
function App(){ ... }

// Arrow function expression:
const App = () =>{ ... };

// in case of just returning a value:
const addOne = count => count+=1;

// in case just returning JSX:
const App=()=>( // we remove the curly brace
    <div>
        ...
    </div>
)


// in case or more code in between rendering JSX:
const App=()=>{
// More code 
return( 
    <div>
        ...
    </div>
)}
// using this declaration more often.