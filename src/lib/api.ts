export class ApiError extends Error {
    errcode: string
    error: string
    constructor(errcode: string, error: string) {
        super(error)
        this.errcode = errcode
        this.error = error
    }
}

type ApiLoginResponse = {
    user_id: string
    access_token: string
    device_id: string
}

export const misc = {
    getServerURI: async (homeServer: string) => {
        try {
            let url = homeServer
            if (!url.startsWith("http")) {
                url = "https://" + url
            }
            const response = await fetch(`${url}/.well-known/matrix/client`)
            const json = await response.json()
            return json["m.homeserver"].base_url
        } catch (error) {
            throw new Error("Invalid Homeserver")
        }
    },
}

export const auth = {
    login: async (homeServer: string, username: string, password: string) => {
        const response = await fetch(`${homeServer}/_matrix/client/v3/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                identifier: { type: "m.id.user", user: username },
                password: password,
                type: "m.login.password",
            }),
        })
        const json = await response.json()
        console.log(json)
        if (response.ok) {
            const apiResponse = json as ApiLoginResponse
            return new ApiCtx(homeServer, apiResponse.access_token, apiResponse.device_id)
        } else {
            const apiError = json
            throw new ApiError(apiError.errcode, apiError.error)
        }
    },
}

export class ApiCtx {
    homeServer: string
    accessToken: string
    deviceId: string
    constructor(homeServer: string, accessToken: string, deviceId: string) {
        this.homeServer = homeServer
        this.accessToken = accessToken
        this.deviceId = deviceId
    }
    toString() {
        return JSON.stringify({ homeServer: this.homeServer, accessToken: this.accessToken, deviceId: this.deviceId })
    }
    static fromString(str: string) {
        const obj = JSON.parse(str)
        return new ApiCtx(obj.homeServer, obj.accessToken, obj.deviceId)
    }
}
