import { Meteor } from 'meteor/meteor'
import Layout from '../imports/ui/Layout.svelte'
import '../imports/startup/accounts-config.js'
import { Accounts } from 'meteor/accounts-base';

// Accounts.onLogout(() => {
//   location.reload() 
// });
 
 
Meteor.startup(() => {
  new Layout({
    target: document.getElementById('app')
  });
});
