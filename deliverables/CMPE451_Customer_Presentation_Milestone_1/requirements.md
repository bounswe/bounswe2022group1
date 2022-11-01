

# Glossary
1. **Online Learning Platform:** An online platform that enables student to learn on their own without face-to-face communication. 

2. **Teacher:** Anyone who knows a topic well and willing to teach it to other people. 

3. **Learner:** Anyone who is interested in learning.

4. **e-learning:** Learning from digital platforms instead of on-site education. 

5. **Communication Channels:** Channels that allow participants to interact with each other via asking questions, answering problems, discussing ideas, sharing resources etc.

6. **Semantic Search:** Searching for certain thing considering the meaning and the context of the word instead of the lexical structure. 

7. **Browsing:** Glancing for some course/content/person randomly, possibly with the help of interface provided to the user.

8. **Recommendations:** Suggestions that are offered to the user considering their personal traits, previous usage, likes etc. 

9. **Learning Environment:**  An environment containing all the learning related things or activities. This includes teacher, learner, learning platform, quizzes, assignments and learning place...   

10. **Progress:** A quantitative metric assessing how well the learners are continuing their learning process. 

11. **Reputation:** A score for teachers gathered by the feedbacks of learners that evaluates the teaching performance.

12. **Learning Experience:** All the things related to learner's individual learning process. That includes their progress, feedbacks, evaluations etc. 

13. **User Profile:** A virtual entity for the real user, which includes collection of information about a user describing her interests and knowledge. 

14. **Geolocation:** Geographic location of a user. 

15. **Poll:** Survey about a certain question or opinion. 

16. **RESTful API:** An architectural style for distributed hypermedia [systems](https://restfulapi.net).

# Requirements 
### 1. Functional Requirements
### 1.1 User Requirements
<details>

  <summary> 1.1.1 Authentication </summary>

> <details>
> <summary> 1.1.1.1 Sign up </summary>
>
>* 1.1.1.1.1 Users shall sign up to enroll the courses on the online learning platform by specifying their username, password and an e-mail in the sign-up process.
>* 1.1.1.1.2 Guest user’s username should not be taken by another account beforehand.
>* 1.1.1.1.2 E-mail, password and username in the Android version can be at most 25 letters.
>* 1.1.1.1.3 When guest user signs up, it automatically signs-in with the information given at sign-up step.
></details>
> <details>
>
> <summary> 1.1.1.2 Username, password </summary>
> 
>* 1.1.1.2.1 A user shall select a unique username and a password containing at least 8 letters. 
>* 1.1.1.2.2 A user shall be able to change her password. 
></details>
> <details>
>
> <summary> 1.1.1.3  E-mail verification </summary>
> 
>*  1.1.1.3.1 A user shall be notified an account creation when they sign up to the system. 
></details>
> <details>
>
> <summary> 1.1.1.4  Sign in </summary>
> 
>*  1.1.1.4.1 A user shall enter her password correctly. If she fails to enter her password correctly six times, she shall be blocked from further retrying.  
>*  1.1.1.4.2 A user shall recover her password if she is blocked from further retrying, for typing wrong password six times. 
></details>
> <details>
>
> <summary> 1.1.1.5  Password recovery </summary>
> 
>* 1.1.1.5.1 A user shall be given a random password when they click on recover password button and type in their email address with username.  
></details>
</details>

<details>

 <summary> 1.1.2 Profile </summary>
 
><details>
>
><summary> 1.1.2.1 Profile Specifications </summary>
>
>* 1.1.2.1.1 Every user shall have a profile page. 
>* 1.1.2.1.2 A user shall be able to upload a profile picture, specify their interests and location.  
>* 1.1.2.1.3 A user shall be able to follow other users and be followed back. 
>* 1.1.2.1.4 A user shall be able to see her followers. 
>* 1.1.2.1.5 A user shall be able to see her courses. 
></details>
>
>
><details>
>
><summary> 1.1.2.2 Privacy </summary>
>
>* 1.1.2.2.1 Every user shall be able to hide her profile from the other user's accesses. If she hides herself, she shall be no longer seen by other users by any means.  
>* 1.1.2.2.2 Every user shall be able to partially restrict access to her profile from the other user's accesses. That is, hiding her courses, her followers, her badges etc. from other user's access.
></details>
>
></details>
<details>

 <summary> 1.1.3 Guest </summary>

>* 1.1.3.1 Guest user shall be able to use the search feature and look for courses.
>* 1.1.3.2 Guest user shall be able to see title and brief contents of a course. 
>* 1.1.3.3 Guest user shall sign up and create an account to enroll a course and see the full content. 
>* 1.1.3.4 Guest users should be able to sign-up
>* 1.1.3.5 Guest users should be able to sign-in

></details>

<details>

 <summary> 1.1.4 Student </summary>

>* 1.1.4.1 A user who enrolls a course shall be considered as a student.
>* 1.1.4.2 Student shall be able to see the full course material.
>* 1.1.4.3 Student shall be able to monitor his/her progress in the course. Progress should indicate the percentage of the viewed content in the course. 
>* 1.1.4.4 Students should be able to obtain achievements by progressing in the courses.
>* 1.1.4.5 Student shall be able to contribute to the course via participating polls created by lecturers.
>* 1.1.4.6 Student shall be able to take notes related to the learning material. 
>* 1.1.4.7 Student should be able to evaluate the lecturer. Evaluation shall be in two ways: from a rating in the range of 1-5, like or dislike.
></details>

<details>

 <summary> 1.1.5 Lecturer </summary>

>* 1.1.5.1 A user who creates a course shall be considered as a lecturer.
>* 1.1.5.2 Lecturer shall be able to upload video, image, or text material to the course page.
>* 1.1.5.3 Lecturer shall be able to organize the course page.
>* 1.1.5.4 Lecturer shall be able to create polls for the students. Polls shall be in 3 types: anonymous mode, multiple answers and quiz mode.
>* 1.1.5.5 Lecturer shall have a reputation based on the feedback they have obtained from students 

></details>

<details>

 <summary> 1.1.6 Events </summary>

>* 1.1.6.1  Users shall be able to create events by providing the information on whether the meeting is online/in-person, whether there's going to be an entrance fee, amount of the entrance fee, date, time, and location.
>* 1.1.6.2  Event holders shall be able to edit the related information fields (See 1.1.6.1) of their event. 
>* 1.1.6.3  Event holders shall be able to cancel or postpone their events.

</details>

<details>

 <summary> 1.1.7 Browsing and Searching </summary>

>* 1.1.7.1  Users shall type on the search bar, press enter or click on the search button in order to search for a tag, course, or profile.
>* 1.1.7.2 Users shall be able to inspect the summary of the course content without enrolling in them. 

</details>

### 1.2 System Requirements

<details>

<summary> 1.2.1 Searching </summary>

>* 1.2.1.1 A user shall be able to search any topic with the search box in top of the page.
>* 1.2.1.2 Results of the search will be in order based on section 1.2.3 in [Requirements](https://github.com/bounswe/bounswe2022group1/wiki/Requirements).
>* 1.2.1.3 Searching shall be based on semantic searching.
>* 1.2.1.4 Courses shall be searched in search bar of search page.
>* 1.2.1.5 Users shall be able to be searched. 



</details>

<details>

 <summary> 1.2.2 Pages </summary>

>  <details>
>
> <summary> 1.2.2.1 Profile Page </summary> 
>
>* 1.2.2.1.1 Profile page shall include profile picture, username and personal information considering user's privacy settings. 
>* 1.2.2.1.2 System shall be able to allow users to edit their profile picture and personal information on their profile page.
>* 1.2.2.1.3 There shall be a follow button on every user's profile page, which users use to follow other people.
>
>  </details>
>  <details>
>
> <summary> 1.2.2.2 Main Page </summary> 
>
>* 1.2.2.2.1 Main page shall include most popular courses for the guest users. 
>
>  </details>
>  <details>
>
> <summary> 1.2.2.3 My Courses Page </summary> 
>
>* 1.2.2.3.1 My courses page shall show the courses that a user is enrolled or that a user created.  
>
>  </details>
>  <details>
>
> <summary> 1.2.2.4 Course Pages </summary> 
>
>* 1.2.2.4.1 A course page shall include the course overview if a user is not enrolled yet, or the course content fully if a user is enrolled. 
>* 1.2.2.4.2 A course page shall be able to be fully customizable by a teacher. 
>* 1.2.2.4.3 A course page shall include a note-taking part. 
>
>  </details>


</details>

<details>

<summary> 1.2.3 Recommendations </summary>

>* 1.2.3.1 Users will see recomended courses in the homepage.
>* 1.2.3.2 The recommeded courses will be decided based on their interests that they chose at the beginning, courses to which users enrolled, and what they searched.


</details>

<details>

 <summary> 1.2.4 Note Taking </summary>

>
>* 1.2.4.1 Users should have a page to take notes while taking the course.
>* 1.2.4.2 Users should have access to different colors and fonts while taking notes.
>* 1.2.4.3 User notes should stay unchanged when user loggs off.
>

</details>

<details>

 <summary> 1.2.5 Annotations </summary>

>
>* 1.2.5.1 System shall support creating annotation on the screen.
>* 1.2.5.2 System shall support to add text or images to the annotation.
>* 1.2.5.3 System shall create hyperlink in the annotation if given text is a link.
>


</details>

<details>

 <summary> 1.2.6 Communication Channels </summary>

>  <details>
>
> <summary> 1.2.6.1 Messaging </summary> 
>
>* 1.2.6.1.1. System should support direct messaging between the registered users.
>* 1.2.6.1.2  System should mark up all messages with corresponding timestamp just right corner of the username.
>* 1.2.6.1.3  System should put the username of the sender just above the message.
>* 1.2.6.1.4  System should hide messages happening between two users from the others.
>* 1.2.6.1.5  System should save the messages in the database for forever.
>* 1.2.6.1.6  System should support sharing of resource like image.
>* 1.2.6.1.7  System should support text messages for discussing ideas.
>* 1.2.6.1.8  System should support asking and answering questions.
>* 1.2.6.1.9  System should support sharing of notes with other users.
>
>  </details>
>  <details>
>
> <summary> 1.2.6.2 Forum </summary> 
>
>* 1.2.6.2.1 System must have communication channels support.
>* 1.2.6.2.2 System should support leaving comment for the lecturer.
>* 1.2.6.2.3 System should support leaving comment for the course.
>* 1.2.6.2.4 System should support sharing of resource like image.
>* 1.2.6.2.5 System should make everyone to be able to write into forum page for discussing ideas.
>* 1.2.6.2.6 System should support asking and answering questions on the forum.
>* 1.2.6.2.7 System should make lecturers be able to create pools in three modes: anonymous mode, multiple answers, and quiz mode.
>
>  </details>
</details>


### 2. Non-functional Requirements
<details>
<summary> 2.1 Privacy </summary>
 
>* 2.1.1 The platform must comply with all rules regarding [KVKK](https://www.kvkk.gov.tr/) and [GDPR](https://gdpr.eu/).
>* 2.1.2 User should register only accepting the privacy policy based on KVKK and GDPR.

</details>

<details>
<summary> 2.2 Security </summary>
 
>* 2.2.1 Registering email address should be valid and unique because of using that email address to activate account, change password.
>* 2.2.2 Passwords must be at least 8 characters long and includes at least one uppercase letter, one lowercase letter, one number, one special character.
>* 2.2.3 The system shall encrypt passwords with [SHA-256](https://en.wikipedia.org/wiki/SHA-2) algorithm using a randomly generated salt. Passwords hashes and the respective salt shall be stored in the database.
>* 2.2.4 Users cannot be able to perform actions without priveleges not defined for them. For example users should not access to data of other users.
>* 2.2.5 New access tokens should be generated for every user and api endpoints should be protected with access tokens.
>* 2.2.6 All inputs should be validated in order to mitigate attacks like [SQL injection](https://en.wikipedia.org/wiki/SQL_injection).
>* 2.2.7 Password fields for login and logout user interfaces shoud be hidden.
</details>

<details>
<summary> 2.3 Accessability </summary>

>* 2.3.1 The platform should be accessed via Android application and web interface which should be responsive and support Chrome, Firefox, Safari, Edge and Opera. 
>* 2.3.2 The platform language should be English and support [UTF-8](https://en.wikipedia.org/wiki/UTF-8) character encoding. 

</details>
<details>
<summary> 2.4 Performance & Realiability </summary>
 
>* 2.4.1 At least 1.000 registered users with their actions should be satisfied simultaneosly.
>* 2.4.2 At least 15.000 guest users should be able to inspect the system. 
>* 2.4.3 A user should have a response in at most 1.5 seconds excluding the delay based on the machine that the user uses.
>* 2.4.4 The system should back up every data related the project in every 1 hour.
>* 2.4.5 Updates on the system are done at the time that usage of the system has least users. This time will be determined 2 months after the first start.
</details>
<details>
<summary> 2.5 Standards </summary>
 
>* 2.5.1 The project should satisy the rules of W3C Standards.  
>* 2.5.2 The semantic should be based on wikidata.org.


</details>



