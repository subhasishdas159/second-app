<script>
	import {querystring} from 'svelte-spa-router'
  import qs from 'simple-query-string'
  
	$: {
	  parsed = qs.parse($querystring).tagId
	  console.log(parsed)
	}
</script>