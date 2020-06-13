<script>
	import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Lists } from '../../api/lists.js'
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'

  let currentUser
  let lists
  let totalLists
	let completedLists
	let newList = ""

  onMount(async () => {
    await Meteor.subscribe('publishedLists')
  })

	$:{
	  currentUser = useTracker(() => Meteor.user())
	  if($currentUser) {
	    lists = useTracker(() => Lists.find({ _id: Meteor.userId }, { sort: { createdAt: -1 } }).fetch())

	    totalLists = Object.keys($lists).length
	    completedLists = Object.keys($lists.filter(list => list.checked)).length
	  }
	}

	function handleSubmit() {
		Meteor.call('lists.insert', newList)
      newList = ""
	}

</script>

<header>

  {#if $currentUser}

    <form on:submit|preventDefault={handleSubmit}>
      Create a list
      <input type="text" placeholder="Type to add a new list" bind:value="{newList}" />
    </form>
    
    <p>Hello {$currentUser.username}, you have completed {completedLists} out of {totalLists} lists</p>

  {/if}

</header>

  <ul class="lists">
	  {#if $currentUser} 
	    {#each $lists as list (list._id)}
	    	<li on:click={ ()=>push(`/list/${list._id}`) }>{list.name}</li>
	    {/each}
	  {/if}
  </ul>