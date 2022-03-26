// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'capstone-343210',
    appId: '1:1022240410262:web:daaa55b157824cff2a90b7',
    databaseURL: 'https://capstone-343210-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'capstone-343210.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyB2dfy6teqwHrQqX7Gso3kUPHaZ_dEe8-c',
    authDomain: 'capstone-343210.firebaseapp.com',
    messagingSenderId: '1022240410262',
    measurementId: 'G-PN4KKHYTQJ',
  },
  // API_URL: 'https://capstone-hbts.herokuapp.com/api/v1',
  API_URL: 'http://localhost:8080/api/v1',
  production: true,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
