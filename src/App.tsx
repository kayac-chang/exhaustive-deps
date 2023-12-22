import { useState, useEffect, useCallback } from "react";
import "./App.css";

// **Notice**
// the react effect is not **watch** or **observe** the state
// it just the side effect when the function is called

function ExhaustiveDeps() {
  const [count, setCount] = useState(0);

  function function_that_cause_exhaustive_deps() {
    // this function try to read the count state,
    // but it only closure the count state when the component is mounted
    // so it always read the initial value of count state, which is 0
    console.log("exhaustive deps", count);
  }

  useEffect(() => {
    function_that_cause_exhaustive_deps();
  }, []);

  return (
    <button onClick={() => setCount(count + 1)}>ExhaustiveDeps: {count}</button>
  );
}

// the react component just a normal function, nothing special
function AddDepsToAvoidExhaustiveDeps() {
  const [count, setCount] = useState(0);

  // so every render will create a new function
  // since the function is new, the useEffect will run again
  function function_that_cause_exhaustive_deps() {
    console.log("add dependencies array to avoid exhaustive deps", count);
  }

  useEffect(() => {
    function_that_cause_exhaustive_deps();
    // add the function_that_cause_exhaustive_deps to the dependency array
  }, [function_that_cause_exhaustive_deps]);

  return (
    <button onClick={() => setCount(count + 1)}>
      AddDepsToAvoidExhaustiveDeps: {count}
    </button>
  );
}

function UseCallbackToAvoidExhaustiveDeps() {
  const [count, setCount] = useState(0);

  // we want to avoid unnecessary re-run of useEffect
  // so we use useCallback to memoize the function
  // we only create a new function when the count state is changed
  const function_that_cause_exhaustive_deps = useCallback(() => {
    console.log("use callback to avoid exhaustive deps", count);
  }, [count]);

  useEffect(() => {
    function_that_cause_exhaustive_deps();
    // add the function_that_cause_exhaustive_deps to the dependency array
  }, [function_that_cause_exhaustive_deps]);

  return (
    <button onClick={() => setCount(count + 1)}>
      UseCallbackToAvoidExhaustiveDeps: {count}
    </button>
  );
}

// the function is not depend on the component state
// so we can move it outside the component
function function_that_unnessary_inside_component(count: number) {
  console.log("function that unnessary inside component", count);
}

function MoveInnerFunctionOut() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function_that_unnessary_inside_component(count);
    // we add the count state to the dependency array
    // so when the count state is changed, the useEffect will run
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      MoveInnerFunctionOut: {count}
    </button>
  );
}

function App() {
  return (
    <>
      <h3>Open your console</h3>
      <div style={{ display: "grid", gap: "1rem" }}>
        <ExhaustiveDeps />
        <AddDepsToAvoidExhaustiveDeps />
        <UseCallbackToAvoidExhaustiveDeps />
        <MoveInnerFunctionOut />
      </div>
    </>
  );
}

export default App;
