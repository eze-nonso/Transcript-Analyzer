import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('Script')
export default class Script {
  @JsonProperty('channel', Number, true)
  public channel: number;
  @JsonProperty('matching_line', Number, true)
  public matchingLine: number | null;
  @JsonProperty('matching_sentence', String, true)
  public matchingSentence: string | null;
  @JsonProperty('order', Number, true)
  public order: number;
  @JsonProperty('sentence', String, true)
  public sentence: string | null;
  @JsonProperty('similarity', Number, true)
  public similarity: number | null;
  @JsonProperty('timeFrom', Number, true)
  public timeFrom: number | null;
  @JsonProperty('timeTo', Number, true)
  public timeTo: number | null;

  constructor() {
    this.channel          = 0;
    this.matchingLine     = null;
    this.matchingSentence = null;
    this.order            = 0;
    this.sentence         = null;
    this.similarity       = null;
    this.timeFrom         = null;
    this.timeTo           = null;
  }
}
