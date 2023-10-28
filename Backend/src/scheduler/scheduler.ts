const cron = require("node-cron");
import { database, scheduledPostsCollectionName } from '../database/mongo';
const scheduledPostsCollection = database.collection(scheduledPostsCollectionName);

// Don't Allow User to Schedule Post in Next 30 Seconds
 
class Scheduler {
    scheduledTimeInSeconds: number = 30;
    isScheduled: boolean = true;
    cronJob: any;

    constructor() {
        this.scheduleCronJob();
    }

    private async myCronJob() {
        const currentTime: Date = new Date();
        const thirtySecondsAgo = new Date(currentTime.getTime() - 30000);
        try{
            const previousPosts: {timeOfPost: Date}[] = await scheduledPostsCollection.find({
                $and: [
                    { timeOfPost: { $gte: thirtySecondsAgo } }, 
                    { timeOfPost: { $lte: currentTime } }
                ]
            }).toArray();
            previousPosts.forEach(post => {
                this.executor(post);
            })
        } catch(e) {
            console.error(e);
        }
    }

    private executor(post: {timeOfPost: Date}) {
        console.log("Cron Job is being Executed for : ", post);
    }

    private async scheduleCronJob() {
        if (this.cronJob) {
            this.cronJob.stop();
        }
        
        this.cronJob = cron.schedule(`*/${this.scheduledTimeInSeconds} * * * * *`, () => this.myCronJob());
    }

    start() {
        console.log('Cron job started.');
    }

    setScheduledTimeInSeconds(timeInSeconds: number) {
        this.scheduledTimeInSeconds = timeInSeconds;
        this.scheduleCronJob();
    }

    stop() {
        this.isScheduled = false;
    }

    resume() {
        this.isScheduled = true;
    }
}

const scheduler = new Scheduler();
scheduler.start();


setTimeout(() => {
    // changes schedule time to 20 seconds.
    // By Default it is 5 seconds
    scheduler.setScheduledTimeInSeconds(20);
}, 20000);