import { TweetRepository, HashtagRepository } from "../repository/index.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagrepository = new HashtagRepository();
  }
  async create(data) {
    const content = data.content || "";
    const tags = (content.match(/#[a-zA-Z0-9]+/g) || []) //if no hashtags in comment then it will return null;
      .map((tag) => tag.substring(1).toLowerCase());

    const tweet = await this.tweetRepository.create(data);

    let alreadyPresenttags = await this.hashtagrepository.findByName(tags);

    let titleOfPresenttags = alreadyPresenttags.map((tags) => tags.title);
    let newTags = tags.filter((tag) => !titleOfPresenttags.includes(tag));
    newTags = newTags.map((tag) => {
      return {
        title: tag,
        tweets: [tweet._id],
      };
    });

    await this.hashtagrepository.bulkCreate(newTags);
    alreadyPresenttags.forEach((tag) => {
      tag.tweets.push(tweet.id);
      tag.save();
    });
    return tweet;

    // [{title:'coding' ,tweets:[]}]
    //todo create hastags and add here
    /**
     * 1 .bulcreate in moongose
     * 2 filter title of hashtags based on multiople tags
     * 3 how to add tweet id inside all the hashtags
     * 4
     */
  }
  async get(tweetId) {
    const tweet = await this.tweetRepository.getWithComments(tweetId);
    return tweet;
  }
}
export default TweetService;

/*
this is my #first #tweet and I am really #excited
*/
