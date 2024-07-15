const axios = require('axios');
const querystring = require('querystring');
const dotenv = require("dotenv");
dotenv.config();


exports.facebookLogin = (req, res) => {
  const backendURL = process.env.BACKEND_URL || 'https://localhost:5000';
  const { code } = req.query;
  const redirectUri = `${backendURL}/api/facebook/callback`;
  
  const params = querystring.stringify({
    client_id: process.env.FACEBOOK_APP_ID,
    redirect_uri: redirectUri,
    client_secret: process.env.FACEBOOK_APP_SECRET,
    code
  });

  axios.get(`https://graph.facebook.com/v10.0/oauth/access_token?${params}`)
    .then(response => {
      const { access_token } = response.data;
      return axios.get(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${access_token}`);
    })
    .then(response => {
      const user = response.data;
      res.json(user);
    })
    .catch(error => {
      res.status(500).send('Error during Facebook login');
    });
};

exports.getFacebookPages = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const response = await axios.get(`https://graph.facebook.com/v10.0/me/accounts`, {
      params: { access_token: accessToken },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error retrieving Facebook pages');
  }
};

exports.getPageInsights = async (req, res) => {
  const { pageId, accessToken } = req.body;
  const since = req.query.since;
  const until = req.query.until;
  const metrics = ['page_fans','page_impressions', 'page_post_engagements', 'page_actions_post_reactions_total'];
  if (!pageId || !accessToken) {
    return res.status(400).json({ error: 'Page ID and access token are required' });
  }
  try {
    const insightsPromises = metrics.map(metric =>
      axios.get(`https://graph.facebook.com/v10.0/${pageId}/insights`, {
        params: { metric: metric, access_token: accessToken, since, until, period: 'total_over_range' },
      })
    );
    const insightsResponses = await Promise.all(insightsPromises);
    const insights = insightsResponses.map(response => response.data);
    res.json(insights);
  } catch (error) {
    console.error('Error retrieving page insights:', error);
    res.status(500).send('Error retrieving page insights');
  }
};
