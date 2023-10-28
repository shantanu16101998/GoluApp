const { MongoClient } = require("mongodb");

import { mongo_uri } from '../config/mongo'

export const client = new MongoClient(mongo_uri);

export const dbName = "GoluCluster";
export const userCollectionName = "users";
export const postCollectionName = "posts";
export const scheduledPostsCollectionName = "scheduledPosts";
export const database = client.db(dbName);