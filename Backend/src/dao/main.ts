export interface tokenRequest {
    email: String,
    accessToken: String
}

export interface tokenResponse {
    jwtToken: String
}

export interface getPlatformRequest {
    jwtToken: String
}

export interface getPlatformResponse {
    platformData: [platformData]
}

export interface platformData {
    platform: String,
    isConnected: Boolean
}

export interface connectRequest {
    platform: String
    jwtToken: String
}

export interface connectResponse {
    status: String
}

export interface getPostRequest {
    jwtToken: String
}

export interface getPostResponse {
    posted:
    [
        postedData
    ],

    scheduled:
    [
        scheduledData
    ]
}

export interface postedData {
    imageLink: String,
    message: String,
    platforms: [{ id: String, platform: String, name: String }]
    timeOfPost: String
}

export interface scheduledData {
    imageLink: String,
    message: String,
    scheduledTime: String
    platforms: [String]
}

export interface putAPostRequest {
    message: String
    image: String
    video: String
    file: String
    platformData:
    [
        platFormPost
    ]
}

export interface platFormPost {
    platform: String,
    name: String
    timeOfPost: String
}

export interface putAPostResponse {
    platFormResponse:
    [
        {
            name: String,
            id: String,
            status: String
        }
    ]
}