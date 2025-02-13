# FreelanceSphere using Spring Boot
To demonstrate the use of stateless RESTful web services by creating prototype of Freelancer web application.

```
CDAC Project
```

## User stories:

* I can Sign Up, Sign In and Logout from application.
* As an authenticated user, I can bid on projects posted.
* As an authenticated user, I can Post Project and get bids from other users.
* As an authenticated user, I can Hire freelancer on the basis of bids received.
* As an authenticated user, I can Check open projects and bid on projects posted by other users.
* As an authenticated user, I can Check project completion date when freelancer is hired.
* As an authenticated user, I can Create and edit profile information.

> For Detailed Description check [Project Report]
(https://drive.google.com/drive/folders/1zLhyoVT7WW452FJYJ3t9aS_jtHo98nPA?usp=sharing)

## SHREENSHOTS - 
1. Landing Page: Showcasing platform features.![image](https://github.com/user-attachments/assets/940c6706-62b4-497d-aae0-fdf0d0391530)

2. Signup Page:  User registration interface.
 ![image](https://github.com/user-attachments/assets/9d519c05-c2b4-4d8d-ba49-c4cd2f711912)

3. Login Page: User authentication interface.
 ![image](https://github.com/user-attachments/assets/131bc1c8-4d5c-4b6f-a481-17e6bd392766)

4. Freelancer Dashboard: Tools for profile and earnings management.
 ![image](https://github.com/user-attachments/assets/6f18984c-e567-4cec-991a-09f87a752771)

5. Customer Booking Page: Service browsing and booking.
![image](https://github.com/user-attachments/assets/ef5f7772-302a-4009-b92b-5141c093d06a)

6. Order Summary: Details post-booking.
 ![image](https://github.com/user-attachments/assets/cdb76940-0d88-4dd8-8b1b-b1f62423d3cf)


## System Design
> Applications uses a simple Client-Server architecture

* Client Side : ReactJS (HTML5 and Bootstrap)
```
Consists of total 20 React components. 
Effective modularisation is used in each component so as to increase reusability.
```

* Server Side : Java, Springboot, Hibernate

```
Consists of 18 APIs to serve client requests.
```

* Database :  MySQL
```
Consists of mainly 4 tables.
User : To store user related information
Project : To stores project details posted by user.
Attachments : Stores server path for attachments like project document and user profile pictures
Bid : To store bids
```


## System Architecture
![Architecture](https://github.com/Prajapatikapil41/FreelanceSphere/blob/main/architecture.jpg)


### Technology stack

<table>
<thead>
<tr>
<th>Area</th>
<th>Technology</th>
</tr>
</thead>
<tbody>
	<tr>
		<td>Front-End</td>
		<td>React, Redux, React Router, Bootstrap, HTML5, CSS3, Javascript ( ES6 )</td>
	</tr>
	<tr>
		<td>Back-End</td>
		<td>Java, Springboot, Hibernate</td>
	</tr>
	<tr>
		<td>Database</td>
		<td>MySQL</td>
	</tr>
</tbody>
</table>
<br/>


### Steps to run application:
•	Create schema called freelancer
•	import as maven project
•	install all dependencies
•	run the Main class

### Steps to run React side:
•	run npm install
•	run npm start


## 📝 Author
[<img src="https://avatars.githubusercontent.com/u/81869156?s=400&u=ff6de7017b51e4d96dbfb1ae39c7a459d5e13ea8&v=4" align="right" height="100">](https://github.com/Prajapatikapil41)

[<img src="![IMG-20241128-WA0009](https://github.com/user-attachments/assets/fab2890d-4388-4e93-9ce3-9826e9e36bd9)" align="right" height="100">](https://github.com/Gupta24Divyanshu)

[<img src="https://avatars.githubusercontent.com/u/122085918?v=4" align="right" height="100">](https://github.com/HarshdeepMalviya)

##### Kapil Prajapati <kbd> [Github](https://github.com/Prajapatikapil41) / [LinkedIn](https://www.linkedin.com/in/kapil-prajapati-7ba4b51b7/) / [E-Mail](kapilprajapati0403@gmail.com)</kbd>

##### Divyanshu Gupta <kbd> [Github](https://github.com/Gupta24Divyanshu) / [LinkedIn](https://www.linkedin.com/in/divyanshu-gupta-dev670/) / [E-Mail](divyanshuofficial24@gmail.com)</kbd>

##### Harshdeep Malviya <kbd> [Github](https://github.com/HarshdeepMalviya) / [LinkedIn](https://www.linkedin.com/in/harshdeep-malviya-5a3506241/) / [E-Mail](harshdeepmalviya08@gmail.com)</kbd>
