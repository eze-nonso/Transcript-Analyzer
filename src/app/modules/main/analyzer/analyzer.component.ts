import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import AgentFacade from 'src/app/core/facades/agent.facade';
import CallFacade from 'src/app/core/facades/call.facade';
import Script from 'src/app/core/models/script.model';

import TemplateService from 'src/app/core/services/template.service';

@Component({
  selector:        'app-analyzer',
  templateUrl:     './analyzer.component.html',
  styleUrls:       ['./analyzer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {
  @ViewChild('subHeader')
  private subHeader?: TemplateRef<any>;
  public dataSource: any[]    = [];
  public dataSourceRep: any[] = [];
  public transcriptInFocus!: Script | null;

  constructor(
    public agents: AgentFacade,
    public calls: CallFacade,
    private _tplService: TemplateService,
    private _router: Router,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngAfterViewInit(): void {
    this._tplService.register('subHeader', this.subHeader);
    this.agents.agents$.subscribe((agents: any[]) => {
      this.agents.setActiveAgent(agents[0]?.id);
      this.calls.activeAgentCalls$.subscribe((calls: any[]) => {
        this.calls.selectCall(calls[0]?.id);
        this.calls.setMatchingPercentage(38);
        this.cd.detectChanges();
      });
    });
  }

  public ngOnInit(): void {
    this.dataSource    = MOCK_DATA();
    this.dataSourceRep = MOCK_DATA().slice(-25);
  };

  public selectAgent(event: any): void {
    this.agents.setActiveAgent(event.target?.value);
  };

  public selectCall(event: any): void {
    this.calls.selectCall(event.target?.value);
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

  public getTooltipMessage(transcript: Script, matchedScript: Script | null, scripts: Script[] | undefined): string {
    if (!transcript || !transcript.similarity || !scripts || !matchedScript)
      return "No matching text";
    const matchPercentage = Math.round(transcript.similarity * 100) + '%';
    const lineNumber = scripts.findIndex(x => x === matchedScript) + 1;
    const matchingSentence = matchedScript.sentence;
    return `${matchPercentage} matching with line #${lineNumber} "${matchingSentence}"`;
  }
}

const MOCK_DATA = () => {
  const DATA: any[]        = [];
  const SPEAKERS: string[] = [
    'Harvey',
    'Luke'
  ];

  let currentTime = 30;

  for (let i = 0; i < 100; i++) {
    const min = Math.floor(currentTime / 60);
    const sec = Math.floor(currentTime - min * 60);

    DATA.push({
      time:     `${(
        '0' + min
      ).slice(-2)}:${(
        '0' + sec
      ).slice(-2)}`,
      speaker:  SPEAKERS[Math.floor(Math.random() *
        (
          SPEAKERS.length
        ))],
      sentence: `This is a sample sentence #${i + 1}`
    });

    currentTime +=
      (
        Math.random() * 10
      ) + 5;
  }

  return DATA;
};
