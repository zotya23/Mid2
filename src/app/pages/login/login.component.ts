import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Subscription, subscribeOn } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email = new FormControl();
  password: any = new FormControl('');

  loadingSubscription?: Subscription;
  loading: boolean = false;
  constructor(
    private router: Router,
    private loadingService: FakeLoadingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async login() {
    this.loading = true;
    //promise

    const email = this.email.value || '';
    const password = this.password.value || '';
    /*
    this.loadingService
      .loadingWithPromise(email, password)
      .then((_: boolean) => {
        console.log('This executed second.');

        this.router.navigateByUrl('/main');
      })
      .catch((error) => {
        console.error(error, 'Incorrect email or password');
      })
      .finally(() => {
        console.log('This is executed finally');
      });*/

    //asyns-awaitj
    /*try {
      //then
      const _ = await this.loadingService.loadingWithPromise(email, password);

      this.router.navigateByUrl('/main');
      //catch
    } catch (error) {
      console.error(error, 'Incorrect email or password');
    }
    //finally

    console.log('This is executed finally');*/

    //obsrvable
    //memory leak
    /*this.loadingSubscription = this.loadingService
      .loadingWithObservable(email, password)
      .subscribe({
        next: (data: boolean) => {
          console.log(data);
          this.router.navigateByUrl('/main');
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        },
        complete: () => {
          console.log('finally');
          this.loading = false;
        },
      });*/

    this.authService
      .login(this.email.value, this.password.value)
      .then((cred) => {
        console.log(cred);
        this.router.navigateByUrl('/main');
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
