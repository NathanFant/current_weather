import { createContext, useContext, useState } from "react";

const CoordsContext = createContext();

export function CoordsProvider({children}) {
    const [coords, setCoords] = useState(null);

    return (
        <CoordsContext.Provider value={{ coords, setCoords}}>
            {children}
        </CoordsContext.Provider>
    );
}

export function useCoords() {
    return useContext(CoordsContext);
}
