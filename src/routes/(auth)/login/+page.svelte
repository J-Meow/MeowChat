<script lang="ts">
    import { navTo } from "$lib/nav"
    import { auth, ApiError, misc } from "$lib/api"
    import { currentContext } from "$lib/session"

    if ($currentContext) {
        navTo("/app", { replaceState: true })
    }

    let errorMessage = $state()

    async function handleSubmit(event: Event) {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        let homeServer = ""
        try {
            homeServer = await misc.getServerURI(formData.get("server") as string)
        } catch (e) {
            errorMessage = (e as Error).toString()
            return
        }
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        try {
            let apiCtx = await auth.login(homeServer, username, password)
            errorMessage = ""
            $currentContext = apiCtx
            navTo("/app")
        } catch (e) {
            console.log(e)
            if (e instanceof ApiError) {
                console.log(e.error)
                errorMessage = e.error
            } else {
                throw e
            }
        }
    }
</script>

<form onsubmit={handleSubmit}>
    <input type="text" name="server" placeholder="Homeserver" required value="matrix.org" />
    <input type="text" name="username" placeholder="Username" required />
    <input type="password" name="password" placeholder="Password" required />
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
    <input type="submit" value="Log in" />
</form>
