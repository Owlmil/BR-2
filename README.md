# Adventure Map Game Hub

A web-based interactive map featuring multiple points of interest that direct players to mini-games. Each location has its own theme and corresponding game, providing a fun and educational experience.

---

## 🎮 Features

- **Interactive Map:** Clickable points of interest guide players to different games.  
- **Multiple Themes:** Current themes include:  
  - 🌊 Ocean  
  - 🌳 Forest  
  - 🏫 School  
  - 🛒 Grocery Store  
- **Mini-Games:** Each theme has its own unique mini-game.  

---

## 🗺️ Map Navigation

- Users start on the central map interface.  
- Clicking a **point of interest**:  
  1. Provides context for that location.  
  2. Redirects to the corresponding game page.  
- After completing a game, users can return to the map to explore other locations.

---

## ⚡ Technology Stack

- **Frontend:** React, Tailwind CSS, Phaser.js (for mini-games)  
- **Backend:** Node.js + Express (for fetching game data such as word lists)  
- **Routing:** React Router for navigation between map and games  

---

## 📂 Project Structure
/src
├─ /assets # Images, sprites, and background assets /n
├─ /components # Reusable UI components (LoadingScreen, Map, etc.) /n
├─ /pages # Game pages /n
└─ App.jsx # Main application entry /n


---

## 🚀 Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/yourusername/adventure-map-game.git
   cd frontend
2. Install dependencies:
   ```bash
      npm install
   ```

3. Start the backend:
   ```bash
   cd backend
   npm start
   ````

4. Start the frontend
  ```bash
  cd ../
  npm start
  ```

5. Open http://localhost:5173 in your browser and explore the map!

## 📝 Notes
- WordSearch and other mini-games fetch data from the backend.
- You can easily add new themes and games by creating new points of interest on the map.

## 🌟 Future Improvements
- Add more themes.
- Add scoreboards and achievements for each game.
- Make the map dynamic, allowing users to unlock games progressively.
