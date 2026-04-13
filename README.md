# Deebi Chat

A beautiful, real-time chat application designed exclusively for Vasanth and Dheebi.

## 🚀 How to set up Live Chatting

To make the chat work across different devices and locations, you need a **Firebase Realtime Database**. Follow these simple steps:

1.  **Create a Firebase Project**:
    -   Go to [Firebase Console](https://console.firebase.google.com/).
    -   Click **Add Project** and name it "DeebiChat".
2.  **Add a Web App**:
    -   Click the **Web (</>)** icon.
    -   Register your app name.
    -   You will see an `apiKey`, `authDomain`, etc. **Copy these**.
3.  **Setup Database**:
    -   In the sidebar, click **Build** > **Realtime Database**.
    -   Click **Create Database**.
    -   Choose a location and start in **Test Mode** (this allows you to chat immediately).
4.  **Update `app.js`**:
    -   Paste your Firebase configuration into the `const firebaseConfig` block at the top of `app.js`.

## 🌐 Deploying to GitHub Pages

1.  Create a new repository on GitHub named `deebi-chat`.
2.  Upload `index.html`, `style.css`, and `app.js`.
3.  Go to **Settings** > **Pages**.
4.  Select `main` branch and click **Save**.
5.  Your website will be live at `https://YOUR-USERNAME.github.io/deebi-chat/`!

## 🔐 Credentials
-   **Usernames**: vasanth, dheebi
-   **Password**: 2008
