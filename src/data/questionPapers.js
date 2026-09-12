/**
 * Previous Year Question Papers data.
 * Paths are relative to /public — served as static assets by Vite.
 * The base folder is /question.paper/ (note the dot, not dash).
 */

export const questionPapersData = [
  {
    sem: 'Sem 1',
    semKey: 'sem1',
    subjects: [
      {
        folderName: 'c sem1',
        displayName: 'Structured Programming in C',
        papers: [
          'MCA1SPC 2022 JAN STRUCTERED PROGRAMMING IN C.pdf',
          'MCA1SPC 2023 MAY STTRUCTURED PROGRAMMING IN C.pdf',
          'MCA1SPC 2024 JAN STRUCTURED PROGRAMMING IN C (1).pdf',
          'MCA1SPC 2024 NOV STRUCTURED PROGRAMMING IN C.pdf',
        ],
      },
      {
        folderName: 'dbms sem1',
        displayName: 'Database Technology and NoSQL',
        papers: [
          'MCA1DTN 2022 JAN DATA BASE TECHNOLOGY.pdf',
          'MCA1DTN 2023 MAY DATABASE TECHNOLOGY ANF NOSQL.pdf',
          'MCA1DTN 2024 JAN DATA BASE TECHNOLOGY (1).pdf',
          'MCA1DTN 2024 NOV DATABASE TECHNOLOGY AND NOSQL.pdf',
        ],
      },
      {
        folderName: 'digital sem1',
        displayName: 'Digital Logic and Computer Organisation',
        papers: [
          'MCA1DLCO 2022 JAN DIGITAL LOGIC AND COMPUTER ORGANISATION.pdf',
          'MCA1DLCO 2023 MAY DIGITAL LOGIC AND COMPUTER ORGANISATION.pdf',
          'MCA1DLCO 2024 JAN DIGITAL LOGIC AND COMPUTER APPLICATION (1).pdf',
          'MCA1DLCO 2024 NOV DIGITAL LOGIC AND COMPUTER ORGANISATION.pdf',
        ],
      },
      {
        folderName: 'mathematics and statistics sem1',
        displayName: 'Mathematical & Statistical Foundation',
        papers: [
          'MCA1MSFCA 2022 JAN MATHEMATICS.pdf',
          'MCA1MSFCA 2023 MAY MATHEMATICAL & STATISTICAL FOUNDATION.pdf',
          'MCA1MSFCA 2024 JAN MATHEMATICAL (1).pdf',
        ],
      },
      {
        folderName: 'SE Sem1',
        displayName: 'Software Engineering and Object Oriented Modelling',
        papers: [
          'MCA1SEOM 2022 JAN SOFTWARE ENGINEERING.pdf',
          'MCA1SEOM 2023 MAY SOFTWARE ENGINEERING AND OBJECT ORIENTED MODELLING.pdf',
          'MCA1SEOM 2024 JAN SOFTWARE ENGINEERING (1).pdf',
          'MCA1SEOM 2024 NOV SOFTWARE ENGINEERING AND OBJECT ORIENTED MODELING.pdf',
        ],
      },
    ],
  },
  {
    sem: 'Sem 2',
    semKey: 'sem2',
    subjects: [
      {
        folderName: 'COMPUTER NETWORKING sem2',
        displayName: 'Computer Networking',
        papers: [
          'MCA2CNWT 2022 MAR COMPUTER NETWORKING WITH TCP IP.pdf',
          'MCA2CNWT 2022 NOV COMPUTER NETWORKING.pdf',
          'MCA2CNWT 2023 AUG COMPUTER NETWORKING WITH TCP IP (1).pdf',
          'MCA2CNWT 2024 JUN COMPUTRE NETWORKING (1).pdf',
          'MCA2CNWT 2025 APRL COMPUTER NETWORKING WITH TCP CP.pdf',
        ],
      },
      {
        folderName: 'data science sem2',
        displayName: 'Data Science and Big Data Analysis',
        papers: [
          'MCA2DSBDA 2022 MAR DATA SCIENCE & BIG DATA ANALYSIS.pdf',
          'MCA2DSBDA 2022 NOV DATA SCIENCE AND BIG DATA ANALYSIS.pdf',
          'MCA2DSBDA 2023 AUG DATA SCIENCE (1).pdf',
          'MCA2DSBDA 2024 JUN data science (1).pdf',
          'MCA2DSBDA 2025 APRL DATA SCIENCE AND BIG DATA ANALYSIS.pdf',
        ],
      },
      {
        folderName: 'DATA STRUCTURES sem2',
        displayName: 'Data Structures and Algorithm Analysis',
        papers: [
          'MCA2DSAA 2022 MAR DATA STRUCTURE AND ALGORITHM ANALYSIS.pdf',
          'MCA2DSAA 2022 NOV DATA STRUCTURES 18.11.pdf',
          'MCA2DSAA 2023 AUG DATA SCIENCE (1).pdf',
          'MCA2DSAA 2023 AUG DATA STRUCTURES AND ALGORITHM ALALYSIS (1).pdf',
          'MCA2DSAA 2024 JUN data structre (1).pdf',
          'MCA2DSAA 2025 APRL DATA STRUCTURES AND ALGORITHM ANALYSIS.pdf',
        ],
      },
      {
        folderName: 'Optimization Techniques for Computer Applications sem2',
        displayName: 'Optimisation Techniques for Computer Applications',
        papers: [
          'MCA2OTCA 2022 MAR OPTIMISATION TECHNIQUES FOR COMPUTER APPLICATION.pdf',
          'MCA2OTCA 2022 NOV OPTIMISATION TECHNIQUES 16.11.pdf',
          'MCA2OTCA 2023 AUG OPTIMISATION TECHNIQUES (1).pdf',
          'MCA2OTCA 2024 JUN OPTIMISATION (1).pdf',
          'MCA2OTCA 2025 APRL OPTIMISTION TECHNIQUES FOR COMPUTER APPLICATION.pdf',
        ],
      },
    ],
  },
  {
    sem: 'Sem 3',
    semKey: 'sem3',
    subjects: [
      {
        folderName: 'CYBER FORENSICS sem3',
        displayName: 'Cyber Forensics',
        papers: [
          'MCA3CF 2023 DEC CYBER FORENSIC (1).pdf',
          'MCA3CF 2023 MAY CYBER FORENSIC (1).pdf',
          'MCA3CF 2023 MAY CYBER FORENSIC.pdf',
          'MCA3CF 2024 NOV CYBER FORENSIS.pdf',
        ],
      },
      {
        folderName: 'Machine learning sem3',
        displayName: 'Machine Learning Techniques',
        papers: [
          'MCA3MLT 2022 JLY MCA SEM III MACHINE LEARNING  TECHNIQUES.pdf',
          'MCA3MLT 2023 DEC MACHIN LEARNING TECHNIQUES (1).pdf',
          'MCA3MLT 2023 MAY MACHINE LEARNING TECHNIQUES.pdf',
          'MCA3MLT 2024 NOV MACHINE LEARNING TECHNIQUES.pdf',
        ],
      },
    ],
  },
];

/**
 * Builds the public URL for a PDF given sem key, folder name, and filename.
 * Encodes each path segment to handle spaces and special characters.
 */
export function getPaperUrl(semKey, folderName, fileName) {
  const encode = (s) => encodeURIComponent(s);
  return `/question.paper/${encode(semKey)}/${encode(folderName)}/${encode(fileName)}`;
}

