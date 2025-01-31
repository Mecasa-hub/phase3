const actionExecutor = require('../utils/actionExecutor');

class WorkflowExecutor {
  constructor() {
    this.nodeResults = new Map();
  }

  async executeWorkflow(workflow) {
    try {
      this.nodeResults.clear();
      const sortedNodes = this.topologicalSort(workflow.nodes, workflow.edges);
      
      for (const node of sortedNodes) {
        const result = await this.executeNode(node, workflow.credentials);
        this.nodeResults.set(node.id, result);
      }

      return {
        success: true,
        results: Object.fromEntries(this.nodeResults)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async executeNode(node, credentials) {
    try {
      const params = await this.resolveNodeParams(node, credentials);
      
      switch (node.type) {
        case 'webhook':
          return await actionExecutor.execute('WEBHOOK_SCHEDULE', {
            id: node.id,
            schedule: params.schedule,
            url: params.url,
            method: params.method,
            data: params.data
          });

        case 'httpRequest':
          return await actionExecutor.execute('HTTP_REQUEST', {
            method: params.method,
            url: params.url,
            headers: params.headers,
            queryParams: params.queryParams,
            data: params.data,
            auth: params.auth,
            timeout: params.timeout
          });

        case 'agent': {
          if (params.provider === 'openai') {
            const credential = credentials.find(c => c.type === 'openai');
            if (!credential) {
              throw new Error('OpenAI credentials not found');
            }
            return await actionExecutor.execute('OPENAI_ASSISTANT', {
              apiKey: credential.data.apiKey,
              assistantId: params.assistantId,
              instructions: params.instructions,
              model: params.model,
              temperature: params.temperature
            });
          }
          throw new Error(`Unsupported agent provider: ${params.provider}`);
        }

        case 'twitter': {
          const credential = credentials.find(c => c.type === 'twitter');
          if (!credential) {
            throw new Error('Twitter credentials not found');
          }
          return await actionExecutor.execute(`TWITTER_${params.operation.toUpperCase()}`, {
            ...credential.data,
            ...params
          });
        }

        case 'elasticsearch': {
          const credential = credentials.find(c => c.type === 'elasticsearch');
          if (!credential) {
            throw new Error('Elasticsearch credentials not found');
          }
          return await actionExecutor.execute(`ELASTIC_${params.operation.toUpperCase()}`, {
            config: credential.data,
            ...params
          });
        }

        case 'slack': {
          const credential = credentials.find(c => c.type === 'slack');
          if (!credential) {
            throw new Error('Slack credentials not found');
          }
          return await actionExecutor.execute(`SLACK_${params.operation.toUpperCase()}`, {
            token: credential.data.token,
            ...params
          });
        }

        case 'github': {
          const credential = credentials.find(c => c.type === 'github');
          if (!credential) {
            throw new Error('GitHub credentials not found');
          }
          return await actionExecutor.execute(`GITHUB_${params.operation.toUpperCase()}`, {
            token: credential.data.token,
            ...params
          });
        }

        case 'gmail': {
          const credential = credentials.find(c => c.type === 'gmail');
          if (!credential) {
            throw new Error('Gmail credentials not found');
          }
          return await actionExecutor.execute('GMAIL_SEND', {
            credentials: credential.data,
            ...params
          });
        }

        case 'sheets': {
          const credential = credentials.find(c => c.type === 'google');
          if (!credential) {
            throw new Error('Google credentials not found');
          }
          return await actionExecutor.execute('SHEETS_UPDATE', {
            credentials: credential.data,
            ...params
          });
        }

        case 'mysql': {
          const credential = credentials.find(c => c.type === 'mysql');
          if (!credential) {
            throw new Error('MySQL credentials not found');
          }
          return await actionExecutor.execute('MYSQL_QUERY', {
            config: credential.data,
            ...params
          });
        }

        case 'postgres': {
          const credential = credentials.find(c => c.type === 'postgres');
          if (!credential) {
            throw new Error('PostgreSQL credentials not found');
          }
          return await actionExecutor.execute('PG_QUERY', {
            config: credential.data,
            ...params
          });
        }

        case 'redis': {
          const credential = credentials.find(c => c.type === 'redis');
          if (!credential) {
            throw new Error('Redis credentials not found');
          }
          return await actionExecutor.execute('REDIS_COMMAND', {
            config: credential.data,
            ...params
          });
        }

        case 'twilio': {
          const credential = credentials.find(c => c.type === 'twilio');
          if (!credential) {
            throw new Error('Twilio credentials not found');
          }
          return await actionExecutor.execute('TWILIO_SEND_SMS', {
            accountSid: credential.data.accountSid,
            authToken: credential.data.authToken,
            ...params
          });
        }

        case 'sendgrid': {
          const credential = credentials.find(c => c.type === 'sendgrid');
          if (!credential) {
            throw new Error('SendGrid credentials not found');
          }
          return await actionExecutor.execute('SENDGRID_SEND_EMAIL', {
            apiKey: credential.data.apiKey,
            ...params
          });
        }

        case 'mqtt': {
          const credential = credentials.find(c => c.type === 'mqtt');
          if (!credential) {
            throw new Error('MQTT credentials not found');
          }
          return await actionExecutor.execute('MQTT_PUBLISH', {
            config: credential.data,
            ...params
          });
        }

        case 'stripe': {
          const credential = credentials.find(c => c.type === 'stripe');
          if (!credential) {
            throw new Error('Stripe credentials not found');
          }
          return await actionExecutor.execute(`STRIPE_${params.operation.toUpperCase()}`, {
            apiKey: credential.data.apiKey,
            ...params
          });
        }

        case 'supabase': {
          const credential = credentials.find(c => c.type === 'supabase');
          if (!credential) {
            throw new Error('Supabase credentials not found');
          }
          return await actionExecutor.execute(`SUPABASE_${params.operation.toUpperCase()}`, {
            config: {
              url: credential.data.url,
              key: credential.data.key
            },
            ...params
          });
        }

        default:
          throw new Error(`Unsupported node type: ${node.type}`);
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async resolveNodeParams(node, credentials) {
    const params = { ...node.data };
    
    // Resolve dynamic values using previous node results
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'string' && value.startsWith('={{') && value.endsWith('}}')) {
        const expression = value.slice(3, -2).trim();
        params[key] = await this.evaluateExpression(expression);
      }
    }

    return params;
  }

  async evaluateExpression(expression) {
    // Create a context with node results
    const context = {
      $: (nodeId) => {
        const result = this.nodeResults.get(nodeId);
        if (!result) {
          throw new Error(`Node result not found: ${nodeId}`);
        }
        return result;
      },
      $json: {}
    };

    // Add node results to context
    for (const [nodeId, result] of this.nodeResults) {
      context.$json[nodeId] = result;
    }

    // Safely evaluate the expression in the context
    try {
      // Parse the expression to extract node ID and property path
      const match = expression.match(/\$\('([^']+)'\)\.(.+)/);
      if (!match) {
        throw new Error('Invalid expression format');
      }

      const [, nodeId, path] = match;
      const nodeResult = context.$(nodeId);

      // Safely traverse the property path
      return path.split('.').reduce((obj, prop) => {
        if (obj && typeof obj === 'object') {
          return obj[prop];
        }
        throw new Error(`Cannot access property ${prop}`);
      }, nodeResult);
    } catch (error) {
      throw new Error(`Expression evaluation failed: ${error.message}`);
    }
  }

  topologicalSort(nodes, edges) {
    const graph = new Map();
    const visited = new Set();
    const sorted = [];

    // Build adjacency list
    for (const node of nodes) {
      graph.set(node.id, []);
    }
    for (const edge of edges) {
      graph.get(edge.source).push(edge.target);
    }

    // DFS function for topological sort
    const visit = (nodeId) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);
      
      const neighbors = graph.get(nodeId) || [];
      for (const neighbor of neighbors) {
        visit(neighbor);
      }
      
      sorted.unshift(nodes.find(n => n.id === nodeId));
    };

    // Visit all nodes
    for (const node of nodes) {
      visit(node.id);
    }

    return sorted;
  }
}

module.exports = new WorkflowExecutor();
