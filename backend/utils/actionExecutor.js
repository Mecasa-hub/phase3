const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');

class ActionExecutor {
  constructor() {
    this.twitterClients = new Map();
  }

  getTwitterClient(credentials) {
    const key = JSON.stringify(credentials);
    if (!this.twitterClients.has(key)) {
      const client = new TwitterApi({
        appKey: credentials.apiKey,
        appSecret: credentials.apiSecret,
        accessToken: credentials.accessToken,
        accessSecret: credentials.accessTokenSecret,
      });
      this.twitterClients.set(key, client);
    }
    return this.twitterClients.get(key);
  }

  async execute(action, params) {
    switch (action) {
      case 'HTTP_GET':
        return this.httpGet(params.url);
      case 'HTTP_POST':
        return this.httpPost(params.url, params.data);
      case 'DELAY':
        return this.delay(params.milliseconds);
      
      // Twitter Actions
      case 'TWITTER_POST_TWEET':
        return this.postTweet(params);
      case 'TWITTER_POST_REPLY':
        return this.postReply(params);
      case 'TWITTER_DELETE_TWEET':
        return this.deleteTweet(params);
      case 'TWITTER_RETWEET':
        return this.retweet(params);
      case 'TWITTER_UNRETWEET':
        return this.unretweet(params);
      case 'TWITTER_LIKE':
        return this.likeTweet(params);
      case 'TWITTER_UNLIKE':
        return this.unlikeTweet(params);
      case 'TWITTER_FOLLOW':
        return this.followUser(params);
      case 'TWITTER_UNFOLLOW':
        return this.unfollowUser(params);
      case 'TWITTER_GET_USER_INFO':
        return this.getUserInfo(params);
      case 'TWITTER_GET_TWEET':
        return this.getTweet(params);
      case 'TWITTER_SEARCH_TWEETS':
        return this.searchTweets(params);
      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }

  // Twitter Methods
  async postTweet(params) {
    try {
      const client = this.getTwitterClient(params);
      const tweet = await client.v2.tweet(params.tweetText);
      return { success: true, data: tweet };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async postReply(params) {
    try {
      const client = this.getTwitterClient(params);
      const tweet = await client.v2.reply(params.tweetText, params.tweetId);
      return { success: true, data: tweet };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteTweet(params) {
    try {
      const client = this.getTwitterClient(params);
      const result = await client.v2.deleteTweet(params.tweetId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async retweet(params) {
    try {
      const client = this.getTwitterClient(params);
      const result = await client.v2.retweet(params.userId, params.tweetId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async unretweet(params) {
    try {
      const client = this.getTwitterClient(params);
      const result = await client.v2.unretweet(params.userId, params.tweetId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async likeTweet(params) {
    try {
      const client = this.getTwitterClient(params);
      const result = await client.v2.like(params.userId, params.tweetId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async unlikeTweet(params) {
    try {
      const client = this.getTwitterClient(params);
      const result = await client.v2.unlike(params.userId, params.tweetId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async followUser(params) {
    try {
      const client = this.getTwitterClient(params);
      const result = await client.v2.follow(params.userId, params.targetUserId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async unfollowUser(params) {
    try {
      const client = this.getTwitterClient(params);
      const result = await client.v2.unfollow(params.userId, params.targetUserId);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getUserInfo(params) {
    try {
      const client = this.getTwitterClient(params);
      const user = await client.v2.userByUsername(params.username);
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getTweet(params) {
    try {
      const client = this.getTwitterClient(params);
      const tweet = await client.v2.singleTweet(params.tweetId);
      return { success: true, data: tweet };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async searchTweets(params) {
    try {
      const client = this.getTwitterClient(params);
      const tweets = await client.v2.search(params.searchQuery);
      return { success: true, data: tweets };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async httpGet(url) {
    try {
      const response = await axios.get(url);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async httpPost(url, data) {
    try {
      const response = await axios.post(url, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async delay(milliseconds) {
    await new Promise(resolve => setTimeout(resolve, milliseconds));
    return { success: true, message: `Delayed for ${milliseconds}ms` };
  }
}

module.exports = new ActionExecutor();
