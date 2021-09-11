import React from 'react';

const Stats = (props) => {
    return (
        // TODO: Add some global styles to all of my sections. This is where I am going to put my spacing (container) logic so they line up correctly on mobile, tablet, and desktop.
        <div className="section">
            <h1 className="section-header">Stats</h1>
            <div className="stats-table">
                {/* The "in-table" class is to help add additional styling to these "stat" divs. This style is being reused in places of my app. */}
                <div className="stat in-table">
                    <p className="stat-title">Height</p>
                    <p className="stat-data">0.70cm</p>
                </div>
                <div className="stat in-table">
                    <p className="stat-title">Weight</p>
                    <p className="stat-data">6.9kg</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;