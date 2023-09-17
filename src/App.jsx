import { useState, useCallback, useEffect, useRef } from 'react';

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // Reference Hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*()_+-={}[]~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-8 py-10 text-orange-500 bg-gray-700 ">
      <h1 className="text-5xl font-bold text-white text-center pb-10">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 px-10">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-5 px-3 rounded-l "
          placeholder="Password"
          ref={passwordRef}
        />
        <button
          className="bg-orange-500 text-white px-5 py-2 rounded-r font-bold"
          onClick={copyPasswordToClipBoard}
        >
          COPY
        </button>
      </div>
      <div className="flex text-sm gap-x-6 justify-center">
        <div className="flex items-center gap-x-3">
          <input
            type="range"
            min={6}
            max={40}
            className="cursor-pointer"
            onChange={(e) => setLength(e.target.value)}
            value={length}
          />
          <label className="text-white text-lg">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label className="text-white text-lg">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={characterAllowed}
            onChange={() => {
              setCharacterAllowed((prev) => !prev);
            }}
          />
          <label className="text-white text-lg">Character</label>
        </div>
      </div>
    </div>
  );
};

export default App;

/**
 * Steps
 * 1. Set Length state to decide the length of the password
 * 2. Set NumberAllowed state to decide whether to include numbers in the password
 * 3. Set CharacterAllowed state to decide whether to include special characters in the password
 * 4. Set Password state to the generated password
 * 5. Wrote a passwordGenerator function using the useCallback hook. In this function, I have declared pass and str variables. pass variable is storing null initially, str variable initially stores alphabets. 
 * 6. Checking if numberAllowed state is true, if it is true, then I am appending the numbers to the str variable.
 * 7. Checking if characterAllowed state is true, if it is true, then I am appending the special characters to the str variable.
 * 8. Now, I have a for loop to generate the password. Inside the for loop, I am generating a random number from 1 to the length of the str variable. I am then using the charAt() method to get the character at the random number generated. I am then appending this character to the pass variable.

** useCallback hook is used because the passwordGenerator function is not changing. It is only changing when the length, numberAllowed, characterAllowed state changes. useCallback hook is caching the function declaration and calling it only when the dependencies are changing. if the dependencies are not supplied properly it may over optimize the memorization. useCallback is used only to optimize asynchronous functions.

* 9. The useEffect hook is used to generate the password when the length, numberAllowed, characterAllowed state changes. 

* 10. The passwordRef is used to get the password input element.

* 11 The copyPasswordToClipBoard function is used to copy the password to the clipboard. I have used the ref attribute to get the password input element. I have used the select() methods to select the password and setSelectionRange() set the length of text to copy. This creates an user effect which improves user experience in this case.  

* 11 The window.navigator.clipboard.writeText(password) is used to copy the password to the clipboard. 

** The passwordRef.current?.select() and passwordRef.current?.setSelectionRange(0, length) are used to select the password and set the length of the password.

 */
