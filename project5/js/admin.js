// js/admin.js

import { db } from "./firebaseConfig.js";
import { logAction, logError } from "./logger.js";

import {
    collection,
    getDocs,
    updateDoc,
    doc,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ============================
   FETCH UNAPPROVED STUDENTS
============================ */

const studentList = document.getElementById("studentList");

async function loadPendingStudents() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        studentList.innerHTML = "";

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();

            if (data.role === "student" && data.approved === false) {
                const div = document.createElement("div");
                div.innerHTML = `
                    <p>${data.name} (${data.email})</p>
                    <button onclick="approveStudent('${docSnap.id}')">
                        Approve
                    </button>
                `;
                studentList.appendChild(div);
            }
        });

        logAction("ADMIN", "Loaded pending students");

    } catch (error) {
        logError("ADMIN", error.message);
    }
}

loadPendingStudents();

/* ============================
   APPROVE STUDENT
============================ */

window.approveStudent = async function (userId) {
    try {
        await updateDoc(doc(db, "users", userId), {
            approved: true
        });

        logAction("ADMIN", "Approved student: " + userId);
        alert("Student approved!");

        loadPendingStudents();

    } catch (error) {
        logError("ADMIN", error.message);
    }
};

/* ============================
   ADD TEACHER
============================ */

const addTeacherForm = document.getElementById("addTeacherForm");

if (addTeacherForm) {
    addTeacherForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("tname").value;
        const department = document.getElementById("department").value;
        const subject = document.getElementById("subject").value;

        try {
            await addDoc(collection(db, "teachers"), {
                name,
                department,
                subject
            });

            logAction("ADMIN", "Teacher added: " + name);
            alert("Teacher added successfully!");

            addTeacherForm.reset();

        } catch (error) {
            logError("ADMIN", error.message);
        }
    });
}
