import AgentNode from './AgentNode';
import CalculatorNode from './CalculatorNode';
import TelegramNode from './TelegramNode';
import GmailNode from './GmailNode';
import DropboxNode from './DropboxNode';
import MySQLNode from './MySQLNode';
import PostgresNode from './PostgresNode';
import GoogleDriveNode from './GoogleDriveNode';
import GitLabNode from './GitLabNode';
import BitbucketNode from './BitbucketNode';
import JiraNode from './JiraNode';
import TrelloNode from './TrelloNode';
import NotionNode from './NotionNode';
import ZoomNode from './ZoomNode';
import WhatsAppNode from './WhatsAppNode';
import TwilioNode from './TwilioNode';
import MicrosoftTeamsNode from './MicrosoftTeamsNode';
import MailgunNode from './MailgunNode';
import SendGridNode from './SendGridNode';
import PushoverNode from './PushoverNode';
import ClickUpNode from './ClickUpNode';
import CircleCINode from './CircleCINode';
import TravisCINode from './TravisCINode';
import AzureDevOpsNode from './AzureDevOpsNode';
import BambooNode from './BambooNode';
import TeamCityNode from './TeamCityNode';
import DiscordNode from './DiscordNode';
import SlackNode from './SlackNode';
import GitHubNode from './GitHubNode';
import GoogleSheetsNode from './GoogleSheetsNode';
import URLNode from './URLNode';
import ChatNode from './ChatNode';
import WebhookNode from './WebhookNode';
import GraphQLNode from './GraphQLNode';
import TwitterNode from './TwitterNode';
import HTTPRequestNode from './HTTPRequestNode';

export const nodeTypes = {
  agent: AgentNode,
  calculator: CalculatorNode,
  telegram: TelegramNode,
  gmail: GmailNode,
  dropbox: DropboxNode,
  mysql: MySQLNode,
  postgres: PostgresNode,
  googleDrive: GoogleDriveNode,
  gitlab: GitLabNode,
  bitbucket: BitbucketNode,
  jira: JiraNode,
  trello: TrelloNode,
  notion: NotionNode,
  zoom: ZoomNode,
  whatsapp: WhatsAppNode,
  twilio: TwilioNode,
  microsoftTeams: MicrosoftTeamsNode,
  mailgun: MailgunNode,
  sendgrid: SendGridNode,
  pushover: PushoverNode,
  clickup: ClickUpNode,
  circleci: CircleCINode,
  travisci: TravisCINode,
  azureDevOps: AzureDevOpsNode,
  bamboo: BambooNode,
  teamcity: TeamCityNode,
  discord: DiscordNode,
  slack: SlackNode,
  github: GitHubNode,
  googleSheets: GoogleSheetsNode,
  url: URLNode,
  chat: ChatNode,
  webhook: WebhookNode,
  graphql: GraphQLNode,
  twitter: TwitterNode,
  httpRequest: HTTPRequestNode
};

export const getNodeTypes = () => nodeTypes;
