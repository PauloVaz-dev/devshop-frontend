import React from 'react'

import '../css/styles.css'

const App = ({ Component, pagePropos}) => {
    return (
        <div>
            <Component { ...pagePropos} />
        </div>
    )
}

export default App
