<script>
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Tasks } from '../../api/tasks.js'
  import { Meteor } from 'meteor/meteor'

  export let key
  export let task
  let checked = false

  function toggleCheck() {
    Meteor.call('tasks.setChecked', key, !task.checked)
  }

  function deleteTask() {
    var confirm = window.confirm("Delete this task?");
    if(confirm) {
      Meteor.call('tasks.delete', key)
    }
  }

  function changeHandler(event) {
    Meteor.call('tasks.update', key, task.name)
  }

  function keyupHandler(event) {
    if(event.which == 27 || event.which == 13) {
      event.target.blur()
    }
  }
  
</script>



<li class:checked={!!task.checked}>
  <input type="checkbox" checked={!!task.checked} 
  on:click={toggleCheck}>
  
  <input class="todoItem" type="text" bind:value={ task.name } on:change={changeHandler} on:keyup={keyupHandler}>  
  [<a class="danger" on:click={deleteTask}>Delete</a>] 
</li>



<style>

  li {
    max-width: 40rem;
  }

  .checked {
    background-color:#f0f0f0;
    color:#666;
  }

  .checked input.todoItem{
    text-decoration: line-through;
  }

  .checked input.todoItem,
  .checked input.todoItem:hover,
  .checked input.todoItem:focus {
    background-color: #f0f0f0;
  }

  a {
    color: blue;
  }

  .danger {
    color: red;
  }

  input.todoItem {
    border:none;
    font-family: "Times New Roman";
    font-size: 100%;
    padding:0.15em;
  }

  input.todoItem:hover {
    background-color: #f9f9f9;
    cursor:pointer;
  }

  input.todoItem:focus {
    background-color: #f9f9f9;
    cursor:default;
    outline:none;
  }

</style>