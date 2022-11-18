/**
 * MyPromise
 * @param {Function} task - The task to invoke
 * @returns {Object} A thennable object.
 */
 const MyPromise = function (promise) {
    let promReturn = 123
    let value = (parm) => {promReturn = parm }
    promise(value);
    
    return {
      then: (resolve, reject) => {
        resolve(promReturn)
      }
    };
  };
  
  /// Do not edit below this line
  
  console.log("Before create");
  
  var p1 = new MyPromise((resolve) => {
    console.log("In promise task");
  
    setTimeout(() => {
      console.log("Resolving promise");
      resolve("abcdefg");
    }, 100);
  });
  
  console.log("After created promise");
  
  p1.then(
    (resolveValue) => {
      console.log("In reaction, resolveValue = " + resolveValue);
    },
    (rejectValue) => {
      console.log("In reaction, rejectValue = " + rejectValue);
    }
  );
  
  // Expected console.log output:
  //
  // Before create
  // In promise task
  // After created promise
  // Resolving promise
  // In reaction, resolveValue = abcdefg