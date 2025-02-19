# 🃏 Random Joke App Frontend

This is the frontend for the **Random Joke App**, where users can:

- View random jokes in a question-and-answer format.
- React to jokes with emojis and see vote counts update instantly.
- Navigate through jokes using a "Next Joke" button.

The app is built with **Next.js** and styled using **Tailwind CSS** for a modern, clean design, ensuring a mobile-responsive experience.

---

## 🚀 Features

### 1. **Joke Display**

- Shows random jokes with question & answer format.
- Displays emoji reactions with live vote counts.
- Includes a "Next Joke" button for easy navigation.

### 2. **Voting System**

- Users can vote using emoji reactions.
- Vote counts update instantly via API.
- 🌟 **Bonus**: Each joke maintains its own vote history.

### 3. **User Interface**

- Clean and modern design with **Tailwind CSS**.
- Fully mobile-responsive for optimal viewing on any device.

### 4. **State Management & Data Fetching**

- Uses React state and **Next.js hooks** for managing jokes and votes.
- Communicates with backend using `fetch` API.
- 🌟 **Bonus**:
  - Implements **React Context** for session management.
  - Utilizes **React Query** for efficient data fetching and caching.

---

## 🛠️ Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation
- **Tailwind CSS**: Styling
- **React Query**: Data fetching and state management
- **React Context**: Session management (Bonus)
- **Fetch API**: Communicates with backend API

---

## ⚙️ Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/random-joke-frontend.git
   cd random-joke-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your backend URL:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## 🔄 API Endpoints

The app communicates with the backend using the following endpoints:

- **GET /api/joke/random**: Fetches a random joke.
- **POST /api/joke/:id/vote**: Posts a vote for a joke.
