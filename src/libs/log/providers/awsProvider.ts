import {
  CloudWatchLogsClient,
  CloudWatchLogsClientConfig,
  DescribeLogStreamsCommand,
  PutLogEventsCommand,
  PutLogEventsCommandInput,
} from '@aws-sdk/client-cloudwatch-logs';
import { ILog } from '../ logInterface';

export interface AWSProviderConfig extends CloudWatchLogsClientConfig {
  logGroupName: string;
  logStreamName: string;
}

export class AWSProvider implements ILog {
  private client: CloudWatchLogsClient;
  private config: AWSProviderConfig;
  private sequenceToken: string | undefined;

  constructor(config: AWSProviderConfig) {
    this.config = config;
    this.client = new CloudWatchLogsClient(config);
    this.getPreviouSequenceToken();
  }

  private async getPreviouSequenceToken(): Promise<void> {
    const params = {
      logGroupName: this.config.logGroupName,
      logStreamNamePrefix: this.config.logStreamName,
    };

    const command = new DescribeLogStreamsCommand(params);
    try {
      const commandResult = await this.client.send(command);

      this.sequenceToken =
        commandResult.logStreams &&
        commandResult.logStreams[0].uploadSequenceToken;
    } catch (error) {
      console.error('aws log with error: ', error);
    }
  }

  async log(data: any): Promise<any> {
    const params: PutLogEventsCommandInput = {
      logEvents: [
        {
          message: JSON.stringify(data),
          timestamp: new Date().valueOf(),
        },
      ],
      logGroupName: this.config.logGroupName,
      logStreamName: this.config.logStreamName,
      sequenceToken: this.sequenceToken,
    };

    try {
      const command = new PutLogEventsCommand(params);
      const commandResult = await this.client.send(command);
      this.sequenceToken = commandResult.nextSequenceToken;
    } catch (error) {
      console.error('aws log with error: ', error);
    }

    return 'done';
  }
}
