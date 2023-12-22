import { useState, useEffect } from 'react';
import './App.css';

// the react component just a normal function, nothing special
function UseCallbackToSolveExhaustiveDeps() {
  function function_that_cause_exhaustive_deps() {
    // do something
  }

  useEffect(() => {
    function_that_cause_exhaustive_deps();
  }, []);

  return <>Comp A</>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UseCallbackToSolveExhaustiveDeps />
    </>
  );
}

export default App;
