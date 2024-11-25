import app from "./index.js"; 

const port = process.env.PORT || 8000; 

// app is listening at the given number port 
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
