import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomDialog } from '../dialog/dialog';
import { AuthService } from '../services/auth.service';
import { UserDTO } from '../DTOs/UserDTO';
@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private service = inject(AuthService);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);
  email: string = '';
  password: string = '';

  logIn(): void {
    this.service.logIn(this.email,this.password).subscribe({
      next: (user : UserDTO) => {
        this.service.setLoggedUser(user)
        this.router.navigate(["/marketplace"])
      },
      error: () => {
        this.openDialog("Datos incorrectos", "Usuario o contraseña incorrectos")
      }
    })
  }

  openDialog(title : string, description : string) {
    this.dialog.open(CustomDialog, {
      data: {
        title: title,
        description: description
      }
    })
    
  }
  
}
