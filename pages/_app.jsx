import { TutorialsContextProvider } from '../components/TutorialsContext';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <TutorialsContextProvider>
            <Component {...pageProps} />
        </TutorialsContextProvider>
    );
}

export default MyApp;
