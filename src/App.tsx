import { RouterProvider } from "react-router-dom";
import router from './router/router.js'
import "./scss/style.scss";


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
