import React from 'react';

const Tag = (props) => {
    return (
        // An example: grass-tag, poison-tag, electric-tag
        <div className={`tag ${props.type}-tag`}>
            
        </div>
    );
};

export default Tag;