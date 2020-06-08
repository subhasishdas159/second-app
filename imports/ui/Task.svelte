<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Tasks } from '../api/tasks.js'
  import { Meteor } from 'meteor/meteor'

  export let key
  export let task
  let checked = false

  function toggleCheck() {
    Meteor.call('tasks.setChecked', key, !task.checked)
  }

  function deleteTask() {
    Meteor.call('tasks.delete', key)
  }

  $: currentUser = useTracker(() => Meteor.user())
</script>
 
<li>

	<span class="text" class:checked={!!task.checked}>
    <input type="checkbox" checked={!!task.checked} 
    on:click={toggleCheck}>
    { task.name }  
    <button on:click={deleteTask}>delete</button>
  </span>

</li>