import { createContext, useEffect, useState } from 'react';

export const TutorialsContext = createContext(null);

export function TutorialsContextProvider({ children }) {
    const [tutorials, setTutorials] = useState(null);

    useEffect(() => {
        (async () => {
            let newTutorials;
            let valid = process.env.NODE_ENV !== 'development';

            try {
                const lastUpdated = Number(localStorage.getItem('lastUpdated'));
                if (lastUpdated && Date.now() - lastUpdated < 5 * 60 * 1000) {
                    newTutorials = JSON.parse(localStorage.getItem('tutorials'));
                } else {
                    valid = false;
                }
            } catch {
                valid = false;
            }
            if (!newTutorials) {
                valid = false;
            }

            if (!valid) {
                console.log('fetched');
                newTutorials = await (await fetch('/api/tutorials')).json();
                localStorage.setItem('tutorials', JSON.stringify(newTutorials));
                localStorage.setItem('lastUpdated', Date.now());
            }

            setTutorials(newTutorials);
        })();
    }, []);

    return <TutorialsContext.Provider value={tutorials}>{children}</TutorialsContext.Provider>;
}
