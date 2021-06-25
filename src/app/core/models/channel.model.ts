import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('Channel')
export default class Channel {
  @JsonProperty('agent_id', String, true)
  public agentId: string | null;
  @JsonProperty('channel', Number, true)
  public channel: number;
  @JsonProperty('full_name', String, true)
  public speakerName: string | null;

  constructor() {
    this.agentId     = null;
    this.channel     = 0;
    this.speakerName = null;
  }
}
