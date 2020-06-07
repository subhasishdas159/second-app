import { Meteor } from 'meteor/meteor'
import App from '../imports/ui/App.svelte'
import '../imports/startup/accounts-config.js'
import { Accounts } from 'meteor/accounts-base';

Accounts.onLogout(() => {
  location.reload() 
});
 
 
Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  });
});
