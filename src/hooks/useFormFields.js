import { useState } from "react";

export default initialState => {
  const [fields, setValues] = useState(initialState);
  
  return [
    fields,
    function(event) {
      setValues({
        ...fields,
        [event.target.name]: event.target.value
      });
    }
  ];
}

// ========================> CONCEPTS <============================
// 1) custom hooks
// 2) function within an array as an element - setting values of state within the function 
// ===============================================================