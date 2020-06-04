<script>
  import { Tasks } from '../api/tasks.js'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'

  export let key
  export let task
  let showPrivateButton

  $: currentUser = useTracker(() => Meteor.user())

  $: {
    showPrivateButton = false
    if($currentUser) {
      showPrivateButton = task.owner === $currentUser._id
    }
  }

  const toggleChecked = () => {
  	Meteor.call('tasks.setChecked', task._id, !task.checked)
  }

  const deleteThisTask = () => {
  	Meteor.call('tasks.remove', task._id)
  }

  function togglePrivate() {
    Meteor.call("tasks.setPrivate", task._id, !task.private)
  }
</script>
 
<li class:checked={task.checked} class:private={task.private}>

	<button class="delete" on:click={deleteThisTask}>
		×
	</button>

	<input type="checkbox"
	 readonly checked={!!task.checked} 
	 on:click={toggleChecked}
	>

  {#if showPrivateButton}
    <button className="toggle-private" on:click={togglePrivate}>
      { task.private ? "private" : "public" }
    </button>
  {/if}

	<span class="text">
    <strong> { task.username } </strong>
    : { task.text }
  </span>

</li>