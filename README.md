A full-stack, feature-rich social media application inspired by X (formerly Twitter), built with the MERN stack. This project demonstrates modern web development practices, including secure authentication, cloud media handling, and a dynamic, responsive user interface with infinite scrolling.

**🚀 Live Demo: https://x-clone-test.netlify.app **


## ✨ Features

* **Secure Authentication**: Robust user registration and login with passwords hashed using **bcrypt** and stateless authentication via **JSON Web Tokens (JWT)**.
* **Rich Media Posts**: Users can create posts with text, images, and videos.
* **Cloud Media Storage**: All media uploads are efficiently handled by the **Cloudinary** API, keeping the application scalable and performant.
* **Dynamic User Profiles**: View and edit user profiles, follower/following counts, and a gallery of user-specific posts.
* **Social Interaction**: Follow/unfollow users, like/unlike posts, and add comments to engage in discussions.
* **Infinite Scroll Feed**: A smooth, endlessly scrolling feed of posts, efficiently loaded on demand using **React Query** for optimal performance.
* **Interactive UI**: A responsive frontend built with **React** that includes clear loading states to provide a seamless user experience.
* **User Management**: Users can search for others and manage their own profile, including changing their password and username (with a once-a-day limit).

## 🛠️ Tech Stack

* **Frontend**: React.js, React Query
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Authentication**: JSON Web Tokens (JWT), bcrypt.js
* **Media Storage**: Cloudinary API
* **Environment Variables**: dotenv
