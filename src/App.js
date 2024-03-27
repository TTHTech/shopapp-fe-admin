import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import DasboardPage from './pages/DasboardPage';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <DasboardPage></DasboardPage>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
