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

Furthermore, usability testing has been implemented in which there is list a checklist of actions and expected results to ensure the feature was implemented in accordance with spec. In this, the tester must verify that everything displays accordingly and mark it as so. 

## Feature 2: Star beside Instructors [This feature is still in development!]

### Intended usage
Upon submitting a reply/post as an instructor, students will see a star appearing beside the responder's icon.

If you are an instructor or administrator of some sort, create a post. Push the 'Submit' button. After posting, a star should render alongside your profile information of the post. Although the code implementation for the star icon seems functional, unfortunately, the star image does not render as expected. Initially, we thought the issue was minor and planned to address it in sprint 2, but it has proven to be more complex than anticipated. Despite multiple attempts, including consulting office hours and involving various team members, we have been unable to pinpoint the problem. Consequently, we have decided to postpone the implementation of the star icon for administrators to a later phase, as the time investment required doesn't align with more impactful user experience enhancements we can prioritize, prompting us to refocus our efforts on more effective project goals.

### Technical structure
<img width="763" alt="Screenshot 2023-10-12 at 23 07 55" src="https://github.com/RarachelLuo/fall23-nodebb-poncho/assets/83194370/36d278dd-9143-480f-b15d-875be076a52c">

### Testing
Since the star icon could not be implemented when run locally, we maintained to not proceed with usability testing until we reopen this issue.

## Feature 3: Show courses on profile
### How to use
In the edit page of your own user profile, there should now be a field labeled "My Courses." Within in that file, there is an 1000 word limit that allows you to manuallty type out the classes you have taken in the past. Once your edits are done, you click save, and the changes will update your profile. Then when you click back at your profile, you will now see under your username, a list of the courses you have taken.

### Technical structure
<img width="601" alt="Screenshot 2023-10-12 at 16 19 06" src="https://github.com/RarachelLuo/fall23-nodebb-poncho/assets/83194370/288171a4-5084-4f7f-b0b9-6a4c7d8739cd">

### Testing
Testing case added to test/controllers.js and usability testing checklist also added to test folder in test/MyCoursesUsabilityTest.xlsx. 

The test added initializes a new user with courses. Then it checks that the courses inputed are correct and cases for errors. The test clearly aligns with that of other user fields input testing, ensures that all the correct data is processed, and error checks. This makes it a sufficient test.
The usability checklist writes out every step of adding courses to your profile in which our feature fullfilled every task.
