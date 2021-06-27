import {Injectable} from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';
import AgentFacade from 'src/app/core/facades/agent.facade';
import Agent from 'src/app/core/models/agent';

import Call from 'src/app/core/models/call.model';
import Transcript from 'src/app/core/models/transcript.model';
import CallService from 'src/app/core/services/call.service';
import Script from '../models/script.model';

@Injectable({providedIn: 'root'})
export default class CallState {
  private readonly _activeAgentCalls$     = new BehaviorSubject<Call[]>([]);
  private readonly _activeTranscript$     = new BehaviorSubject<Transcript | null>(null);
  private readonly _calls$                = new BehaviorSubject<Call[]>([]);
  private readonly _matchingPercentage$   = new BehaviorSubject<number>(38);
  private readonly _transcripts$          = new BehaviorSubject<Transcript[]>([]);
  private readonly _matchingTranscripts$  = new BehaviorSubject<Script[]>([]);
  private readonly _activeMatchedScript$  = new BehaviorSubject<Script | null>(null);
  public activeAgentCalls$                = this._activeAgentCalls$.asObservable();
  public activeTranscript$                = this._activeTranscript$.asObservable();
  public calls$                           = this._calls$.asObservable();
  public matchingPercentage$              = this._matchingPercentage$.asObservable();
  public matchingTranscripts$             = this._matchingTranscripts$.asObservable();
  public activeMatchedScript$             = this._activeMatchedScript$.asObservable();

  constructor(
    private readonly _svc: CallService,
    private readonly _agents: AgentFacade
  ) {
    this._svc.getCalls$()
      .subscribe((calls: Call[]) => this._calls$.next(calls));

    this._svc.getTranscripts$()
      .subscribe((transcripts: Transcript[]) => {
        this._transcripts$.next(transcripts);
      });

    this._agents.activeAgent$
      .subscribe((agent: Agent) => {
        const calls = this._calls$.value.filter((call: Call) => call.agent?.agentId === agent.id);
        this._activeAgentCalls$.next(calls);
      });
  }

  public selectCall(id: string): void {
    const transcript = this._transcripts$.value.find((transcript) => transcript.id === id);
    this._activeTranscript$.next(transcript? transcript : null);
  }

  public setMatchingPercentage(value: number | string): void {
    if (value !== 'default')
      this._matchingPercentage$.next(parseInt(`${value}`));
    let transcript = this._activeTranscript$.getValue();
    let matchingTranscripts = transcript?.transcript.filter(transcript => {
      if (transcript === null || transcript.similarity === null)
        return false;
      return transcript.similarity * 100 >= this._matchingPercentage$.value;
    });
    const scripts = this._activeTranscript$.getValue()?.script;
    matchingTranscripts = matchingTranscripts?.filter(transcript => {
      return scripts?.find(s => s.matchingSentence === transcript.sentence) ? true : false;
    });
    this._matchingTranscripts$.next(matchingTranscripts || []);
  }

  public setActiveMatchedScript(transcriptSentence: string | null): void {
    if (transcriptSentence === null)
      this._activeMatchedScript$.next(null);
    const scripts = this._activeTranscript$?.value?.script
    .find((script) => script.matchingSentence === transcriptSentence);
    this._activeMatchedScript$.next(scripts || null);
  }
}
