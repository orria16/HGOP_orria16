# Day 11
## Answer to Day11 questions
### Server.js
Question: Explain why we put each consecutive call inside the onSuccess callback of the previous database call instead of just placing them next to eachother

Answer: The reason we put each consecutive call inside the onSuccess callback of the previous database call is because the database should only handle a limited number of client connections at a time and to avoid crashing or failure it is better to call one at a time, and JavaScript(NodeJS) is a interpreted programming language it does not read line by line like traditional languages such as C++, java and so on. Furthermore these functions are asyncronous (relies on callbacks) they will pass on success or fail from the innermost function outwards, therefore if one fails it will pass on an error callback which is then passed on recursively stopping the rest of the functions.

### Server.api-test.js
Question: What does the "done" parameter do?

Answer: "Done" is a callback function that is provided into jest and passed down into the server.lib-test file, the test will run until "done" or "done.fail" are called or it timed out. In our case we are calling done.fail when "request" callbacks return error which then tells jest that the test has failed. Our only case where it calls done is when the game is over.