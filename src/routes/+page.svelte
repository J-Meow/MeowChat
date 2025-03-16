<script lang="ts">
    import { currentContext } from "$lib/session"
    import { navTo } from "$lib/nav"

    if ($currentContext) {
        navTo("/app", { replaceState: true })
    } else {
        navTo("/login", { replaceState: true })
    }
</script>

<p>Loading...</p>
