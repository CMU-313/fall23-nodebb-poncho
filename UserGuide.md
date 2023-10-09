#Anonymous Feature and Courses Taken on Profile Feature

## Feature Objectives
Being able to post anonymously as a user, and being able to add the courses you've taken to your user profile for professors or recruiters to see. The addition of the anonymous feature and courses taken on your profile feature serves to promote interaction and create more value in using NodeBB.

## User Stories
Currently NodeBB provides the basic functionality of having discussions, being able to view popular posts, and personalizing necessary information for your user profile. However as a user who wants to interact with others in discussions, there are many more situations that can lead to new functionalities being added.

1. As a student, I wish to be able to post anonymously because I don't want others to know what I posted if I feel like I have "dumb questions."
2. As a student, I wish to be able to write about the courses I have taken, so that recruiters and professors can see what courses I've taken and get an idea on the knowledge I may have.

## Feature 1: Anonymous Posting
### How to use
In the `new topic` composer pop-up, you can click on the dropdown beside the `SUBMIT` button, which allows you to add `tags`, which includes

 - [ ] `anonymous`
 - [ ] `anon-student` (anonymous to only students)
 - [ ] `anon-instructor` (anonymous to only instructors)]

Clicking on one of the options will add that `anonymous tag` to the list of `tags`. To delete the anonymous posting, simply delete the tag(s). 

![1](https://github.com/CMU-313/fall23-nodebb-poncho/assets/53340720/f71bd018-722d-467a-86b3-8bd20b3e6cd3)
![273484129-d7c9af55-81d7-4731-9156-de5c996a3e9d](https://github.com/CMU-313/fall23-nodebb-poncho/assets/53340720/718f8901-2dac-4f88-8602-b312cf5b93a0)
![3](https://github.com/CMU-313/fall23-nodebb-poncho/assets/53340720/651bff94-064a-4567-a1a0-8ac887e7ee98)

### Technical structure
![Blank diagram](https://github.com/CMU-313/fall23-nodebb-poncho/assets/53340720/549556ad-dd21-4ebd-bfe1-7dcb77fd914d)


### Automated testing: `test/topics.js:71-99`
The automated testing procedure is as follows:

 - [x] Create a topic object with `tags = [anonymous]`
 - [x] Check to see if the response topic object is valid
 - [x] Check to see if the response topic object contains the `isAnonymous` field and it is set to `true`

On the other hand, any topic object without the `anonymous` tags should have `isAnonymous` set to `false`
 - [x] Create a topic object with `tags = []`
 - [x] Check to see if the response topic object is valid
 - [x] Check to see if the response topic object contains the `isAnonymous` field and it is set to `false`

The two-sided tests ensure our `isAnonymous` field is toggled on/off appropriately. The details of the test are implemented in `test/topics.js`, line 71-99.

## Feature 2: Star beside Instructors
### How to use
### Technical structure
### Testing

## Feature 2: Show courses on profile
### How to use
### Technical structure
### Testing

