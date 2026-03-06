/**
 * Feature 1: Navigation & Global UI Logic
 */

// মোবাইল মেনু টগল (মোবাইল ডিভাইসের জন্য)
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('navMenu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        console.log("Mobile menu toggled");
    });
}

// স্মুথ স্ক্রলিং ফাংশন
function scrollToSearch(event) {
    if (event) event.preventDefault();
    const searchSection = document.getElementById('result-search');
    if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
    }
}


/**
 * Feature 2: Result Fetching & Marksheet Display
 */

async function handleResultSearch() {
    console.log("Search initiated...");

    // ১. HTML থেকে ইনপুট সংগ্রহ (নতুন classId সহ)
    const examName = document.getElementById('examName').value.trim();
    const year = document.getElementById('examYear').value.trim();
    const roll = document.getElementById('studentRoll').value.trim();
    const classId = document.getElementById('searchClassId').value; // নতুন যোগ করা হলো

    // ২. ভ্যালিডেশন (এখন classId-ও চেক করবে)
    if (!examName || !year || !roll || !classId) {
        alert("Please provide all details (Exam, Year, Roll, and Class) to fetch result.");
        return;
    }

    // ৩. বাটন স্টেট পরিবর্তন (Loading State)
    const searchBtn = document.getElementById('searchBtn');
    const originalBtnText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchBtn.disabled = true;

    // ৪. URL তৈরি (classId প্যারামিটার যোগ করা হয়েছে)
    const queryParams = new URLSearchParams({
        examName: examName,
        year: year,
        roll: roll,
        classId: classId // ব্যাকএন্ডে পাঠানোর জন্য
    });

    const url = `/results/search?${queryParams.toString()}`;
    console.log("Requesting URL:", url);

    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            console.log("Result data received:", data);

            // ৫. মার্কশিট দেখানো (আগে যদি লুকানো থাকে তবে .show ক্লাস যোগ হবে)
            const marksheetWrapper = document.getElementById('marksheetWrapper');
            marksheetWrapper.classList.add('show');
            marksheetWrapper.classList.remove('hidden-section');

            updateMarksheetUI(data); // UI আপডেট ফাংশন কল
        } else {
            // ব্যাকএন্ড থেকে আসা এরর মেসেজ (যেমন: "Result not published yet")
            const errorText = await response.text();
            alert("System Message: " + errorText);
            document.getElementById('marksheetWrapper').classList.remove('show');
        }
    } catch (error) {
        console.error("Search failed:", error);
        alert("Connection error! Please ensure your Spring Boot server is running.");
    } finally {
        // ৬. বাটন আগের অবস্থায় ফিরিয়ে আনা
        searchBtn.innerHTML = originalBtnText;
        searchBtn.disabled = false;
    }
}

// ৫. মার্কশিট কার্ড আপডেট এবং প্রদর্শন
function updateMarksheetUI(data) {
    const wrapper = document.getElementById('marksheetWrapper');

    // ডাটা ম্যাপিং
    document.getElementById('displayExamName').innerText = `${data.exam.examName} - ${data.exam.year}`;
    document.getElementById('displayGPA').innerText = data.gpa.toFixed(2);
    document.getElementById('displayName').innerText = data.student.fullName;
    document.getElementById('displayRoll').innerText = data.student.roll;
    document.getElementById('displayGrade').innerText = data.finalGrade;

    // পাস/ফেল স্ট্যাটাস কালার আপডেট
    const statusPill = document.getElementById('displayStatus');
    if (data.gpa >= 2.0) {
        statusPill.innerText = "PASSED";
        statusPill.style.background = "#d1fae5";
        statusPill.style.color = "#065f46";
    } else {
        statusPill.innerText = "FAILED";
        statusPill.style.background = "#fee2e2";
        statusPill.style.color = "#991b1b";
    }

    // কার্ডটি দেখানো
    wrapper.classList.add('show');

    // স্মুথলি রেজাল্ট কার্ডের কাছে নিয়ে যাওয়া
    setTimeout(() => {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
}

// ১. সেকশন পরিবর্তন করার লজিক
/**
 *Section Manager
 * এটি সব সেকশন একবারে ম্যানেজ করবে
 */
function showSection(sectionId) {
    // ১. 'section-padding' ক্লাস থাকা সব সেকশনকে একবারে হাইড করো
    document.querySelectorAll('.section-padding').forEach(section => {
        section.classList.add('d-none');
    });

    // ২. মেইন হিরো সেকশনটি হাইড করো
    const hero = document.getElementById('hero-section');
    if (hero) hero.classList.add('d-none');

    // ৩. যে সেকশনটি দেখাতে চাও (Target Section) সেটি শো করো
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('d-none');
        // পেজের উপরে স্ক্রল করে নিয়ে আসা (UX Improvement)
        window.scrollTo(0, 0);
    }

    // ৪. মার্কস এন্ট্রি সেকশনে গেলে অটোমেটিক ড্রপডাউন লোড করা
    if (sectionId === 'admin-marks') {
        initMarksEntry();
    }
}

/**
 * Student Management UI Logic (Modified for Afsar)
 */

// ১. অ্যাড স্টুডেন্ট বাটনে ক্লিক করলে শুধু ফর্ম দেখাবে, টেবিল হাইড হবে
function toggleStudentForm() {
    const form = document.getElementById('addStudentForm');
    const tableWrapper = document.getElementById('studentTableWrapper');

    form.classList.toggle('d-none');

    // যদি ফর্মটি দৃশ্যমান হয়, তবে টেবিলটি হাইড করে দাও
    if (!form.classList.contains('d-none')) {
        tableWrapper.classList.add('d-none');
    }
}

/**
 * Final Corrected Student Fetching Logic
 */
async function fetchStudents() {
    const tableWrapper = document.getElementById('studentTableWrapper');
    const tableBody = document.getElementById('studentTableBody');
    const form = document.getElementById('addStudentForm');

    tableWrapper.classList.remove('d-none');
    form.classList.add('d-none');
    tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-4">Loading Students...</td></tr>';

    try {
        const response = await fetch('/students/list');
        if (response.ok) {
            const students = await response.json();
            tableBody.innerHTML = '';

            const classMap = {
                "1": "Class 8",
                "2": "Class 9",
                "3": "Class 10"
            };

            students.forEach(std => {
                // ১. তোমার জাভা কোড অনুযায়ী এখানে 'classId' ব্যবহার করা হয়েছে
                const cId = std.classEntity ? std.classEntity.classId : null;

                // ২. ম্যাপিং চেক (String conversion ensures match)
                const className = classMap[String(cId)] || "N/A";

                tableBody.innerHTML += `
                    <tr>
                        <td><strong>${std.roll}</strong></td>
                        <td>${std.fullName}</td>
                        <td><span class="badge-class">${className}</span></td>
                        <td>${std.session}</td>
                        <td>
                            <button class="btn-icon" title="Edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon text-danger" title="Delete"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
            });
        }
    } catch (error) {
        console.error("Fetch failed:", error);
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-4 text-danger">Connection Error!</td></tr>';
    }
}
// ৪. নতুন স্টুডেন্ট সেভ করা
async function handleStudentSubmit(event) {
    event.preventDefault();
    const studentData = {
        fullName: document.getElementById('stdName').value,
        roll: document.getElementById('stdRoll').value,
        regNo: document.getElementById('stdRegNo').value,
        session: document.getElementById('stdSession').value,
        classEntity: { classId: document.getElementById('stdClassId').value }
    };

    try {
        const response = await fetch('/students/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert("Student Added Successfully!");
            toggleStudentForm();
            fetchStudents(); // টেবিল আপডেট করো
        }
    } catch (error) {
        alert("Error adding student!");
    }
}

/**
 * Feature 4: Exam Management Logic (Frontend)
 */

// ১. ফর্ম এবং টেবিল টগল করা (ক্লিন ভিউ)
function toggleExamForm() {
    const form = document.getElementById('createExamForm');
    const tableWrapper = document.getElementById('examTableWrapper');

    form.classList.toggle('d-none');

    // যদি ফর্ম ওপেন হয়, তবে টেবিলটি হাইড করে দাও
    if (!form.classList.contains('d-none')) {
        tableWrapper.classList.add('d-none');
    }
}

// ২. সব পরীক্ষার লিস্ট নিয়ে আসা এবং স্ট্যাটাস চেক করা
async function fetchExams() {
    const tableWrapper = document.getElementById('examTableWrapper');
    const form = document.getElementById('createExamForm');
    const tableBody = document.getElementById('examTableBody');

    // টেবিল দেখাও এবং ফর্ম হাইড করো
    tableWrapper.classList.remove('d-none');
    form.classList.add('d-none');

    tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4"><i class="fas fa-spinner fa-spin"></i> Loading...</td></tr>';

    try {
        const response = await fetch('/exams/list');

        if (response.status === 404) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">No exams found.</td></tr>';
            return;
        }

        if (response.ok) {
            const exams = await response.json();
            tableBody.innerHTML = '';

            // fetchExams() ফাংশনের ভেতরের লুপটি এভাবে আপডেট করো
            exams.forEach(exam => {
                // তোমার দেওয়া ভ্যারিয়েবল নাম 'publishStatus' এখানে ব্যবহার করা হয়েছে
                // যদি কোনো কারণে এটি খালি থাকে, তবে ডিফল্ট 'DRAFT' ধরবে
                const currentStatus = (exam.publishStatus || "DRAFT").toUpperCase();

                const isPublished = currentStatus === 'PUBLISHED';

                // স্ট্যাটাস অনুযায়ী ব্যাজ (Badge) সেট করা
                const statusBadge = isPublished
                    ? '<span class="badge-published">Published</span>'
                    : '<span class="badge-draft">Draft</span>';

                // বাটন লজিক: পাবলিশড থাকলে 'Make Draft' আর ড্রাফট থাকলে 'Publish Now'
                const actionBtn = isPublished
                    ? `<button class="btn-toggle text-warning" onclick="updateExamStatus(${exam.examId}, 'draft')"><i class="fas fa-eye-slash"></i> Make Draft</button>`
                    : `<button class="btn-toggle text-success" onclick="updateExamStatus(${exam.examId}, 'publish')"><i class="fas fa-paper-plane"></i> Publish Now</button>`;

                tableBody.innerHTML += `
                    <tr>
                        <td>#${exam.examId}</td>
                        <td><strong>${exam.examName}</strong></td>
                        <td>${exam.year}</td>
                        <td>${exam.session || 'N/A'}</td>
                        <td>${statusBadge}</td>
                        <td>${actionBtn}</td>
                    </tr>`;
            });
        }
    } catch (error) {
        console.error("Fetch error:", error);
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-danger">Connection Failed!</td></tr>';
    }
}

// ৩. স্ট্যাটাস আপডেট করা (Action Buttons)
async function updateExamStatus(id, action) {
    // action হবে 'publish' অথবা 'draft'
    const url = `/exams/${id}/${action}`;

    try {
        const response = await fetch(url, {
            method: 'POST', // তোমার @PostMapping এর সাথে মিল রেখে
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log(`Exam ${id} is now ${action}ed`);
            fetchExams(); // সফল হলে টেবিল রিফ্রেশ হবে
        } else {
            const errorText = await response.text();
            alert("System Message: " + errorText);
        }
    } catch (error) {
        console.error("Update failed:", error);
        alert("Server not responding!");
    }
}

async function initMarksEntry() {
    const examSelect = document.getElementById('entryExamId');
    if (!examSelect) return;

    try {
        const response = await fetch('/exams/list');
        if (response.ok) {
            const exams = await response.json();
            examSelect.innerHTML = '<option value="" selected disabled>Choose Exam</option>';

            exams.forEach(exam => {
                // এখানে ${exam.examName} এর সাথে ${exam.year} যোগ করা হয়েছে
                examSelect.innerHTML += `<option value="${exam.examId}">${exam.examName} - ${exam.year}</option>`;
            });
        }
    } catch (error) {
        console.error("Exam load failed:", error);
    }
}

// ২. তোমার 'getStudentByClass' মেথড ব্যবহার করে স্টুডেন্ট লোড করা
async function loadStudentsForMarks() {
    const classId = document.getElementById('entryClassId').value;
    const response = await fetch(`/students/filter?classId=${classId}`); // তোমার মেথডের এন্ডপয়েন্ট
    const students = await response.json();

    const tableBody = document.getElementById('entryTableBody');
    tableBody.innerHTML = '';
    students.forEach(std => {
        tableBody.innerHTML += `
            <tr>
                <td>${std.roll}</td>
                <td>${std.fullName}</td>
                <td>
                    <input type="number" class="mark-input custom-input" data-stdid="${std.studentId}">
                </td>
            </tr>`;
    });
    document.getElementById('entryTableWrapper').classList.remove('d-none');
}

// ৩. তোমার 'saveAllResult' মেথড ব্যবহার করে ডাটা সেভ করা
async function submitBulkMarks() {
    const examId = document.getElementById('entryExamId').value;
    const marksInputs = document.querySelectorAll('.mark-input');

    // ১. ভ্যালিডেশন: যদি কোনো স্টুডেন্ট ইনপুট না থাকে
        if (marksInputs.length === 0) {
            alert("Error: No students loaded!");
            return; // এখানেই ফাংশন বন্ধ হয়ে যাবে
        }

        if (!examId) {
            alert("Please select an exam first!");
            return;
        }

    const results = Array.from(marksInputs).map(input => ({
        exam: { examId: parseInt(examId) },
        student: { studentId: parseInt(input.dataset.stdid) },
        totalMarks: parseFloat(input.value || 0)
    }));

    const response = await fetch('/results/saveAllResult', { // তোমার মেথডের এন্ডপয়েন্ট
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results)
    });

    if (response.ok) {
        alert("Results uploaded successfully!");
        location.reload();
    }
}


console.log("EduResult Frontend Engine v1.2 - Fixed & Optimized");