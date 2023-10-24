export interface Post {
    userName  :String,
    images: String[],
    videos : String[]
    description: String,
    platforms: { id: String, platform: String, name: String }[]
    timeOfPost: String,
    isScheduled : boolean
}



