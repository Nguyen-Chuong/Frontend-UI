import {Component, OnInit, Input} from '@angular/core';
import {Alert, AlertType} from "../../../../../_models/alert";
import {Subscription} from "rxjs";
import {AlertService} from "../../../../../_services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() id = 'default-alert'
  @Input() fade = true;
  alerts: Alert[] = []
  alertSubscription: Subscription

  constructor(private alertService: AlertService, private router: Router) {
  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }
        // add alert to array
        this.alerts.push(alert);
        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 3000);
        }
      });
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;
    if (this.fade) {
      // fade out alert
      alert.fade = true;
      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClasses(alert: Alert) {
    if (!alert) { // @ts-ignore
      return;
    }
    const classes = ['alert', 'alert-dismissable'];
    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning'
    }
    classes.push(alertTypeClass[alert.type]);
    if (alert.fade) {
      classes.push('fade');
    }
    return classes.join(' ');
  }
}
