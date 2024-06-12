import PropTypes from 'prop-types';
import { createContext } from 'react';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
// utils
import getColorPresets, { colorPresets, defaultPreset } from '../utils/getColorPresets';
// config
import { defaultSettings } from '../config';

// ----------------------------------------------------------------------

// initial state
const initialState = {
    ...defaultSettings,
    onChangeMode: () => { },
    onToggleMode: () => { },
    onChangeDirection: () => { },
    onChangeColor: () => { },
    onToggleStretch: () => { },
    onChangeLayout: () => { },
    onResetSetting: () => { },
    setColor: defaultPreset,
    colorOption: [],
};

// context
const SettingsContext = createContext(initialState);

// ----------------------------------------------------------------------

SettingsProvider.propTypes = {
    children: PropTypes.node,
};

function SettingsProvider({ children }) {
    const [settings, setSettings] = useLocalStorage('settings', {
        themeMode: initialState.themeMode,
        themeDirection: initialState.themeDirection,
        themeColorPresets: initialState.themeColorPresets,
        themeStretch: initialState.themeStretch,
        themeLayout: initialState.themeLayout,
    });

    // onChangeMode
    const onChangeMode = (event) => {
        setSettings({
            ...settings,
            themeMode: event.target.value,
        });
    };

    // onToggleMode
    const onToggleMode = () => {
        setSettings({
            ...settings,
            themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
        });
    };

    // onChangeDirection
    const onChangeDirection = (event) => {
        setSettings({
            ...settings,
            themeDirection: event.target.value,
        });
    };

    // onChangeColor
    const onChangeColor = (event) => {
        setSettings({
            ...settings,
            themeColorPresets: event.target.value,
        });
    };

    // onChangeLayout
    const onChangeLayout = (event) => {
        setSettings({
            ...settings,
            themeLayout: event.target.value,
        });
    };

    // onToggleStretch
    const onToggleStretch = () => {
        setSettings({
            ...settings,
            themeStretch: !settings.themeStretch,
        });
    };

    // onResetSetting
    const onResetSetting = () => {
        setSettings({
            themeMode: initialState.themeMode,
            themeLayout: initialState.themeLayout,
            themeStretch: initialState.themeStretch,
            themeDirection: initialState.themeDirection,
            themeColorPresets: initialState.themeColorPresets,
        });
    };

    return (
        <SettingsContext.Provider
            value={{
                ...settings,
                // Mode
                onChangeMode,
                onToggleMode,
                // Direction
                onChangeDirection,
                // Color
                onChangeColor,
                setColor: getColorPresets(settings.themeColorPresets),
                colorOption: colorPresets.map((color) => ({
                    name: color.name,
                    value: color.main,
                })),
                // Stretch
                onToggleStretch,
                // Navbar Horizontal
                onChangeLayout,
                // Reset Setting
                onResetSetting,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export { SettingsProvider, SettingsContext };
