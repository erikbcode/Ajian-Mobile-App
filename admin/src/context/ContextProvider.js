import React, {createContext, useContext, useState} from 'react';

const StateContext = createContext();

const initialState = {
    userProfile: false,
}

export const ContextProvider = ({ children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
;
    const setMode = (e) => {
        setCurrentMode(e.target.value);

        localStorage.setItem('themeMode', e.target.value);

        setThemeSettings(false);
    }

    const handleClick = (clicked) => setIsClicked({...initialState, [clicked]:true });
    return (
        <StateContext.Provider
            value ={{
                activeMenu, 
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentMode,
                setCurrentMode,
                themeSettings, setThemeSettings,
                setMode}}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext (StateContext);