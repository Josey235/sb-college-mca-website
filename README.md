# St. Berchmans College — MCA Department Website

Official website for the newly started **Master of Computer Applications (MCA)** programme at **St. Berchmans College, Changanassery, Kerala**.

---

## 🏛️ Verified Facts & Information

- **Institution**: St. Berchmans College, Changanassery, Kerala
- **Programme**: Master of Computer Applications (MCA)
- **Programme Start Year**: 2026
- **Inaugural Batch**: Batch 2026–2028 (First MCA Batch)
- **Head of Department**: Smitha
- **Students Enrolled (Initial list)**:
  1. Sillamol Shibu
  2. Josey Joseph
- **Tagline**: "Where our first MCA journey begins."
- **Prominent Campus Image**: `src/assets/images/college/sb-college.jpg`

---

## 📁 Image Structure

```
src/assets/images/
├── college/
│   └── sb-college.jpg        # Local St. Berchmans College image used in Hero & Gallery
├── faculty/                  # Place real faculty photos here
├── students/                 # Place real student photos here
├── projects/                 # Place future project screenshots here
├── events/                   # Place future event posters here
└── gallery/                  # Place future department photos here
```

---

## ✏️ Adding Real Data Later

All student, faculty, and academic data are decoupled into clean JavaScript files in `src/data/`:
- **Add Faculty**: Open [`src/data/faculty.js`](file:///d:/Mca%20Website/src/data/faculty.js) and add new faculty objects.
- **Add Students**: Open [`src/data/students.js`](file:///d:/Mca%20Website/src/data/students.js) and add new student entries.
- **Add Projects**: Open [`src/data/projects.js`](file:///d:/Mca%20Website/src/data/projects.js).
- **Add Events**: Open [`src/data/events.js`](file:///d:/Mca%20Website/src/data/events.js).
- **Add Syllabus / Academics**: Open [`src/data/academics.js`](file:///d:/Mca%20Website/src/data/academics.js).
- **Add Gallery**: Open [`src/data/gallery.js`](file:///d:/Mca%20Website/src/data/gallery.js).

---

## 🚀 Running the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build
```
