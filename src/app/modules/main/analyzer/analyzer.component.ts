import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import AgentFacade from 'src/app/core/facades/agent.facade';
import CallFacade from 'src/app/core/facades/call.facade';
import Script from 'src/app/core/models/script.model';
import Call from 'src/app/core/models/call.model';

import TemplateService from 'src/app/core/services/template.service';
import Transcript from 'src/app/core/models/transcript.model';

@Component({
  selector:        'app-analyzer',
  templateUrl:     './analyzer.component.html',
  styleUrls:       ['./analyzer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AnalyzerComponent implements AfterViewInit {
  @ViewChild('subHeader')
  private subHeader?: TemplateRef<any>;
  public transcriptInFocus!: Script | null;
  public selectedCall!: Call | null;
  private counter!: string;

  constructor(
    public agents: AgentFacade,
    public calls: CallFacade,
    private _tplService: TemplateService,
  ) {
  }

  public ngAfterViewInit(): void {
    this._tplService.register('subHeader', this.subHeader);
  }

  public selectAgent(event: any): void {
    this.agents.setActiveAgent(event.value);
  };

  public selectCall(event: any): void {
    this.calls.selectCall(event?.value);
    if (event.value) {
      this.calls.setMatchingPercentage('default');
    }
  };

  public getScriptAlignmentPercentage(): Observable<string> {
    let subject = new BehaviorSubject<string>("");
    this.calls.activeTranscript$.subscribe(transcript => {
      const scripts = transcript?.script;
      const transcripts = transcript?.transcript;
      if (scripts && transcripts) {
        let matchingTranscripts = transcripts.filter((transcript: Script) => {
          return scripts?.find(s => s.matchingSentence === transcript.sentence) ? true : false;
        });
        const matchRatio = matchingTranscripts.length / transcripts.length * 100;
        subject.next((Math.round(matchRatio)) + "%");
      }
    });
    return subject.asObservable();
  };

  public getScriptCoveragePercentage(): Observable<string> {
    let subject = new BehaviorSubject<string>("");
    this.calls.activeTranscript$.subscribe(transcript => {
      const scripts = transcript?.script;
      const transcripts = transcript?.transcript;
      if (scripts && transcripts) {
        let coveredScripts = scripts.filter(script => {
          return transcripts?.find(
            t => t.matchingSentence === script.sentence
            || t.sentence === script.matchingSentence) ? true : false;
        });
        const matchRatio = coveredScripts.length / scripts.length * 100;
        subject.next((Math.round(matchRatio)) + "%");
      }
    });
    return subject.asObservable();
  }

  public checkScriptMatch(transcripts: Script[] | null, script: Script): boolean {
    if (!transcripts)
      return false;
    let scriptMatchingSentence = script.matchingSentence;
    return transcripts
    .find(transcript => transcript.sentence === scriptMatchingSentence) ? true : false;
  }

  public setActiveMatchedScript(transcriptSentence: string | null): void {
    this.calls.setActiveMatchedScript(transcriptSentence);
  }

  public scrollIntoView(target: any) {
    target.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  public getTooltipMessage(transcript: Script, matchedScript: Script | null, scripts: Script[] | undefined): string {
    if (!transcript || !transcript.similarity || !scripts || !matchedScript)
      return "No matching text";
    const matchPercentage = Math.round(transcript.similarity * 100) + '%';
    const lineNumber = scripts.findIndex(x => x === matchedScript) + 1;
    const matchingSentence = matchedScript.sentence;
    return `${matchPercentage} matching with line #${lineNumber} "${matchingSentence}"`;
  }

  public count(itemList: any): number {
    if (!(itemList && itemList.length))
      return 0;
    return itemList.length;
  }

  public formatTime(time: number | null): string {
    if (time === null) return "";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time - min * 60);
    return `${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`;
  }

  public getFirstNameSerial(channel: number, call: Transcript): string {
    let name = call.getSpeaker(channel);
    if (name === null) return "Unknown";
    name = name.toString();
    let firstName = name.split(' ')[0];
    if (firstName === this.counter) return "";
    this.counter = firstName;
    return firstName;
  }

  public resetCounter() {
    this.counter = "";
  }
}
