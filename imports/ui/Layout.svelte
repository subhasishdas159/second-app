<script>
  import Tasks from './pages/Tasks'
  import Dashboard from './pages/Dashboard'
  import NotFound from './pages/NotFound'
  import Router from 'svelte-spa-router'
  import Team from './pages/Team'
  import Profile from './pages/Profile'
  import ManageTags from './pages/ManageTags'

  import Header from './comps/Header'

  const routes = {
    '/': Dashboard,
    '/dashboard': Dashboard,
    '/tags': Tasks,
    '/team': Team,
    '/manage-tags': ManageTags,
    '/profile': Profile,
    '*': NotFound,
	}
</script>

<Header />
<br>

<Router {routes} />
