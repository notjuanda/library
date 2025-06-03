import { RouterProvider } from 'react-router-dom';
import router from './modules/core/router/Router';
import { AuthProvider } from './modules/core/providers/auth.provider';

const App = ()=>{
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>    
    )
}
export default App;