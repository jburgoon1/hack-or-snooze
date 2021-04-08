"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <input type= "checkbox" id = "fav-toggle"></checkbox>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <span id = "delete-story">X</span>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function storyInfo(e){
  console.debug('storyInfo',e)
  e.preventDefault();
  let user = currentUser
  const $title = $('#title').val();
  const $author = $('#author').val();
  const $url = $('#url').val()
  const newStory = {
    title: $title,
    author: $author,
    url: $url
  }
 
return await new StoryList().addStory(user, newStory)

}
$storyForm.on('submit', storyInfo);

async function deleteTheStory(e){
  console.debug('deleteTheStory', e)
  e.preventDefault()
 let user = currentUser
 let story = e.target.parentElement
 console.log(story.id)
 
 return await new StoryList().deleteStoryList(user, story.id)
}

$allStoriesList.on('click','span', deleteTheStory);



async function newFav(e){
  console.debug('newFav', e)
  e.preventDefault()
 let user = currentUser
 let story = e.target.parentElement
 console.log(story.id)
 
 return await new User(user).Fav(user, story.id)
}

$allStoriesList.on('click', 'input', newFav)

async function deleteFav(e){
  console.debug('deleteFav', e)
  e.preventDefault()
 let user = currentUser
 let story = e.target.parentElement
 console.log(story.id)

return await new User(user).deleteFav(user, story.id)
}
$allStoriesList.on('click', 'input', deleteFav)

function generateFavoriteMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
      <input type= "checkbox" id = "fav-toggle"></checkbox>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  // loop through all of our stories and generate HTML for them
  for (let story of currentUser.favorites) {
    const $favorites = generateFavoriteMarkup(story);
    $favList.append($favorites);
  }
  $favList.show()
}
$navFav.on('click', putFavoritesOnPage)



