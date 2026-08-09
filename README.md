# 🔍 DevFinder — GitHub Profile & Repository Explorer

A modern, responsive web application built with **Vanilla JavaScript**, **CSS3**, and **HTML5** that leverages the **GitHub REST API** to search profiles, inspect user statistics, dark/light theme switching, and highlight recent public repositories.

---

## 🌟 Key Features

* **Instant Developer Search:** Fetch profile information, user bios, locations, and personal website links.
* **Real-time Metrics:** Clear display of public repository counts, followers, and following statistics.
* **Recent Repositories:** Direct preview cards showing a user's recent public repositories with live star and fork counts.
* **Dark / Light Mode:** Built-in theme toggling powered by CSS variables and local storage compatibility.
* **Dynamic Loading States:** Visual feedback indicators for data fetching and missing profile errors.
* **Responsive Design:** Mobile-first, flexbox/grid layout optimized across all screen sizes.

---

## 🛠️ Tech Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Custom Variables, CSS Grid, Flexbox) |
| **Logic** | Vanilla JavaScript (ES6+, Async/Await, Fetch API) |
| **Icons** | Font Awesome 6 |
| **API** | GitHub REST API v3 |

---

## 🚀 Live Demo

Check out the live version of the project hosted on GitHub Pages:
👉 **[View Live Demo](https://sidequest-code.github.io/devfinder/)**

---

## 📂 Project Structure

```text
github-profile-finder/
│
├── index.html       # Application HTML markup
├── style.css        # CSS variable theme definitions & layouts
├── script.js       # GitHub API integration & DOM manipulation logic
└── README.md        # Project documentation

💻 Local Setup & Installation
Clone the repository:

Bash
git clone [https://github.com/sidequest-code/devfinder.git](https://github.com/sidequest-code/devfinder.git)
Navigate into the project directory:

Bash
cd devfinder
Launch the app:
Simply open index.html in your favorite web browser or use VS Code's Live Server extension.

🔌 API Usage
This application consumes public data from the GitHub REST API:

User Profile Endpoint: GET https://api.github.com/users/{username}

User Repositories Endpoint: GET https://api.github.com/users/{username}/repos

🤝 Contributing
Contributions, issues, and feature requests are welcome!

Feel free to check out the issues page.

📄 License
Distributed under the MIT License. See LICENSE for more details.