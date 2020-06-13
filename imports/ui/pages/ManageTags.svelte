<script>
	import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Tags } from '../../api/tags.js'
  import { onMount } from 'svelte'
  import { push } from 'svelte-spa-router'
   
  let currentUser
  let tags
  let totalTags
	let completedtags
	let newTag = ""

  onMount(async () => {
    await Meteor.subscribe('publishedTags')
  })

	$:{
	  currentUser = useTracker(() => Meteor.user())
	  if($currentUser) {
	    tags = useTracker(() => Tags.find({ _id: Meteor.userId }, { sort: { createdAt: -1 } }).fetch())

	    totalTags = Object.keys($tags).length
	    completedTags = Object.keys($tags.filter(tag => tag.checked)).length
	  }
	}

	function handleSubmit() {
		Meteor.call('tags.insert', newTag)
      newTag = ""
	}

</script>

<header>
	<h3>Manage Tags</h3>
  {#if $currentUser}

    <form on:submit|preventDefault={handleSubmit}>
      Create a tag
      <input type="text" placeholder="Type to add a new tag" bind:value="{newTag}" />
    </form>
    
    <p>Hello {$currentUser.username}, you have completed {completedTags} out of {totalTags} tags</p>

  {/if}

</header>

<ul class="tags">
  {#if $currentUser} 
    {#each $tags as tag (tag._id)}
    	<li on:click={ ()=>push(`/tags?tagId=${tag._id}`) }>{tag.name}</li>
    {/each}
  {/if}
</ul>