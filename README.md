# TranscriptAnalyzer

An application that enables a customer representative company to view and compare similarities between transcripts of actual agent - customer calls to a pre-defined script sample

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Specs
- Transcript Analyzer allows sales and support team managers to get insights on the quality of the outbound calls to customers that people on their team do daily.  
  1. It enables managers to easily do this by showing a side-by-side comparison between the transcript of the real call (“Real” panel) the agent made and the intended call script (“Expected” panel).
  2. It highlights the sentence on both panels where the sentence has a "similarity" above or equal to the selected “Matching Sensitivity” value.  
The assumption is that better agents will stick to the script and cover more of it.
- To analyze a transcript for a call, a manager needs to do the following (in order):  
  1. Select the agent they want to review calls for,
  2. Select the specific call that matches the agent selected previously, and
  3. Set the “Matching Sensitivity” value they want to review (default is 38%).
- Managers should be able to change “Matching Sensitivity” live and the app should dynamically update the highlighted sentences based on the value that’s configured in the slider.
- When the manager moves the mouse over a sentence in the “Real” panel, a tooltip should be displayed showing the similarity percentage followed by the line number and the matching text from the “Expected” panel.
- If there is a match, hovering that sentence highlights the matching sentence(s) in the other panel using a darker shade of the highlight color.
- Note that both panels have a Matching Summary showing the percentage of highlighted lines:
  1. The Left panel shows the percentage of the lines out of all of the agent’s lines from the transcript that match the script (“Alignment to the expected script”)
  2. The Right panel shows the percentage of script lines covered  (“Percent of script covered”)
- Note that both panels must fit above the fold and should have an independent scroll bar for the content within them. It’s not necessary to have the scroll of the two panels be synced in any way.
- The default Transcript Analyzer page needs to be served from the root URI (/).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
