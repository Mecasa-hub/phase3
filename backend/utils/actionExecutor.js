const axios = require('axios');
const { TwitterApi } = require('twitter-api-v2');
const OpenAI = require('openai');
const cron = require('node-cron');
const { Client: ElasticsearchClient } = require('@elastic/elasticsearch');
const { WebClient: SlackClient } = require('@slack/web-api');
// Will be imported dynamically when needed
let Octokit;
const { google } = require('googleapis');
const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');
const mysql = require('mysql2/promise');
const { Client: PgClient } = require('pg');
const Redis = require('redis');
const mqtt = require('mqtt');
const stripe = require('stripe');
const { createClient: createSupabaseClient } = require('@supabase/supabase-js');

class ActionExecutor {
  constructor() {
    this.twitterClients = new Map();
    this.openaiClients = new Map();
    this.webhookSchedules = new Map();
    this.elasticClients = new Map();
    this.slackClients = new Map();
    this.githubClients = new Map();
    this.mysqlConnections = new Map();
    this.pgClients = new Map();
    this.redisClients = new Map();
    this.mqttClients = new Map();
    this.supabaseClients = new Map();
  }

  // Client getters
  getOpenAIClient(apiKey) {
    if (!this.openaiClients.has(apiKey)) {
      const client = new OpenAI({ apiKey });
      this.openaiClients.set(apiKey, client);
    }
    return this.openaiClients.get(apiKey);
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

  getElasticClient(config) {
    const key = JSON.stringify(config);
    if (!this.elasticClients.has(key)) {
      const client = new ElasticsearchClient(config);
      this.elasticClients.set(key, client);
    }
    return this.elasticClients.get(key);
  }

  getSlackClient(token) {
    if (!this.slackClients.has(token)) {
      const client = new SlackClient(token);
      this.slackClients.set(token, client);
    }
    return this.slackClients.get(token);
  }

  async getGithubClient(token) {
    if (!this.githubClients.has(token)) {
      const { Octokit } = await import('@octokit/rest');
      const client = new Octokit({ auth: token });
      this.githubClients.set(token, client);
    }
    return this.githubClients.get(token);
  }

  async getMysqlConnection(config) {
    const key = JSON.stringify(config);
    if (!this.mysqlConnections.has(key)) {
      const connection = await mysql.createConnection(config);
      this.mysqlConnections.set(key, connection);
    }
    return this.mysqlConnections.get(key);
  }

  async getPgClient(config) {
    const key = JSON.stringify(config);
    if (!this.pgClients.has(key)) {
      const client = new PgClient(config);
      await client.connect();
      this.pgClients.set(key, client);
    }
    return this.pgClients.get(key);
  }

  async getRedisClient(config) {
    const key = JSON.stringify(config);
    if (!this.redisClients.has(key)) {
      const client = Redis.createClient(config);
      await client.connect();
      this.redisClients.set(key, client);
    }
    return this.redisClients.get(key);
  }

  getMqttClient(config) {
    const key = JSON.stringify(config);
    if (!this.mqttClients.has(key)) {
      const client = mqtt.connect(config.url, config.options);
      this.mqttClients.set(key, client);
    }
    return this.mqttClients.get(key);
  }

  getSupabaseClient(config) {
    const key = JSON.stringify(config);
    if (!this.supabaseClients.has(key)) {
      const client = createSupabaseClient(config.url, config.key);
      this.supabaseClients.set(key, client);
    }
    return this.supabaseClients.get(key);
  }

  async execute(action, params) {
    switch (action) {
      // HTTP Actions
      case 'HTTP_REQUEST':
        return this.httpRequest(params);
      case 'DELAY':
        return this.delay(params.milliseconds);
      
      // Webhook Actions
      case 'WEBHOOK_SCHEDULE':
        return this.scheduleWebhook(params);
      case 'WEBHOOK_CANCEL':
        return this.cancelWebhook(params);
        
      // OpenAI Actions
      case 'OPENAI_CHAT':
        return this.openaiChat(params);
      case 'OPENAI_ASSISTANT':
        return this.openaiAssistant(params);
        
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

      // Elasticsearch Actions
      case 'ELASTIC_INDEX':
        return this.elasticIndex(params);
      case 'ELASTIC_SEARCH':
        return this.elasticSearch(params);
      case 'ELASTIC_DELETE':
        return this.elasticDelete(params);

      // Slack Actions
      case 'SLACK_POST_MESSAGE':
        return this.slackPostMessage(params);
      case 'SLACK_UPDATE_MESSAGE':
        return this.slackUpdateMessage(params);

      // GitHub Actions
      case 'GITHUB_CREATE_ISSUE':
        return this.githubCreateIssue(params);
      case 'GITHUB_CREATE_PR':
        return this.githubCreatePR(params);

      // Google Services Actions
      case 'GMAIL_SEND':
        return this.gmailSend(params);
      case 'SHEETS_UPDATE':
        return this.sheetsUpdate(params);
      case 'DRIVE_UPLOAD':
        return this.driveUpload(params);

      // Database Actions
      case 'MYSQL_QUERY':
        return this.mysqlQuery(params);
      case 'PG_QUERY':
        return this.pgQuery(params);
      case 'REDIS_COMMAND':
        return this.redisCommand(params);

      // Messaging Actions
      case 'TWILIO_SEND_SMS':
        return this.twilioSendSMS(params);
      case 'SENDGRID_SEND_EMAIL':
        return this.sendgridSendEmail(params);
      case 'MQTT_PUBLISH':
        return this.mqttPublish(params);

      // Payment Actions
      case 'STRIPE_CREATE_CHARGE':
        return this.stripeCreateCharge(params);
      case 'STRIPE_CREATE_CUSTOMER':
        return this.stripeCreateCustomer(params);

      // Supabase Actions
      case 'SUPABASE_QUERY':
        return this.supabaseQuery(params);
      case 'SUPABASE_UPLOAD':
        return this.supabaseUpload(params);

      default:
        throw new Error(`Unsupported action: ${action}`);
    }
  }

  // Elasticsearch Methods
  async elasticIndex(params) {
    try {
      const client = this.getElasticClient(params.config);
      const result = await client.index({
        index: params.index,
        document: params.document,
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async elasticSearch(params) {
    try {
      const client = this.getElasticClient(params.config);
      const result = await client.search({
        index: params.index,
        query: params.query,
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async elasticDelete(params) {
    try {
      const client = this.getElasticClient(params.config);
      const result = await client.delete({
        index: params.index,
        id: params.id,
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Slack Methods
  async slackPostMessage(params) {
    try {
      const client = this.getSlackClient(params.token);
      const result = await client.chat.postMessage({
        channel: params.channel,
        text: params.text,
        blocks: params.blocks,
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async slackUpdateMessage(params) {
    try {
      const client = this.getSlackClient(params.token);
      const result = await client.chat.update({
        channel: params.channel,
        ts: params.ts,
        text: params.text,
        blocks: params.blocks,
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // GitHub Methods
  async githubCreateIssue(params) {
    try {
      const client = this.getGithubClient(params.token);
      const result = await client.issues.create({
        owner: params.owner,
        repo: params.repo,
        title: params.title,
        body: params.body,
        labels: params.labels,
      });
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async githubCreatePR(params) {
    try {
      const client = this.getGithubClient(params.token);
      const result = await client.pulls.create({
        owner: params.owner,
        repo: params.repo,
        title: params.title,
        body: params.body,
        head: params.head,
        base: params.base,
      });
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Google Services Methods
  async gmailSend(params) {
    try {
      const auth = new google.auth.JWT(
        params.credentials.client_email,
        null,
        params.credentials.private_key,
        ['https://www.googleapis.com/auth/gmail.send']
      );
      const gmail = google.gmail({ version: 'v1', auth });
      const result = await gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: Buffer.from(
            `To: ${params.to}\r\n` +
            `Subject: ${params.subject}\r\n\r\n` +
            `${params.body}`
          ).toString('base64'),
        },
      });
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sheetsUpdate(params) {
    try {
      const auth = new google.auth.JWT(
        params.credentials.client_email,
        null,
        params.credentials.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
      );
      const sheets = google.sheets({ version: 'v4', auth });
      const result = await sheets.spreadsheets.values.update({
        spreadsheetId: params.spreadsheetId,
        range: params.range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: params.values,
        },
      });
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Database Methods
  async mysqlQuery(params) {
    try {
      const connection = await this.getMysqlConnection(params.config);
      const [rows] = await connection.execute(params.query, params.values);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async pgQuery(params) {
    try {
      const client = await this.getPgClient(params.config);
      const result = await client.query(params.query, params.values);
      return { success: true, data: result.rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async redisCommand(params) {
    try {
      const client = await this.getRedisClient(params.config);
      const result = await client[params.command](...params.args);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Messaging Methods
  async twilioSendSMS(params) {
    try {
      const client = twilio(params.accountSid, params.authToken);
      const message = await client.messages.create({
        body: params.body,
        to: params.to,
        from: params.from,
      });
      return { success: true, data: message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async sendgridSendEmail(params) {
    try {
      sgMail.setApiKey(params.apiKey);
      const result = await sgMail.send({
        to: params.to,
        from: params.from,
        subject: params.subject,
        text: params.text,
        html: params.html,
      });
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async mqttPublish(params) {
    try {
      const client = this.getMqttClient(params.config);
      await new Promise((resolve, reject) => {
        client.publish(params.topic, params.message, params.options, (error) => {
          if (error) reject(error);
          else resolve();
        });
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Payment Methods
  async stripeCreateCharge(params) {
    try {
      const stripeClient = stripe(params.apiKey);
      const charge = await stripeClient.charges.create({
        amount: params.amount,
        currency: params.currency,
        source: params.source,
        description: params.description,
      });
      return { success: true, data: charge };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async stripeCreateCustomer(params) {
    try {
      const stripeClient = stripe(params.apiKey);
      const customer = await stripeClient.customers.create({
        email: params.email,
        source: params.source,
        name: params.name,
      });
      return { success: true, data: customer };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Supabase Methods
  async supabaseQuery(params) {
    try {
      const client = this.getSupabaseClient(params.config);
      const { data, error } = await client
        .from(params.table)
        [params.operation](...params.args);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async supabaseUpload(params) {
    try {
      const client = this.getSupabaseClient(params.config);
      const { data, error } = await client.storage
        .from(params.bucket)
        .upload(params.path, params.file);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Existing methods...
  async httpRequest(params) {
    try {
      const { method, url, headers = {}, data = null, queryParams = {}, auth = null, timeout = 30000 } = params;
      
      const config = {
        method: method.toLowerCase(),
        url,
        headers,
        timeout,
        params: queryParams
      };

      if (data) {
        config.data = data;
      }

      if (auth) {
        switch (auth.type) {
          case 'basic':
            config.auth = {
              username: auth.username,
              password: auth.password
            };
            break;
          case 'bearer':
            config.headers.Authorization = `Bearer ${auth.token}`;
            break;
          case 'apiKey':
            if (auth.in === 'header') {
              config.headers[auth.name] = auth.value;
            } else if (auth.in === 'query') {
              config.params[auth.name] = auth.value;
            }
            break;
        }
      }

      const response = await axios(config);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async scheduleWebhook(params) {
    try {
      const { id, schedule, url, method = 'GET', data = null } = params;
      
      if (this.webhookSchedules.has(id)) {
        this.webhookSchedules.get(id).stop();
      }

      const task = cron.schedule(schedule, async () => {
        try {
          await this.httpRequest({
            method,
            url,
            data
          });
        } catch (error) {
          console.error(`Webhook ${id} execution failed:`, error);
        }
      });

      this.webhookSchedules.set(id, task);
      return { success: true, message: `Webhook ${id} scheduled` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async cancelWebhook(params) {
    try {
      const { id } = params;
      if (this.webhookSchedules.has(id)) {
        this.webhookSchedules.get(id).stop();
        this.webhookSchedules.delete(id);
        return { success: true, message: `Webhook ${id} cancelled` };
      }
      return { success: false, error: `Webhook ${id} not found` };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Twitter Methods (keeping all existing Twitter methods...)
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

  // ... (keeping all other existing Twitter methods)

  // OpenAI Methods (keeping all existing OpenAI methods...)
  async openaiChat(params) {
    try {
      const { apiKey, model, messages, temperature = 0.7, maxTokens } = params;
      const client = this.getOpenAIClient(apiKey);
      
      const response = await client.chat.completions.create({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      });

      return { success: true, data: response.choices[0].message };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async openaiAssistant(params) {
    try {
      const { apiKey, assistantId, instructions, model = 'gpt-4', temperature = 0.7 } = params;
      const client = this.getOpenAIClient(apiKey);

      const thread = await client.beta.threads.create();
      await client.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: instructions
      });

      const run = await client.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
        model,
        temperature
      });

      let runStatus = await client.beta.threads.runs.retrieve(thread.id, run.id);
      while (runStatus.status !== 'completed') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        runStatus = await client.beta.threads.runs.retrieve(thread.id, run.id);
        
        if (runStatus.status === 'failed') {
          throw new Error('Assistant run failed');
        }
      }

      const messages = await client.beta.threads.messages.list(thread.id);
      const lastMessage = messages.data[0];

      return { success: true, data: lastMessage.content[0].text.value };
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
