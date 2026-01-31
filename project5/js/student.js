// js/student.js

import { db } from "./firebaseConfig.js";
import { logAction, logError } from "./logger.js";

import {
    collection,
    getDocs,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const teacherList = document.getElementById("teacherList");

/* ============================
   LOAD TEACHERS
============================ */

async function loadTeachers() {
    try {
        const querySnapshot = await getDocs(collection(db, "teachers"));
        teacherList.innerHTML = "";

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();

            const div = document.createElement("div");
            div.innerHTML = `
                <p>
                    <strong>${data.name}</strong><br>
                    Department: ${data.department}<br>
                    Subject: ${data.subject}
                </p>
                <hr>
            `;
            teacherList.appendChild(div);
        });

        logAction("STUDENT", "Loaded teacher list");

    } catch (error) {
        logError("STUDENT", error.message);
    }
}

loadTeachers();

/* ============================
   BOOK APPOINTMENT
============================ */

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const studentName = document.getElementById("studentName").value;
        const teacherName = document.getElementById("teacherName").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;

        try {
            await addDoc(collection(db, "appointments"), {
                studentName,
                teacherName,
                date,
                time,
                status: "pending"
            });

            logAction(
                "STUDENT",
                `Appointment booked with ${teacherName} on ${date}`
            );

            alert("Appointment booked successfully!");
            appointmentForm.reset();

        } catch (error) {
            logError("STUDENT", error.message);
        }
    });
}
