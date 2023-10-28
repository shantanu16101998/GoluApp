export interface tokenRequest {
    email: string,
    accessToken: string
}

export interface tokenResponse {
    jwtToken: string
}

export interface getPlatformRequest {
    jwtToken: string
}

export interface getPlatformResponse {
    platformData: [platformData | null]
}

export interface platformData {
    platform: string,
    isConnected: boolean
}

export interface connectRequest {
    platform: string
    jwtToken: string
}

export interface connectResponse {
    status: string
}

export interface getPostRequest {
    jwtToken: string
}

export interface getPostResponse {
    posted: PostedData[],

    scheduled: ScheduledData[]

}

export interface PostedData {
    imageLink: string[],
    message: string,
    platforms: { id: string, platform: string, name: string }[]
    timeOfPost: string
}

export interface ScheduledData {
    imageLink: string[],
    message: string,
    scheduledTime: string
    platforms: { id: string, platform: string, name: string }[]
}

export interface putAPostRequest {
    message: string
    image: string
    video: string
    file: string
    platformData:
    [
        platFormPost
    ]
}

export interface platFormPost {
    platform: string,
    name: string
    timeOfPost: string
}

export interface putAPostResponse {
    platFormResponse:
    [
        {
            name: string,
            id: string,
            status: string
        }
    ]
}

export interface FacebookPagesList {
    names : string[]   
}

export interface ExceptionResponse {
    errorMessage : string
    errorCode : string
}