// Academics Data for St. Berchmans College MCA Programme (Batch 2026–2028)
// Official curriculum structure, semester subjects, timetable, and syllabus resources

export const SYLLABUS_PDF_URL = "https://www.mgu.ac.in/uploads/2021/02/SCHEMESYLLABUS-OF-MCA-2020.pdf";

export const timetableInfo = {
  title: "MCA TIME TABLE",
  batch: "First MCA Batch (2026–2028)",
  description: "Official weekly class schedule for the first semester MCA cohort.",
  columns: [
    { id: 1, label: "Period 1", time: "09:30 - 10:30" },
    { id: 2, label: "Period 2", time: "10:30 - 11:30" },
    { id: 3, label: "Period 3", time: "11:30 - 12:30" },
    { id: 4, label: "Period 4", time: "01:15 - 02:15" },
    { id: 5, label: "Period 5", time: "02:15 - 03:15" },
    { id: 6, label: "Period 6", time: "03:15 - 04:15" }
  ],
  schedule: [
    {
      day: "1ST",
      dayName: "Day 1",
      periods: [
        { subject: "SE", faculty: "ABB", isLab: false },
        { subject: "C-LAB", faculty: "SHARON", isLab: true },
        { subject: "C-LAB", faculty: "SHARON", isLab: true },
        { subject: "C", faculty: "SHARON", isLab: false },
        { subject: "DIGITAL", faculty: "RJ", isLab: false },
        { subject: "SOFT SKILL", faculty: "", isLab: false }
      ]
    },
    {
      day: "2ND",
      dayName: "Day 2",
      periods: [
        { subject: "SE", faculty: "ABB", isLab: false },
        { subject: "DBMS", faculty: "RJ", isLab: false },
        { subject: "DBMS", faculty: "SK", isLab: false },
        { subject: "C", faculty: "AM", isLab: false },
        { subject: "DIGITAL", faculty: "RJ", isLab: false },
        { subject: "MATHS", faculty: "PV", isLab: false }
      ]
    },
    {
      day: "3RD",
      dayName: "Day 3",
      periods: [
        { subject: "DBMS", faculty: "RJ", isLab: false },
        { subject: "MATHS", faculty: "PV", isLab: false },
        { subject: "C", faculty: "AM", isLab: false },
        { subject: "DBMS LAB", faculty: "SK", isLab: true },
        { subject: "SE", faculty: "ABB", isLab: false },
        { subject: "DBMS LAB", faculty: "RJ", isLab: true }
      ]
    },
    {
      day: "4TH",
      dayName: "Day 4",
      periods: [
        { subject: "C", faculty: "SHARON", isLab: false },
        { subject: "C LAB", faculty: "AM", isLab: true },
        { subject: "C LAB", faculty: "AM", isLab: true },
        { subject: "MATHS", faculty: "SVB", isLab: false },
        { subject: "DIGITAL", faculty: "RJ", isLab: false },
        { subject: "SOFT SKILL", faculty: "", isLab: false }
      ]
    },
    {
      day: "5TH",
      dayName: "Day 5",
      periods: [
        { subject: "DIGITAL", faculty: "RJ", isLab: false },
        { subject: "DBMS", faculty: "SK", isLab: false },
        { subject: "MATHS", faculty: "SVB", isLab: false },
        { subject: "SE", faculty: "ABB", isLab: false },
        { subject: "DBMS LAB", faculty: "SK", isLab: true },
        { subject: "DBMS LAB", faculty: "SK", isLab: true }
      ]
    }
  ],
  legend: [
    { code: "SK", name: "Ms. Smitha Krishnan", role: "Head of the Department (HOD)" },
    { code: "RJ", name: "Ms. Rini Elizabeth Jacob", role: "Assistant Professor / Tutor" },
    { code: "AM", name: "Ms. Aswathy Manoharan", role: "Assistant Professor" },
    { code: "PV", name: "Ms. P. Vijaya Lakshmi", role: "Faculty Member" },
    { code: "SVB", name: "Mr. Sachin Varghese Biju", role: "Assistant Professor" },
    { code: "ABB", name: "Faculty member as represented in the timetable", role: "Faculty Member" },
    { code: "SHARON", name: "Faculty member as represented in the timetable", role: "Faculty Member" }
  ]
};

export const semestersData = [
  {
    semester: "Semester I",
    semNumber: 1,
    totalCredits: 25,
    description: "Foundational computer science principles, structured programming, core databases, and essential mathematics.",
    courses: [
      {
        code: "MCA CT 101",
        title: "Mathematical & Statistical Foundation for Computer Applications",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 102",
        title: "Digital Logic & Computer Organization",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 103",
        title: "Structured Programming in C",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 104",
        title: "Software Engineering and Object Oriented Modeling",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 105",
        title: "Database Technology and NoSQL",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CP 106",
        title: "Database Technology Lab (MySQL & MongoDB)",
        type: "Lab",
        hours: 4,
        credits: 2
      },
      {
        code: "MCA CP 107",
        title: "Software Development Lab-I (C Programming)",
        type: "Lab",
        hours: 4,
        credits: 2
      },
      {
        code: "MCA CT 108",
        title: "Employability Skill Training – Phase 1",
        type: "Practical / Training",
        hours: 2,
        credits: 1
      }
    ]
  },
  {
    semester: "Semester II",
    semNumber: 2,
    totalCredits: 23,
    description: "Advanced data structures, optimization techniques, computer networking, data science, and object-oriented paradigms.",
    courses: [
      {
        code: "MCA CT 201",
        title: "Optimization Techniques for Computer Applications",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 202",
        title: "Data Structures and Algorithm Analysis",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 203",
        title: "Computer Networking with TCP/IP",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 204",
        title: "Data Science & Big Data Analysis",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CP 205",
        title: "Object Oriented Lab (Java Lab)",
        type: "Lab",
        hours: 4,
        credits: 3
      },
      {
        code: "MCA CP 206",
        title: "Software Development Lab-II",
        type: "Lab",
        hours: 4,
        credits: 2
      },
      {
        code: "MCA CP 207",
        title: "Data Structures Lab using C",
        type: "Lab",
        hours: 4,
        credits: 2
      }
    ]
  },
  {
    semester: "Semester III",
    semNumber: 3,
    totalCredits: 23,
    description: "Machine learning, cyber forensics, domain electives, Python data science, Linux OS lab, and hands-on mini project.",
    courses: [
      {
        code: "MCA CT 301",
        title: "Machine Learning Techniques",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 302",
        title: "Cyber Forensics",
        type: "Theory",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA ET 303",
        title: "Elective I (Group A)",
        type: "Elective",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA ET 304",
        title: "Elective II (Group B)",
        type: "Elective",
        hours: 4,
        credits: 4
      },
      {
        code: "MCA CT 305",
        title: "Python Programming for Data Science",
        type: "Theory / Practical",
        hours: 3,
        credits: 2
      },
      {
        code: "MCA CP 306",
        title: "Advanced Operating System Lab using Linux",
        type: "Lab",
        hours: 4,
        credits: 2
      },
      {
        code: "MCA CP 307",
        title: "Mini Project",
        type: "Project",
        hours: 4,
        credits: 2
      },
      {
        code: "MCA CT 308",
        title: "Employability Skill Training – Phase 2",
        type: "Practical / Training",
        hours: 2,
        credits: 1
      }
    ]
  },
  {
    semester: "Semester IV",
    semNumber: 4,
    totalCredits: 19,
    description: "Comprehensive industry/research main project, academic seminar presentation, and cumulative course viva.",
    courses: [
      {
        code: "MCACS 401",
        title: "Seminar",
        type: "Seminar",
        hours: 2,
        credits: 2
      },
      {
        code: "MCA CP 402",
        title: "Main Project",
        type: "Project",
        hours: 20,
        credits: 12
      },
      {
        code: "MCA CV 403",
        title: "Course Viva",
        type: "Viva",
        hours: "-",
        credits: 5
      }
    ]
  }
];

export const electivesData = {
  groupA: {
    code: "MCA ET 303",
    groupTitle: "Elective I (Group A)",
    credits: 4,
    courses: [
      { code: "MCA ET 303 A", title: "Artificial Intelligence" },
      { code: "MCA ET 303 B", title: "Enterprise Resource Planning" },
      { code: "MCA ET 303 C", title: "Computer Graphics and Multimedia" },
      { code: "MCA ET 303 D", title: "Digital Image Processing" }
    ]
  },
  groupB: {
    code: "MCA ET 304",
    groupTitle: "Elective II (Group B)",
    credits: 4,
    courses: [
      { code: "MCA ET 304 A", title: "Cloud Computing" },
      { code: "MCA ET 304 B", title: "Cryptography and Network Security" },
      { code: "MCA ET 304 C", title: "Business Management and Information System" },
      { code: "MCA ET 304 D", title: "Internet of Things (IoT)" }
    ]
  }
};

export const creditSummary = {
  total: 90,
  breakdown: [
    { semester: "Semester I", credits: 25, label: "Core Foundation & Labs" },
    { semester: "Semester II", credits: 23, label: "Advanced Computing & Systems" },
    { semester: "Semester III", credits: 23, label: "Machine Learning, Electives & Mini Project" },
    { semester: "Semester IV", credits: 19, label: "Main Project, Seminar & Viva" }
  ]
};
