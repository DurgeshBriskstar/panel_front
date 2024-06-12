import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
// hooks
// ----------------------------------------------------------------------

// initial state
const initialState = {
    collapseClick: false,
    collapseHover: false,
    onToggleCollapse: () => { },
    onHoverEnter: () => { },
    onHoverLeave: () => { },
};

// context
const CollapseDrawerContext = createContext(initialState);

// ----------------------------------------------------------------------

CollapseDrawerProvider.propTypes = {
    children: PropTypes.node,
};

function CollapseDrawerProvider({ children }) {

    const [collapse, setCollapse] = useState({
        click: false,
        hover: false,
    });

    // handler toggle collapse onToggleCollapse
    const handleToggleCollapse = () => {
        setCollapse({ ...collapse, click: !collapse.click });
    };

    // handler hover enter onHoverEnter
    const handleHoverEnter = () => {
        if (collapse.click) {
            setCollapse({ ...collapse, hover: true });
        }
    };

    // handler hover leave onHoverLeave
    const handleHoverLeave = () => {
        setCollapse({ ...collapse, hover: false });
    };

    return (
        <CollapseDrawerContext.Provider
            value={{
                isCollapse: collapse.click && !collapse.hover,
                collapseClick: collapse.click,
                collapseHover: collapse.hover,
                onToggleCollapse: handleToggleCollapse,
                onHoverEnter: handleHoverEnter,
                onHoverLeave: handleHoverLeave,
            }}
        >
            {children}
        </CollapseDrawerContext.Provider>
    );
}

export { CollapseDrawerProvider, CollapseDrawerContext };
