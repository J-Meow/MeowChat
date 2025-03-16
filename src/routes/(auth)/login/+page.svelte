<script lang="ts">
    import { navTo } from "$lib/nav"
    import { auth, ApiError } from "$lib/api"
    import { currentContext } from "$lib/session"

    if ($currentContext) {
        navTo("/app", { replaceState: true })
    }

    let errorMessage = $state()

    async function handleSubmit(event: Event) {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        try {
            let apiCtx = await auth.login("https://matrix-client.matrix.org", username, password)
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

<p>Default homeserver is matrix.org</p>
<form onsubmit={handleSubmit}>
    <input type="text" name="username" placeholder="Username" />
    <input type="password" name="password" placeholder="Password" />
    {#if errorMessage}
        <p>{errorMessage}</p>
    {/if}
    <input type="submit" value="Log in" />
</form>
