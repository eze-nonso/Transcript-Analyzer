import {Injectable} from '@angular/core';

import CallState from 'src/app/core/states/call.state';

@Injectable({providedIn: 'root'})
export default class CallFacade {
  public activeAgentCalls$                         = this._state.activeAgentCalls$;
  public activeTranscript$                         = this._state.activeTranscript$;
  public calls$                                    = this._state.calls$;
  public matchingPercentage$                       = this._state.matchingPercentage$;
  public matchingTranscripts$                      = this._state.matchingTranscripts$;
  public activeMatchedScript$                      = this._state.activeMatchedScript$;
  public selectCall                                = this._state.selectCall.bind(this._state);
  public setMatchingPercentage                     = this._state.setMatchingPercentage.bind(this._state);
  public setActiveMatchedScript                    = this._state.setActiveMatchedScript.bind(this._state);

  constructor(private readonly _state: CallState) {
  }
}
