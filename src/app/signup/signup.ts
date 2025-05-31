import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../services/user.service';
import { Router } from "@angular/router";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { CustomDialog } from '../dialog/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  readonly dialog = inject(MatDialog);
  
  constructor(private userService : UserService, private router : Router) {}

  firstName = '';
  lastName = '';
  phoneNumber = '';
  email = '';
  password = '';
  address = '';
  district = '';
  selectedFile?: File;

  //variable that template checks to display if email is available
  isEmailAvailable = true;

  onSubmit(form: NgForm) {
    console.log({
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      password: this.password,
      address: this.address,
      district: this.district,
      file: this.selectedFile,
    });

    this.validateEmailAvailable(this.email);

   
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  validateEmailAvailable(email : string) {
    this.userService.emailExists(email).subscribe({
      next: (response) => {
        console.log(response);
        if (response == false) {
          this.isEmailAvailable = false;
          this.openDialog("Email en uso", "El email proporcionado ya esta en uso.", false)
        }
        else {
          this.isEmailAvailable = true;
          this.postUser();
          
        }
      }
    })
  }

  openDialog(title :string, description : string, success : boolean) {
    const dialogRef = 
    this.dialog.open(CustomDialog, {
      data: {
        title: title,
        description: description
      }
    });

    if (success) {
      dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/']);
    })
    }
    
}

  postUser() {
  const formData = new FormData();
  formData.append('firstName', this.firstName);
  formData.append('lastName', this.lastName);
  formData.append('email', this.email);
  formData.append('password', this.password);
  formData.append('phoneNumber', this.phoneNumber.toString());
  formData.append('address', this.address);
  formData.append('district', this.district);
  formData.append('file', this.selectedFile!); // file: File object

  this.userService.postUser(formData).subscribe({
    next: (response) => {
      this.openDialog("Creacion exitosa", "Su cuenta ha sido creada con exito.", true)
    },
    error: (error) => {
      this.openDialog("Error en la creacion", "Ocurrio un error al crear la cuenta, intente de nuevo mas tarde.",false)
    }
  });
}
}