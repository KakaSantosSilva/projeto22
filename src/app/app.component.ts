import { environment } from 'src/environments/environment';
import { Auth, authState,  GoogleAuthProvider, signInWithPopup, User  } from '@angular/fire/auth';
import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public env = environment;
  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth); //subscription
  authStateSubscription: Subscription;

  public appPages = [
    { title: 'Início', url: '/folder/home', icon: 'home' },
    { title: 'Sobre', url: '/folder/sobre', icon: 'information-circle' },
    { title: 'Contato', url: '/folder/contato', icon: 'chatbubbles' },
  ];
  // informações do user
  public appUser = {
   logged: false,
   title: 'Login / Entrar',
   url: '/login',
   icon: 'log-in',
   avatar: ''
  }
  constructor() {
    this.authStateSubscription = this.authState$.subscribe((aUser: User | null) => {
      if(aUser !== null){
           this.appUser = {
            logged:  true,
            title: aUser.displayName + '',
            url: '/profile',
            icon: 'log-out',
            avatar: aUser.photoURL + ''

           }

      }

    })
  }

  ngOnDestroy() {
    // when manually subscribing to an observable remember to unsubscribe in ngOnDestroy
    this.authStateSubscription.unsubscribe();
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

