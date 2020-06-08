<script>
  import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Tasks } from '../api/tasks.js'
  import { BlazeTemplate }   from 'meteor/svelte:blaze-integration'
  import { onMount } from 'svelte'
  import Task from './Task.svelte'

  let newTask = ""
  let currentUser
  let tasks
  let checked
  let totalTasks

  onMount(async () => {
    await Meteor.subscribe('publishedTasks')
  })

    // if(Meteor.user()) {}

    $:{
      currentUser = useTracker(() => Meteor.user())
      if($currentUser) {
        tasks = useTracker(() => Tasks.find({ _id: Meteor.userId }, { sort: { createdAt: -1 } }).fetch())

        totalTasks = Object.keys($tasks).length
        checked = Object.keys($tasks.filter(task => task.checked)).length
      }
    }

    const handleSubmit = (event) => {
      Meteor.call('tasks.insert', newTask)
      newTask = ""
    }
     
</script>
 
 
<div class="container">
  <header>
    <h1>Todo List</h1>
    <br>

    <BlazeTemplate template="loginButtons" />

    {#if $currentUser}

      <form on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="Type to add a new hero" bind:value="{newTask}" />
      </form>
      
      <p>You have completed {checked} out of {totalTasks} tasks</p>
      
    {/if}


  </header>
  <ul>
  {#if $currentUser} 
    {#each $tasks as task (task._id)}
      <Task
        key={task._id}
        task={task}
      />
    {/each}
  {/if}
  </ul>
</div>