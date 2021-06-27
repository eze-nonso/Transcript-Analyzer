import {Injectable} from '@angular/core';
import {JsonConvert} from 'json2typescript';

import {Observable, of} from 'rxjs';

import Call from 'src/app/core/models/call.model';
import Transcript from 'src/app/core/models/transcript.model';
import MOCK_DATA_CALLS from './data/calls.json';
import MOCK_DATA_TRANSCRIPT from './data/transcript.json';

@Injectable()
export default class CallServiceMock {
  private jsonConvert: JsonConvert = new JsonConvert();

  getCalls$(): Observable<Call[]> {
    let parsedCalls;
    try {
      parsedCalls = MOCK_DATA_CALLS.map((x: any) => this.jsonConvert.deserializeObject(x, Call));
    } catch (error) {
      return of([]);
    }
    return of(parsedCalls);
  }

  getTranscripts$(): Observable<Transcript[]> {
    let parsedTranscripts;
    try {
      parsedTranscripts = MOCK_DATA_TRANSCRIPT.map((x: any) => this.jsonConvert.deserializeObject(x, Transcript));
    } catch (error) {
      return of([]);
    }
    return of(parsedTranscripts);
  }
}
