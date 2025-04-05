// subjects.ts
export interface Subject {
    code: string;
    name: string;
    units: string;
    year: string;
    semester: string;
    grade: string;
    prerequisites: string[];
  }
  
  export const predefinedSubjects = [
    // 1ST YEAR 1ST SEM
    { code: 'COE0001', name: 'ENGINEERING MATHEMATICS 1', units: '3', year: '1', semester: '1', grade: '', prerequisites: [] },
    { code: 'COE0003', name: 'ENGINEERING MATHEMATICS 2', units: '3', year: '1', semester: '1', grade: '', prerequisites: [] },
    { code: 'COE0005', name: 'CHEMISTRY FOR ENGINEERS 1', units: '3', year: '1', semester: '1', grade: '', prerequisites: [] },
    { code: 'GED0001', name: 'SPECIALIZED ENGLISH PROGRAM 1', units: '3', year: '1', semester: '1', grade: '', prerequisites: [] },
    { code: 'GED0004', name: 'PHYSICAL EDUCATION 1', units: '3', year: '1', semester: '1', grade: '', prerequisites: [] },
    { code: 'GED0006', name: 'PERSONAL AND PROFESSIONAL EFFECTIVENESS', units: '2', year: '1', semester: '1', grade: '', prerequisites: [] },
    { code: 'GED0007', name: 'ART APPRECIATION', units: '3', year: '1', semester: '1', grade: '', prerequisites: [] },
    { code: 'NSTP1', name: 'CIVIC WELFARE TRAINING SERVICE 1', units: '0', year: '1', semester: '1', grade: '', prerequisites: [] },

    // 1ST YEAR 2ND SEM
    { code: 'COE0007', name: 'CALCULUS 1', units: '3', year: '1', semester: '2', grade: '', prerequisites: ['COE0001', 'COE0003'] },
    { code: 'COE0009', name: 'PHYSICS FOR ENGINEERS 1 (LEC)', units: '2', year: '1', semester: '2', grade: '', prerequisites: ['COE0001', 'COE0003'] },
    { code: 'GED0015', name: 'PHYSICAL EDUCATION 2', units: '3', year: '1', semester: '2', grade: '', prerequisites: ['GED0004'] },
    { code: 'GED0019', name: 'UNDERSTANDING THE SELF', units: '3', year: '1', semester: '2', grade: '', prerequisites: [] },
    { code: 'GED0021', name: 'SPECIALIZED ENGLISH PROGRAM 2', units: '3', year: '1', semester: '2', grade: '', prerequisites: ['GED0001'] },
    { code: 'GED0027', name: 'MATHEMATICS IN THE MODERN WORLD', units: '3', year: '1', semester: '2', grade: '', prerequisites: [] },
    { code: 'GED0085', name: 'GENDER AND SOCIETY', units: '3', year: '1', semester: '2', grade: '', prerequisites: [] },
    { code: 'COE0009L', name: 'PHYSICS FOR ENGINEERS 1 (LAB)', units: '1', year: '1', semester: '2', grade: '', prerequisites: ['COE0001', 'COE0003'] },

    // 1ST YEAR 3RD SEM
    { code: 'COE0011', name: 'ENGINEERING DATA ANALYSIS', units: '3', year: '1', semester: '3', grade: '', prerequisites: ['COE0007'] },
    { code: 'COE0013', name: 'CALCULUS 2', units: '3', year: '1', semester: '3', grade: '', prerequisites: ['COE0007'] },
    { code: 'COE0015', name: 'PHYSICS FOR ENGINEERS 2 (LEC)', units: '2', year: '1', semester: '3', grade: '', prerequisites: ['COE0009', 'COE0007'] },
    { code: 'COE0017', name: 'CHEMISTRY FOR ENGINEERS 2 (LEC)', units: '2', year: '1', semester: '3', grade: '', prerequisites: ['COE0005'] },
    { code: 'GED0023', name: 'PHYSICAL EDUCATION 3', units: '3', year: '1', semester: '3', grade: '', prerequisites: ['GED0015'] },
    { code: 'GED0031', name: 'PURPOSIVE COMMUNICATION', units: '3', year: '1', semester: '3', grade: '', prerequisites: ['GED0021'] },
    { code: 'NSTP2', name: 'CIVIC WELFARE TRAINING SERVICE 2', units: '0', year: '1', semester: '3', grade: '', prerequisites: [] },
    { code: 'COE0015L', name: 'PHYSICS FOR ENGINEERS 2 (LAB)', units: '1', year: '1', semester: '3', grade: '', prerequisites: ['COE0009', 'COE0007'] },
    { code: 'COE0017L', name: 'CHEMISTRY FOR ENGINEERS 2 (LAB)', units: '1', year: '1', semester: '3', grade: '', prerequisites: [] },

    // 2ND YEAR 1ST SEM
    { code: 'COE0019', name: 'DIFFERENTIAL EQUATIONS', units: '3', year: '2', semester: '1', grade: '', prerequisites: ['COE0013'] },
    { code: 'COE0025L', name: 'COMPUTER AIDED DRAFTING', units: '1', year: '2', semester: '1', grade: '', prerequisites: [] },
    { code: 'CPE0001', name: 'COMPUTER ENGINEERING AS A DISCIPLINE', units: '1', year: '2', semester: '1', grade: '', prerequisites: ['GED0006'] },
    { code: 'CPE0003L', name: 'Programming Logic and Design', units: '2', year: '2', semester: '1', grade: '', prerequisites: [] },
    { code: 'CPE0004L', name: 'COMPUTER HARDWARE FUNDAMENTALS', units: '1', year: '2', semester: '1', grade: '', prerequisites: [] },
    { code: 'CPE0005', name: 'FUNDAMENTALS OF ELECTRICAL CIRCUITS (LEC)', units: '3', year: '2', semester: '1', grade: '', prerequisites: ['COE0005L'] },
    { code: 'GED0009', name: 'READINGS IN PHILIPPINE HISTORY', units: '3', year: '2', semester: '1', grade: '', prerequisites: [] },
    { code: 'GED0035', name: 'THE CONTEMPORARY WORLD', units: '3', year: '2', semester: '1', grade: '', prerequisites: [] },
    { code: 'CPE0005L', name: 'FUNDAMENTALS OF ELECTRICAL CIRCUITS (LAB)', units: '1', year: '2', semester: '1', grade: '', prerequisites: ['COE0005L'] },

    // 2ND YEAR 2ND SEM
    { code: 'COE0020', name: 'G.E. ELECTIVE - BIOENGINEERING', units: '3', year: '2', semester: '2', grade: '', prerequisites: [] },
    { code: 'CPE0007L', name: 'Computer Programming for CpE', units: '1', year: '2', semester: '2', grade: '', prerequisites: ['CPE0003L'] },
    { code: 'CPE0009', name: 'DISCRETE MATHEMATICS FOR CPE', units: '3', year: '2', semester: '2', grade: '', prerequisites: ['COE0011'] },
    { code: 'CPE0011', name: 'FUNDAMENTALS OF ELECTRONIC CIRCUITS (LEC)', units: '3', year: '2', semester: '2', grade: '', prerequisites: ['CPE0005'] },
    { code: 'CPE0013', name: 'NUMERICAL METHODS FOR CPE', units: '3', year: '2', semester: '2', grade: '', prerequisites: ['COE0019'] },
    { code: 'GED0011', name: 'SCIENCE, TECHNOLOGY AND SOCIETY', units: '3', year: '2', semester: '2', grade: '', prerequisites: [] },
    { code: 'GED0043', name: 'SPECIALIZED ENGLISH PROGRAM 3', units: '3', year: '2', semester: '2', grade: '', prerequisites: ['GED0031'] },
    { code: 'CPE0011L', name: 'FUNDAMENTALS OF ELECTRONIC CIRCUITS (LAB)', units: '1', year: '2', semester: '2', grade: '', prerequisites: ['CPE0005'] },

    // 2ND YEAR 3RD SEM
    { code: 'COE0039', name: 'ENGINEERING ECONOMICS', units: '3', year: '2', semester: '3', grade: '', prerequisites: ['COE0011'] },
    { code: 'CPE0015L', name: 'COMPUTER ENGINEERING DRAFTING AND DESIGN', units: '1', year: '2', semester: '3', grade: '', prerequisites: ['CPE0011'] },
    { code: 'CPE0017L', name: 'OBJECT ORIENTED PROGRAMMING', units: '2', year: '2', semester: '3', grade: '', prerequisites: ['CPE0007L'] },
    { code: 'CPE0019', name: 'FUNDAMENTALS OF MIXED SIGNALS AND SENSORS', units: '3', year: '2', semester: '3', grade: '', prerequisites: ['CPE0011'] },
    { code: 'CPE0021', name: 'LOGIC CIRCUITS AND DESIGN (LEC)', units: '3', year: '2', semester: '3', grade: '', prerequisites: ['CPE0011'] },
    { code: 'CPE0023', name: 'DATA AND DIGITAL COMMUNICATION', units: '3', year: '2', semester: '3', grade: '', prerequisites: ['CPE0011'] },
    { code: 'CPE0025', name: 'FEEDBACK AND CONTROL SYSTEM', units: '3', year: '2', semester: '3', grade: '', prerequisites: ['CPE0005', 'CPE0013'] },
    { code: 'CPE0021L', name: 'LOGIC CIRCUITS AND DESIGN (LAB)', units: '1', year: '2', semester: '3', grade: '', prerequisites: ['CPE0011'] },

    // 3RD YEAR 1ST SEM
    { code: 'COE0049', name: 'ENGINEERING MANAGEMENT', units: '2', year: '3', semester: '1', grade: '', prerequisites: ['COE0039'] },
    { code: 'COE0057', name: 'DESIGN THINKING FOR ENGINEERS', units: '3', year: '3', semester: '1', grade: '', prerequisites: [] },
    { code: 'CPE0027L', name: 'Introduction to HDL', units: '1', year: '3', semester: '1', grade: '', prerequisites: ['CPE0021'] },
    { code: 'CPE0029', name: 'MICROPROCESSORS (LEC)', units: '3', year: '3', semester: '1', grade: '', prerequisites: ['CPE0021'] },
    { code: 'CPE0031', name: 'COMPUTER NETWORKS AND SECURITY (LEC)', units: '3', year: '3', semester: '1', grade: '', prerequisites: ['CPE0023'] },
    { code: 'CPE0071', name: 'TECHNICAL ELECTIVE FOR CPE', units: '2', year: '3', semester: '1', grade: '', prerequisites: ['CPE0021'] },
    { code: 'GED0049', name: 'LIFE AND WORKS OF RIZAL', units: '3', year: '3', semester: '1', grade: '', prerequisites: [] },
    { code: 'CPE0029L', name: 'MICROPROCESSORS (LAB)', units: '1', year: '3', semester: '1', grade: '', prerequisites: ['CPE0021'] },
    { code: 'CPE0031L', name: 'COMPUTER NETWORKS AND SECURITY (LAB)', units: '1', year: '3', semester: '1', grade: '', prerequisites: ['CPE0023'] },

    // 3RD YEAR 2ND SEM
    { code: 'COE0059', name: 'TECHNOPRENEURSHIP FOR ENGINEERS', units: '3', year: '3', semester: '2', grade: '', prerequisites: ['COE0049', 'COE0057'] },
    { code: 'CPE0033L', name: 'DATA STRUCTURES AND ALGORITHMS FOR CPE', units: '2', year: '3', semester: '2', grade: '', prerequisites: ['CPE0017L'] },
    { code: 'CPE0035', name: 'EMBEDDED SYSTEMS (LEC)', units: '3', year: '3', semester: '2', grade: '', prerequisites: ['CPE0029'] },
    { code: 'CPE0035L', name: 'EMBEDDED SYSTEMS (LAB)', units: '1', year: '3', semester: '2', grade: '', prerequisites: ['CPE0029'] },
    { code: 'CPE0037', name: 'COMPUTER ARCHITECTURE AND ORGANIZATION (LEC)', units: '3', year: '3', semester: '2', grade: '', prerequisites: ['CPE0029'] },
    { code: 'CPE0039L', name: 'Introduction to Database', units: '1', year: '3', semester: '2', grade: '', prerequisites: ['CPE0017L'] },
    { code: 'CPE0041', name: 'COGNATE/TRACK COURSE 1', units: '3', year: '3', semester: '2', grade: '', prerequisites: ['CPE0031'] },
    { code: 'CPE0043', name: 'Methods of Research for CPE', units: '2', year: '3', semester: '2', grade: '', prerequisites: ['CPE0029', 'GED0043', 'COE0049'] },

    // 3RD YEAR 3RD SEM
    { code: 'CPE0045L', name: 'CpE Practice and Design 1', units: '1', year: '3', semester: '2', grade: '', prerequisites: ['CPE0043', 'COE0059'] },
    { code: 'CPE0047', name: 'OPERATING SYSTEMS (LEC)', units: '3', year: '3', semester: '3', grade: '', prerequisites: ['CPE0037'] },
    { code: 'CPE0047L', name: 'OPERATING SYSTEMS (LAB)', units: '1', year: '3', semester: '3', grade: '', prerequisites: ['CPE0037'] },
    { code: 'CPE0049', name: 'SOFTWARE DESIGN (LEC)', units: '3', year: '3', semester: '3', grade: '', prerequisites: ['CPE0033L'] },
    { code: 'CPE0049L', name: 'SOFTWARE DESIGN (LAB)', units: '1', year: '3', semester: '3', grade: '', prerequisites: ['CPE0033L'] },
    { code: 'CPE0051', name: 'EMERGING TECHNOLOGIES IN CPE', units: '3', year: '3', semester: '3', grade: '', prerequisites: ['CPE0029'] },
    { code: 'CPE0053L', name: 'Seminars and Field Trips', units: '1', year: '3', semester: '3', grade: '', prerequisites: ['CPE0029'] },
    { code: 'CPE0055', name: 'COGNATE/TRACK COURSE 2', units: '3', year: '3', semester: '3', grade: '', prerequisites: ['CPE0041'] },
    { code: 'GED0047', name: 'FOREIGN LANGUAGE', units: '3', year: '3', semester: '3', grade: '', prerequisites: [] },

    // 4TH YEAR 1ST SEM
    { code: 'COE0061', name: 'PROFESSIONAL DEVELOPMENT FOR ENGINEERS', units: '1', year: '4', semester: '1', grade: '', prerequisites: ['CPE0001'] },
    { code: 'CPE0057L', name: 'CPE PRACTICE AND DESIGN 2', units: '2', year: '4', semester: '1', grade: '', prerequisites: ['CPE0045L'] },
    { code: 'CPE0059', name: 'DIGITAL SIGNAL PROCESSING (LEC)', units: '3', year: '4', semester: '1', grade: '', prerequisites: ['CPE0025'] },
    { code: 'CPE0061', name: 'CPE LAWS AND PROFESSIONAL PRACTICE', units: '2', year: '4', semester: '1', grade: '', prerequisites: ['CPE0051'] },
    { code: 'CPE0063', name: 'BASIC OCCUPATIONAL HEALTH AND SAFETY', units: '3', year: '4', semester: '1', grade: '', prerequisites: ['CPE0051'] },
    { code: 'CPE0065', name: 'COGNATE/TRACK COURSE 3', units: '3', year: '4', semester: '1', grade: '', prerequisites: ['CPE0055'] },
    { code: 'GED0061', name: 'ETHICS', units: '3', year: '4', semester: '1', grade: '', prerequisites: [] },
    { code: 'CPE0059L', name: 'DIGITAL SIGNAL PROCESSING (LAB)', units: '1', year: '4', semester: '1', grade: '', prerequisites: ['CPE0025'] },


    //4TH YEAR 2ND SEM
    { code: 'CPE0067', name: 'INTERNSHIP 1 FOR CPE', units: '9', year: '4', semester: '2', grade: '' , prerequisites: ['CPE0031','CPE0061'] },

    //4TH YEAR 3RD SEM
    { code: 'CPE0069', name: 'Internship 2 for CpE', units: '9', year: '4', semester: '3', grade: '' , prerequisites: ['CPE0067'] },
];
