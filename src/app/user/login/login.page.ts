import { Component, inject, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public env = environment;
  private auth: Auth = inject(Auth);

  constructor() { }

  ngOnInit() {
  }
  login() {

    signInWithPopup(this.auth, new GoogleAuthProvider())
      // signInWithRedirect(this.auth, new GoogleAuthProvider())
      .then((a) => {
        location.href = '/home';
      })
      .catch((error) => {
        console.error(error.code, error.message, error.customData.email);
        alert("Oooops! Ocorreram erros ao fazer login.");
      })

  }

}
