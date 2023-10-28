import { getPostResponse, PostedData, ScheduledData } from "../dao/main";
import { Post } from "../dto/post";

export function postDtoTogetPostResponse(postList: Post[]): getPostResponse {
    const currentlyPosted: Post[] = postList.filter((post: Post) => post.isScheduled == false)
    const scheduledPost: Post[] = postList.filter((post: Post) => post.isScheduled == true)

    const currentlyPostedResponse: PostedData[] = currentlyPosted.map((post: Post) => {

        const postedData: PostedData = {
            imageLink: post.images,
            message: post.description,
            platforms: post.platforms,
            timeOfPost: post.timeOfPost
        }

        return postedData;

    })

    const scheduledResponse: ScheduledData[] = scheduledPost.map((post: Post) => {

        const postedData: ScheduledData = {
            imageLink: post.images,
            message: post.description,
            platforms: post.platforms,
            scheduledTime: post.timeOfPost
        }

        return postedData;

    })

    const response: getPostResponse = {
        posted: currentlyPostedResponse,
        scheduled: scheduledResponse
    }
    return response;
}