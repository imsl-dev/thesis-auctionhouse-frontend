import { ChangeDetectionStrategy, Component, Inject, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog.html',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; description: string }
  ) {}
  
}