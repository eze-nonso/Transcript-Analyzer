import {JsonObject, JsonProperty} from 'json2typescript';
import DateConverter from './dateConverter';
import Channel from 'src/app/core/models/channel.model';
import Script from 'src/app/core/models/script.model';

@JsonObject('Transcript')
export default class Transcript {
  @JsonProperty('agent', Channel, true)
  public agent: Channel | null;
  @JsonProperty('customer', Channel, true)
  public customer: Channel | null;
  @JsonProperty('duration', Number, true)
  public duration: number | null;
  @JsonProperty('call_id', String, true)
  public id: string | null;
  @JsonProperty('script', [Script], true)
  public script: Script[];
  @JsonProperty('call_datetime', DateConverter, true)
  public time: Date | null;
  @JsonProperty('transcript', [Script])
  public transcript: Script[];
  @JsonProperty('calltype_id', String, true)
  public type: string | null;

  constructor() {
    this.agent      = null;
    this.customer   = null;
    this.duration   = null;
    this.id         = null;
    this.script     = [];
    this.time       = null;
    this.transcript = [];
    this.type       = null;
  }

  getSpeaker(channel: number): string | number | null {
    if (channel === this.agent?.channel) {
      return this.agent.speakerName;
    } else if (channel === this.customer?.channel) {
      return this.customer.speakerName;
    }
    return null;
  }
}

