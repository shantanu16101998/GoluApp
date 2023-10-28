export interface Post {
    userName  :string,
    images: string[],
    videos : string[]
    description: string,
    platforms: { id: string, platform: string, name: string }[]
    timeOfPost: string,
    isScheduled : boolean
}



