import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {
  @Input() showTooltip = false;
  @Input() content: string = '';
  @Input() numberOfUsers: number = 0;
}
