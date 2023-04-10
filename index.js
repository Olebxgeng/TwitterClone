import { tweetsData } from "./data.js";
const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn")

tweetBtn.addEventListener('click', function(){
    
})

document.addEventListener('click', function(e){
    if(e.target.dataset.likes){
        handleLikeClick(e.target.dataset.likes)
    }else if(e.target.dataset.retweets){
        handleRetweetClick(e.target.dataset.retweets)
    }
})

function handleLikeClick(tweetId){
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isLiked){
        targetTweetObj.likes--
    }else{
        targetTweetObj.likes++
    }

    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}

function handleRetweetClick(tweetId){

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function getFeedHtml(){
    let feedHtml = ``
    tweetsData.forEach(function(tweet){
        
        let likedIconClass = ''
        if(tweet.isLiked){
            likedIconClass = 'liked'
        }

        let retweetIconClass = ''
        if(tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        feedHtml += 
        `<div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-replies="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likedIconClass}" data-likes="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweets="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>`
    })
    return feedHtml
}

function render(){
    const feed = document.getElementById("feed")
    feed.innerHTML = getFeedHtml()
}

render()