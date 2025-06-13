import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  HlmAccordionContentComponent,
  HlmAccordionDirective,
  HlmAccordionIconDirective,
  HlmAccordionItemDirective,
  HlmAccordionTriggerDirective,
} from '@spartan-ng/helm/accordion';
import { HlmIconDirective } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HlmAccordionContentComponent,
    HlmAccordionDirective,
    HlmAccordionIconDirective,
    HlmAccordionItemDirective,
    HlmAccordionTriggerDirective,
    HlmIconDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'admin';
}
