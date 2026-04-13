// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRlBr82rM5HeGrK4VO8OyYxgXIE36BZVE",
    authDomain: "deebichat-e80c4.firebaseapp.com",
    databaseURL: "https://deebichat-e80c4-default-rtdb.firebaseio.com",
    projectId: "deebichat-e80c4",
    storageBucket: "deebichat-e80c4.firebasestorage.app",
    messagingSenderId: "466764715803",
    appId: "1:466764715803:web:957d6bbeb8aa9b717b25be",
    measurementId: "G-LNVVXMCT1C"
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
const messagesRef = ref(db, 'messages');

const isConfigured = true; // Set to true as we now have config

// Select Elements
const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const chatForm = document.getElementById('chat-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('chat-messages');
const displayName = document.getElementById('display-name');
const currentAvatar = document.getElementById('current-avatar');
const logoutBtn = document.getElementById('logout-btn');

// App State
let currentUser = JSON.parse(localStorage.getItem('deebi_user'));

// Initialize App State
if (currentUser) {
    showChat();
}

// Login Logic
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value.toLowerCase().trim();
    const pass = document.getElementById('password').value;

    if ((user === 'vasanth' || user === 'dheebi') && pass === '2008') {
        currentUser = {
            username: user,
            displayName: user.charAt(0).toUpperCase() + user.slice(1)
        };
        localStorage.setItem('deebi_user', JSON.stringify(currentUser));
        showChat();
        loginError.textContent = "";
    } else {
        loginError.textContent = "Invalid username or password. Access Denied.";
        loginError.style.color = "#ef4444";
    }
});

function showChat() {
    loginScreen.classList.remove('active');
    setTimeout(() => {
        chatScreen.classList.add('active');
        displayName.textContent = currentUser.displayName;
        currentAvatar.textContent = currentUser.username.charAt(0).toUpperCase();
        
        if (!isConfigured) {
            appendSystemMessage("⚠️ Firebase not configured. Chat will work locally in this session only.");
        }
        
        loadMessages();
    }, 500);
}

// Logout Logic
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('deebi_user');
    chatScreen.classList.remove('active');
    setTimeout(() => {
        loginScreen.classList.add('active');
    }, 500);
});

// Chat Logic
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value.trim();
    if (!text) return;

    if (isConfigured) {
        // Send to Firebase
        push(messagesRef, {
            sender: currentUser.username,
            text: text,
            timestamp: serverTimestamp()
        });
    } else {
        // Mock Send for Local Session
        appendMessage({
            sender: currentUser.username,
            text: text,
            timestamp: Date.now()
        }, true);
    }

    messageInput.value = '';
    messageInput.focus();
});

function loadMessages() {
    if (isConfigured) {
        onChildAdded(messagesRef, (data) => {
            const msg = data.val();
            appendMessage(msg, msg.sender === currentUser.username);
        });
    }
}

function appendMessage(msg, isSent) {
    const time = msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now';
    
    const div = document.createElement('div');
    div.className = `message ${isSent ? 'message-sent' : 'message-received'}`;
    
    div.innerHTML = `
        <div class="message-content">${msg.text}</div>
        <div class="message-info">
            <span>${isSent ? 'You' : msg.sender}</span>
            <span>${time}</span>
        </div>
    `;
    
    // Remove welcome message on first activity
    const welcome = document.querySelector('.welcome-message');
    if (welcome) welcome.remove();

    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function appendSystemMessage(text) {
    const div = document.createElement('div');
    div.className = 'welcome-message';
    div.innerHTML = `<p style="color: #94a3b8; font-size: 0.8rem;">${text}</p>`;
    messagesContainer.appendChild(div);
}
