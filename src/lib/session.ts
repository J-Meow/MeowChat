import { writable } from "svelte/store"
import { ApiCtx } from "./api"

export const currentContext = writable<ApiCtx | null>(localStorage.getItem("meowchat-ctx") ? ApiCtx.fromString(localStorage.getItem("meowchat-ctx")!) : null)

currentContext.subscribe((ctx) => {
    if (ctx) {
        localStorage.setItem("meowchat-ctx", ctx.toString())
    } else {
        localStorage.removeItem("meowchat-ctx")
    }
})
