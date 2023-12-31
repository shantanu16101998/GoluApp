
import { database, postCollectionName } from '../database/mongo'

import { Post } from '../dto/post'
import { getPostResponse } from '../dao/main'
import { postDtoTogetPostResponse } from '../mapper/main'

const collection = database.collection(postCollectionName);


export async function getPosts(userName: string): Promise<getPostResponse> {

    const post: Post[] = await collection.find({ userName: userName }).toArray()

    return postDtoTogetPostResponse(post)

}

