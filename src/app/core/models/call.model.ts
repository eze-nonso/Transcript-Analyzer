import {JsonObject, JsonProperty} from "json2typescript";
import Channel from 'src/app/core/models/channel.model';
import DateConverter from "./dateConverter";

@JsonObject('Call')
export default class Call {
  @JsonProperty('agent', Channel, true)
  public agent: Channel | null;
  @JsonProperty('customer', Channel, true)
  public customer: Channel | null;
  @JsonProperty('duration', Number, true)
  public duration: number | null;
  @JsonProperty('call_id', String, true)
  public id: string | null;
  @JsonProperty('call_start_time', DateConverter, true)
  public startTime: Date | null;
  @JsonProperty('calltype_id', String, true)
  public type: string | null;

  constructor() {
    this.id        = null;
    this.type      = null;
    this.agent     = null;
    this.customer  = null;
    this.startTime = null;
    this.duration  = null;
  }
}
