import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject('UserAvatar')
export class UserAvatar {
  @JsonProperty('34', String, true)
  34?: string | null;
  @JsonProperty('48', String, true)
  48?: string | null;
  @JsonProperty('64', String, true)
  64?: string | null;

  constructor() {
    this['34'] = null;
    this['48'] = null;
    this['64'] = null;
  }
}

@JsonObject('User')
export default class User {
  @JsonProperty('avatar', UserAvatar, true)
  public avatar: UserAvatar | null;
  @JsonProperty('email', String, true)
  public email: string | null;
  @JsonProperty('firstName', String, true)
  public firstName: string | null;
  @JsonProperty('lastName', String, true)
  public lastName: string | null;

  constructor() {
    this.firstName = null;
    this.lastName  = null;
    this.email     = null;
    this.avatar    = null;
  }
}
