<script lang="ts">
    import { auth } from "$lib/api"
    import { navTo } from "$lib/nav"
    import { currentContext } from "$lib/session"

    if (!$currentContext) {
        navTo("/login", { replaceState: true })
    }

    if ($currentContext && !$currentContext.hasGottenWhoAmI) {
        ;(async () => {
            const identityInfo = await auth.whoAmI($currentContext)
            $currentContext.userId = identityInfo.userId
            $currentContext.isGuest = identityInfo.isGuest
            $currentContext.hasGottenWhoAmI = true
        })()
    }
</script>

Logged in!

{$currentContext?.userId}
