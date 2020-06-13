<script>
	import {querystring} from 'svelte-spa-router'
	import qs from 'simple-query-string'
 
	var parsed = qs.parse($querystring);
	 
	console.log(parsed["teamId"]);
	console.log(parsed["abc"]);

</script>

<a href="#/">Back to Dashboard</a>

<h3>Team page</h3>