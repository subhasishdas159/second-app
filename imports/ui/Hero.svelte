<script>
  import { Heroes } from '../api/heroes.js'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { selectedHero } from '../api/store.js'

  export let key
  export let hero

  $: currentUser = useTracker(() => Meteor.user())

  function selectMe() {
    selectedHero.set(key)
  }

</script>
 
<li on:click={selectMe} class:selected={$selectedHero === key}>

	<span class="text">
    <strong> { hero.username } </strong>
    : { hero.name } ===> { hero.score }
  </span>

</li>