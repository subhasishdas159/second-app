<script>
  import { Meteor } from 'meteor/meteor'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Heroes } from '../api/heroes.js'
  import { BlazeTemplate }   from 'meteor/svelte:blaze-integration'
  import { onMount } from 'svelte'
  import Hero from './Hero.svelte'
  import { selectedHero } from '../api/store.js'

  let newHero = ""
  let currentUser

  onMount(async () => {
    await Meteor.subscribe('publishedHeroes')
  })

    $: heroes = useTracker(() => Heroes.find({}, { sort: { createdAt: -1 } }).fetch());

    const handleSubmit = (event) => {
      Meteor.call('heroes.insert', newHero)
      newHero = ""
    }
    $:{
      currentUser = useTracker(() => Meteor.user())
      if($currentUser) {
        heroes = useTracker(() => Heroes.find({ username: $currentUser.username }, { sort: { createdAt: -1 } }).fetch());
      }
    }

    $: {
        if($currentUser) {
        console.log($currentUser.username)
      }
    }
</script>
 
 
<div class="container">
  <header>
    <h1>Todo List</h1>
    <br>

    <BlazeTemplate template="loginButtons" />

    {#if $currentUser}

      <form on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="Type to add a new hero" bind:value="{newHero}" />
      </form>
      {$currentUser.username}

    {/if}

  </header>
  <ul>
  {#each $heroes as hero (hero._id)}
    <Hero
      key={hero._id}
      hero={hero}
    />
  {/each}
  </ul>
</div>