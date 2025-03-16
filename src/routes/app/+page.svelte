<script lang="ts">
    import { navTo } from "$lib/nav"
    import { currentContext } from "$lib/session"

    if (!$currentContext) {
        navTo("/login", { replaceState: true })
    }
</script>

Logged in!
