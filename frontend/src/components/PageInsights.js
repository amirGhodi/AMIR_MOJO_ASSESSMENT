import React from 'react';

const PageInsights = ({ insights }) => {
  if (!insights) {
    return (
      <div>
        <p>No insights available for this page.</p>
      </div>
    );
  }

  const insightGroupStyle = {
    marginBottom: '20px',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '4px',
  };

  const insightCardStyle = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '15px',
    marginBottom: '10px',
  };

  const headingStyle = {
    fontSize: '1.2em',
    marginBottom: '10px',
  };

  const descriptionStyle = {
    fontSize: '1em',
    lineHeight: '1.4',
  };

  return (
    <div>
      <div style={insightGroupStyle} className="insight-group">
        <div style={insightCardStyle} className="insight-card">
          <h2 style={headingStyle}>Total Followers/Fans</h2>
          <p style={descriptionStyle}>{insights.totalFans}</p>
        </div>
        <div style={insightCardStyle} className="insight-card">
          <h2 style={headingStyle}>Total Engagement</h2>
          <p style={descriptionStyle}>{insights.totalEngagement}</p>
        </div>
        <div style={insightCardStyle} className="insight-card">
          <h2 style={headingStyle}>Total Impressions</h2>
          <p style={descriptionStyle}>{insights.totalImpressions}</p>
        </div>
        <div style={insightCardStyle} className="insight-card">
          <h2 style={headingStyle}>Total Reactions</h2>
          <p style={descriptionStyle}>{insights.totalReactions}</p>
        </div>
      </div>
    </div>
  );
};

export default PageInsights;
