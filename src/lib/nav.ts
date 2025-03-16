import { goto } from "$app/navigation"

export type Route = "/app" | "/login"

export const navTo = (
    route: Route,
    opts?:
        | {
              replaceState?: boolean | undefined
              noScroll?: boolean | undefined
              keepFocus?: boolean | undefined
              invalidateAll?: boolean | undefined
              invalidate?: (string | URL | ((url: URL) => boolean))[] | undefined
              state?: App.PageState | undefined
          }
        | undefined
) => {
    goto(route, opts)
}
