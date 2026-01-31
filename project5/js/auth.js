// js/auth.js

import { auth, db } from "./firebaseConfig.js";
import { logAction, logError } from "./logger.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ============================
   STUDENT REGISTRATION
============================ */

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // Save user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                role: "student",
                approved: false
            });

            logAction("AUTH", "Student registered: " + email);
            alert("Registration successful! Wait for admin approval.");

            window.location.href = "login.html";

        } catch (error) {
            logError("AUTH", error.message);
            alert(error.message);
        }
    });
}

/* ============================
   LOGIN (ALL ROLES)
============================ */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));

            if (!userDoc.exists()) {
                alert("User data not found!");
                return;
            }

            const userData = userDoc.data();

            if (userData.role === "student" && !userData.approved) {
                alert("Admin approval pending!");
                return;
            }

            logAction("AUTH", "User logged in: " + email);

            // Role-based redirect
            if (userData.role === "admin") {
                window.location.href = "admin.html";
            } else if (userData.role === "teacher") {
                window.location.href = "teacher.html";
            } else {
                window.location.href = "student.html";
            }

        } catch (error) {
            logError("AUTH", error.message);
            alert(error.message);
        }
    });
}
