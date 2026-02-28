function App() {
  const helloToServer = async () => {
    const result = await window.api.sendMessage("Hello!");
    console.log(result);
  };

  return (
    <>
      <h1>Hello world</h1>
      <button onClick={helloToServer}>Hello to server</button>
    </>
  );
}

export default App;
