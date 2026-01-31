// js/teacher.js

import { db } from "./firebaseConfig.js";
import { logAction, logError } from "./logger.js";

import {
    collection,
    getDocs,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const appointmentList = document.getElementById("appointmentList");

/* ============================
   LOAD APPOINTMENTS
============================ */

async function loadAppointments() {
    try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        appointmentList.innerHTML = "";

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();

            const div = document.createElement("div");
            div.innerHTML = `
                <p>
                    Student: ${data.studentName} <br>
                    Date: ${data.date} <br>
                    Time: ${data.time} <br>
                    Status: ${data.status}
                </p>
                <button onclick="approveAppointment('${docSnap.id}')">Approve</button>
                <button onclick="cancelAppointment('${docSnap.id}')">Cancel</button>
                <hr>
            `;
            appointmentList.appendChild(div);
        });

        logAction("TEACHER", "Loaded appointments");

    } catch (error) {
        logError("TEACHER", error.message);
    }
}

loadAppointments();

/* ============================
   APPROVE APPOINTMENT
============================ */

window.approveAppointment = async function (appointmentId) {
    try {
        await updateDoc(doc(db, "appointments", appointmentId), {
            status: "approved"
        });

        logAction("TEACHER", "Approved appointment: " + appointmentId);
        alert("Appointment approved");

        loadAppointments();

    } catch (error) {
        logError("TEACHER", error.message);
    }
};

/* ============================
   CANCEL APPOINTMENT
============================ */

window.cancelAppointment = async function (appointmentId) {
    try {
        await updateDoc(doc(db, "appointments", appointmentId), {
            status: "cancelled"
        });

        logAction("TEACHER", "Cancelled appointment: " + appointmentId);
        alert("Appointment cancelled");

        loadAppointments();

    } catch (error) {
        logError("TEACHER", error.message);
    }
};
