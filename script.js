document.addEventListener("DOMContentLoaded", () => {
  const departmentSelect = document.getElementById("department");
  const yearSelect = document.getElementById("year");
  const coursesContainer = document.getElementById("courses-container");
  const themeSwitch = document.getElementById("themeSwitch");
  const langSelect = document.getElementById("langSelect");
  const loadCoursesBtn = document.getElementById("load-courses-btn");

  // Store year-wise results
  const yearWiseResults = {};

  // Grade points mapping
  const gradePoints = {
    "A+": 4.00,  // 80% or above
    "A": 3.75,   // 75% to less than 80%
    "A-": 3.50,  // 70% to less than 75%
    "B+": 3.25,  // 65% to less than 70%
    "B": 3.00,   // 60% to less than 65%
    "B-": 2.75,  // 55% to less than 60%
    "C+": 2.50,  // 50% to less than 55%
    "C": 2.25,   // 45% to less than 50%
    "D": 2.00,   // 40% to less than 45%
    "F": 0.00    // Less than 40%
  };

  // Courses data with string keys for years
  const coursesData = {
    "Physics": {
      "1": {
        major: [
          { name: "212701 - Mechanics", credit: 3 },
          { name: "212703 - Properties of Matter, Waves & Oscillations", credit: 3 },
          { name: "212705 - Heat, Thermodynamics and Radiation", credit: 3 },
          { name: "212706 - Physics Practical-I", credit: 3 },
          { name: "213709 - Fundamentals of Mathematics", credit: 4 },
          { name: "213711 - Calculus-I", credit: 2 }
        ],
        nonMajor: [
          { name: "212807 - Chemistry-I", credit: 4 },
          { name: "212808 - Chemistry-I Practical", credit: 2 },
          { name: "213607 - Introduction to Statistics", credit: 4 },
          { name: "213608 - Statistics Practical-I", credit: 2 },
          { name: "211501 - History of the Emergence of Independent Bangladesh", credit: 4 }
        ]
      },
      "2": {
        major: [
          { name: "222701 - Electricity & Magnetism", credit: 4 },
          { name: "222703 - Geometrical & Physical Optics", credit: 4 },
          { name: "222705 - Classical Mechanics", credit: 4 },
          { name: "222706 - Physics Practical-II", credit: 4 },
          { name: "223707 - Calculus-II", credit: 4 },
          { name: "223708 - Math Lab (Practical)", credit: 2 }
        ],
        nonMajor: [
          { name: "222807 - General Chemistry-II", credit: 4 },
          { name: "222809 - Environmental Chemistry", credit: 2 },
          { name: "223609 - Methods of Statistics", credit: 4 },
          { name: "223610 - Statistics Practical-II", credit: 2 },
          { name: "221109 - English (Compulsory)", credit: 0 }
        ]
      },
      "3": {
        major: [
          { name: "232701 - Atomic & Molecular Physics", credit: 4 },
          { name: "232703 - Quantum Mechanics-I", credit: 4 },
          { name: "232705 - Computer Fundamentals and Numerical Analysis", credit: 4 },
          { name: "232707 - Electronics-I", credit: 4 },
          { name: "232709 - Nuclear Physics-I", credit: 4 },
          { name: "232711 - Solid State Physics-I", credit: 4 },
          { name: "232713 - Mathematical Physics", credit: 4 },
          { name: "232714 - Physics Practical-III", credit: 4 }
        ],
        nonMajor: []
      },
      "4": {
        major: [
          { name: "242701 - Nuclear Physics-II", credit: 4 },
          { name: "242703 - Solid State Physics-II", credit: 4 },
          { name: "242705 - Quantum Mechanics-II", credit: 4 },
          { name: "242707 - Electronics-II", credit: 4 },
          { name: "242709 - Classical Electrodynamics", credit: 4 },
          { name: "242711 - Statistical Mechanics", credit: 4 },
          { name: "242713 - Computer Application and Programming", credit: 4 },
          { name: "242715 - Theory of Relativity and Cosmology", credit: 4 },
          { name: "242716 - Physics Practical-IV", credit: 4 },
          { name: "242718 - Viva-Voce", credit: 4 }
        ],
        nonMajor: []
      }
    },
    "Chemistry": {
      "1": {
        major: [
          { name: "212801 - Inorganic Chemistry", credit: 3 },
          { name: "212803 - Organic Chemistry", credit: 3 },
          { name: "212805 - Physical Chemistry", credit: 3 },
          { name: "212806 - Chemistry Practical-I", credit: 3 },
          { name: "213709 - Fundamentals of Mathematics", credit: 4 },
          { name: "213711 - Calculus-I", credit: 2 }
        ],
        nonMajor: [
          { name: "212701 - Mechanics", credit: 3 },
          { name: "212706 - Physics Practical-I", credit: 3 },
          { name: "213607 - Introduction to Statistics", credit: 4 },
          { name: "213608 - Statistics Practical-I", credit: 2 },
          { name: "211501 - History of the Emergence of Independent Bangladesh", credit: 4 }
        ]
      },
      "2": {
        major: [
          { name: "222801 - Analytical Chemistry", credit: 3 },
          { name: "222803 - Biochemistry", credit: 3 },
          { name: "222805 - Industrial Chemistry", credit: 3 },
          { name: "222806 - Chemistry Practical-II", credit: 3 },
          { name: "223709 - Vector Analysis", credit: 3 },
          { name: "223711 - Differential Equations", credit: 3 }
        ],
        nonMajor: [
          { name: "222701 - Electricity and Magnetism", credit: 3 },
          { name: "222706 - Physics Practical-II", credit: 3 },
          { name: "223607 - Probability and Statistics", credit: 4 },
          { name: "223608 - Statistics Practical-II", credit: 2 },
          { name: "221501 - Bangladesh Studies", credit: 4 }
        ]
      },
      "3": {
        major: [
          { name: "232801 - Polymer Chemistry", credit: 3 },
          { name: "232803 - Environmental Chemistry", credit: 3 },
          { name: "232805 - Medicinal Chemistry", credit: 3 },
          { name: "232806 - Chemistry Practical-III", credit: 3 },
          { name: "233709 - Mathematical Chemistry", credit: 3 },
          { name: "233711 - Chemical Kinetics", credit: 3 }
        ],
        nonMajor: [
          { name: "232701 - Quantum Mechanics", credit: 3 },
          { name: "232706 - Physics Practical-III", credit: 3 },
          { name: "233607 - Applied Statistics", credit: 4 },
          { name: "233608 - Applied Statistics Practical", credit: 2 },
          { name: "231501 - Environmental Science", credit: 4 }
        ]
      },
      "4": {
        major: [
          { name: "242801 - Advanced Organic Chemistry", credit: 3 },
          { name: "242803 - Advanced Inorganic Chemistry", credit: 3 },
          { name: "242805 - Advanced Physical Chemistry", credit: 3 },
          { name: "242806 - Chemistry Practical-IV", credit: 3 },
          { name: "243709 - Research Project", credit: 6 },
          { name: "243711 - Seminar", credit: 2 }
        ],
        nonMajor: [
          { name: "242701 - Nuclear Physics", credit: 3 },
          { name: "242706 - Physics Practical-IV", credit: 3 },
          { name: "243607 - Statistical Computing", credit: 4 },
          { name: "243608 - Statistical Computing Practical", credit: 2 },
          { name: "241501 - Computer Applications", credit: 4 }
        ]
      }
    },
    "Math": {
      "1": {
        major: [
          { name: "213601 - Calculus I", credit: 4 },
          { name: "213603 - Linear Algebra", credit: 3 },
          { name: "213605 - Discrete Mathematics", credit: 3 },
          { name: "213606 - Mathematics Practical-I", credit: 3 },
          { name: "213709 - Fundamentals of Mathematics", credit: 4 },
          { name: "213711 - Calculus-I", credit: 2 }
        ],
        nonMajor: [
          { name: "212701 - Mechanics", credit: 3 },
          { name: "212706 - Physics Practical-I", credit: 3 },
          { name: "212807 - Chemistry-I", credit: 4 },
          { name: "212808 - Chemistry-I Practical", credit: 2 },
          { name: "211501 - History of the Emergence of Independent Bangladesh", credit: 4 }
        ]
      },
      "2": {
        major: [
          { name: "223601 - Calculus II", credit: 4 },
          { name: "223603 - Differential Equations", credit: 3 },
          { name: "223605 - Number Theory", credit: 3 },
          { name: "223606 - Mathematics Practical-II", credit: 3 },
          { name: "223709 - Vector Analysis", credit: 3 },
          { name: "223711 - Differential Equations", credit: 3 }
        ],
        nonMajor: [
          { name: "222701 - Electricity and Magnetism", credit: 3 },
          { name: "222706 - Physics Practical-II", credit: 3 },
          { name: "222807 - Chemistry-II", credit: 4 },
          { name: "222808 - Chemistry-II Practical", credit: 2 },
          { name: "221501 - Bangladesh Studies", credit: 4 }
        ]
      },
      "3": {
        major: [
          { name: "233601 - Real Analysis", credit: 4 },
          { name: "233603 - Abstract Algebra", credit: 3 },
          { name: "233605 - Numerical Analysis", credit: 3 },
          { name: "233606 - Mathematics Practical-III", credit: 3 },
          { name: "233709 - Mathematical Methods", credit: 3 },
          { name: "233711 - Complex Analysis", credit: 3 }
        ],
        nonMajor: [
          { name: "232701 - Quantum Mechanics", credit: 3 },
          { name: "232706 - Physics Practical-III", credit: 3 },
          { name: "232807 - Physical Chemistry", credit: 4 },
          { name: "232808 - Physical Chemistry Practical", credit: 2 },
          { name: "231501 - Environmental Science", credit: 4 }
        ]
      },
      "4": {
        major: [
          { name: "243601 - Complex Analysis", credit: 4 },
          { name: "243603 - Topology", credit: 3 },
          { name: "243605 - Functional Analysis", credit: 3 },
          { name: "243606 - Mathematics Practical-IV", credit: 3 },
          { name: "243709 - Research Project", credit: 6 },
          { name: "243711 - Seminar", credit: 2 }
        ],
        nonMajor: [
          { name: "242701 - Nuclear Physics", credit: 3 },
          { name: "242706 - Physics Practical-IV", credit: 3 },
          { name: "242807 - Inorganic Chemistry", credit: 4 },
          { name: "242808 - Inorganic Chemistry Practical", credit: 2 },
          { name: "241501 - Computer Applications", credit: 4 }
        ]
      }
    }
  };

  // Translation texts
  const texts = {
    en: {
      title: "CGPA Calculator",
      selectDept: "Department:",
      selectYear: "Year:",
      selectGrade: "Select Grade",
      majorCourses: "Major Courses",
      nonMajorCourses: "Non-Major Courses",
      calculateGPA: "Calculate GPA",
      calculateCGPA: "Calculate CGPA",
      calculateCGPA1: "Calculate CGPA (1 Year)",
      calculateCGPA2: "Calculate CGPA (2 Years)",
      calculateCGPA3: "Calculate CGPA (3 Years)",
      calculateCGPA4: "Calculate CGPA (4 Years)",
      loadCourses: "Load Courses",
      exportPDF: "Export Result as PDF",
      clearResults: "Clear All Results",
      darkMode: "Dark Mode",
      lightMode: "Light Mode",
      selectDeptAndYear: "Please select both department and year",
      noDataFound: "No course data found for this selection",
      noMajorCourses: "No major courses available",
      missingGrades: "Please select grades for all courses",
      invalidCredits: "Invalid credit values found",
      zeroCredits: "Total credits cannot be zero",
      calculationError: "Error calculating GPA",
      saveError: "Error saving results",
      pdfError: "Error generating PDF",
      notEnoughData: "Not enough data for {count} years",
      totalCredits: "Total Credits",
      totalGradePoints: "Total Grade Points",
      gpa: "GPA",
      cgpa: "CGPA",
      year: "Years",
      confirmClear: "Are you sure you want to clear all results?",
      confirmRemove: "Are you sure you want to remove this course?",
      remove: "Remove"
    },
    bn: {
      title: "সিজিপিএ ক্যালকুলেটর",
      selectDept: "বিভাগ:",
      selectYear: "বছর:",
      selectGrade: "গ্রেড নির্বাচন করুন",
      majorCourses: "মেজর কোর্সসমূহ",
      nonMajorCourses: "নন-মেজর কোর্সসমূহ",
      calculateGPA: "জিপিএ গণনা করুন",
      calculateCGPA: "সিজিপিএ গণনা করুন",
      calculateCGPA1: "সিজিপিএ গণনা করুন (১ বছর)",
      calculateCGPA2: "সিজিপিএ গণনা করুন (২ বছর)",
      calculateCGPA3: "সিজিপিএ গণনা করুন (৩ বছর)",
      calculateCGPA4: "সিজিপিএ গণনা করুন (৪ বছর)",
      loadCourses: "কোর্স লোড করুন",
      exportPDF: "পিডিএফ হিসেবে রিপোর্ট ডাউনলোড করুন",
      clearResults: "সব ফলাফল মুছে ফেলুন",
      darkMode: "ডার্ক মোড",
      lightMode: "লাইট মোড",
      selectDeptAndYear: "অনুগ্রহ করে বিভাগ এবং বছর নির্বাচন করুন",
      noDataFound: "এই নির্বাচনের জন্য কোন কোর্স ডাটা পাওয়া যায়নি",
      noMajorCourses: "কোন মেজর কোর্স নেই",
      missingGrades: "অনুগ্রহ করে সব কোর্সের জন্য গ্রেড নির্বাচন করুন",
      invalidCredits: "অবৈধ ক্রেডিট মান পাওয়া গেছে",
      zeroCredits: "মোট ক্রেডিট শূন্য হতে পারে না",
      calculationError: "জিপিএ গণনায় ত্রুটি",
      saveError: "ফলাফল সংরক্ষণে ত্রুটি",
      pdfError: "পিডিএফ তৈরি করতে ত্রুটি",
      notEnoughData: "{count} বছরের জন্য পর্যাপ্ত ডাটা নেই",
      totalCredits: "মোট ক্রেডিট",
      totalGradePoints: "মোট গ্রেড পয়েন্ট",
      gpa: "জিপিএ",
      cgpa: "সিজিপিএ",
      year: "বছর",
      confirmClear: "আপনি কি নিশ্চিত যে আপনি সব ফলাফল মুছে ফেলতে চান?",
      confirmRemove: "আপনি কি নিশ্চিত যে আপনি এই কোর্সটি সরাতে চান?",
      remove: "মুছে ফেলুন"
    }
  };

  // Load saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
    updateThemeLabel(true);
  }

  // Load saved language preference
  const savedLang = localStorage.getItem('language') || 'en';
  langSelect.value = savedLang;
  updateLanguage(savedLang);

  // Load saved results from localStorage if available
  const savedResults = localStorage.getItem('yearWiseResults');
  if (savedResults) {
    try {
      const parsedResults = JSON.parse(savedResults);
      Object.assign(yearWiseResults, parsedResults);
      updateSummaryDisplay();
    } catch (error) {
      console.error('Error loading saved results:', error);
      localStorage.removeItem('yearWiseResults');
    }
  }

  // Theme toggle handler
  themeSwitch.addEventListener("change", function() {
    const isDark = this.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeLabel(isDark);
  });

  // Language switch handler
  langSelect.addEventListener("change", function() {
    const lang = this.value;
    localStorage.setItem('language', lang);
    updateLanguage(lang);
  });

  // Function to update theme label
  function updateThemeLabel(isDark) {
    const themeLabel = document.querySelector('.theme-label');
    if (themeLabel) {
      themeLabel.textContent = isDark ? texts[langSelect.value].darkMode : texts[langSelect.value].lightMode;
    }
  }

  // Function to update language
  function updateLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (texts[lang] && texts[lang][key]) {
        if (element.tagName === 'INPUT' && element.type === 'placeholder') {
          element.placeholder = texts[lang][key];
        } else {
          element.textContent = texts[lang][key];
        }
      }
    });

    // Update select placeholders
    document.querySelectorAll('select').forEach(select => {
      if (select.value === '') {
        const placeholder = select.querySelector('option[value=""]');
        if (placeholder) {
          const key = select.id === 'department' ? 'selectDept' : 
                     select.id === 'year' ? 'selectYear' : 'selectGrade';
          placeholder.textContent = texts[lang][key];
        }
      }
    });

    // Update buttons with icons
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.innerHTML = `<i class="fas fa-calculator"></i> ${texts[lang].calculateGPA}`;
    }

    // Update theme label
    updateThemeLabel(document.body.classList.contains('dark'));
  }

  // Function to create grade dropdown
  function createGradeDropdown() {
    const select = document.createElement("select");
    select.required = true;
    select.innerHTML = `<option value="">${texts[langSelect.value].selectGrade}</option>`;
    
    // Add grades in order with their percentage ranges
    const gradeRanges = [
      { grade: "A+", range: "80% or above" },
      { grade: "A", range: "75% to less than 80%" },
      { grade: "A-", range: "70% to less than 75%" },
      { grade: "B+", range: "65% to less than 70%" },
      { grade: "B", range: "60% to less than 65%" },
      { grade: "B-", range: "55% to less than 60%" },
      { grade: "C+", range: "50% to less than 55%" },
      { grade: "C", range: "45% to less than 50%" },
      { grade: "D", range: "40% to less than 45%" },
      { grade: "F", range: "Less than 40%" }
    ];

    gradeRanges.forEach(({ grade, range }) => {
      const option = document.createElement("option");
      option.value = gradePoints[grade];
      option.textContent = `${grade} (${range})`;
      select.appendChild(option);
    });
    
    return select;
  }

  // Function to load courses
  function loadCourses() {
    console.log('Loading courses...'); // Debug log
    const selectedDept = departmentSelect.value;
    const selectedYear = yearSelect.value;

    console.log('Selected Department:', selectedDept); // Debug log
    console.log('Selected Year:', selectedYear); // Debug log

    if (!selectedDept || !selectedYear) {
      alert(texts[langSelect.value].selectDeptAndYear);
      return;
    }

    clearCourses();

    const yearData = coursesData[selectedDept]?.[selectedYear];
    console.log('Year Data:', yearData); // Debug log

    if (!yearData) {
      coursesContainer.innerHTML = `<p class="error">${texts[langSelect.value].noDataFound}</p>`;
      return;
    }

    // Create Major courses section
    const majorHeader = document.createElement("h3");
    majorHeader.textContent = texts[langSelect.value].majorCourses;
    coursesContainer.appendChild(majorHeader);

    // Load major courses
    if (yearData.major && yearData.major.length > 0) {
      yearData.major.forEach(course => {
        const row = document.createElement("div");
        row.classList.add("course-row", "major-course");

        const courseName = document.createElement("label");
        courseName.textContent = course.name;
        row.appendChild(courseName);

        const creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.value = course.credit;
        creditInput.readOnly = true;
        row.appendChild(creditInput);

        const gradeSelect = createGradeDropdown();
        row.appendChild(gradeSelect);

        coursesContainer.appendChild(row);
      });
    } else {
      const noMajorCourses = document.createElement("p");
      noMajorCourses.textContent = texts[langSelect.value].noMajorCourses;
      coursesContainer.appendChild(noMajorCourses);
    }

    // Create Non-Major courses section
    if (yearData.nonMajor && yearData.nonMajor.length > 0) {
      const nonMajorHeader = document.createElement("h3");
      nonMajorHeader.textContent = texts[langSelect.value].nonMajorCourses;
      coursesContainer.appendChild(nonMajorHeader);

      yearData.nonMajor.forEach(course => {
        const row = document.createElement("div");
        row.classList.add("course-row");

        const courseName = document.createElement("label");
        courseName.textContent = course.name;
        row.appendChild(courseName);

        const creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.value = course.credit;
        creditInput.readOnly = true;
        row.appendChild(creditInput);

        const gradeSelect = createGradeDropdown();
        row.appendChild(gradeSelect);

        const removeButton = createRemoveButton(course, true);
        row.appendChild(removeButton);

        coursesContainer.appendChild(row);
      });
    }

    // Add Calculate GPA button
    const calculateBtn = document.createElement("button");
    calculateBtn.id = "calculate-btn";
    calculateBtn.innerHTML = `<i class="fas fa-calculator"></i> ${texts[langSelect.value].calculateGPA}`;
    calculateBtn.addEventListener("click", calculateGPA);
    coursesContainer.appendChild(calculateBtn);

    // Add result display div
    const resultDiv = document.createElement("div");
    resultDiv.id = "result";
    coursesContainer.appendChild(resultDiv);
  }

  // Add event listener for load courses button
  document.getElementById("load-courses-btn").addEventListener("click", function() {
    console.log('Load courses button clicked'); // Debug log
    const selectedDept = departmentSelect.value;
    const selectedYear = yearSelect.value;

    console.log('Selected Department:', selectedDept); // Debug log
    console.log('Selected Year:', selectedYear); // Debug log
    console.log('Available Departments:', Object.keys(coursesData)); // Debug log
    console.log('Available Years for Department:', Object.keys(coursesData[selectedDept] || {})); // Debug log

    if (!selectedDept || !selectedYear) {
      alert(texts[langSelect.value].selectDeptAndYear);
      return;
    }

    clearCourses();

    // Convert year to string if it's a number
    const yearKey = selectedYear.toString();
    const yearData = coursesData[selectedDept]?.[yearKey];
    console.log('Year Data:', yearData); // Debug log

    if (!yearData) {
      coursesContainer.innerHTML = `<p class="error">${texts[langSelect.value].noDataFound}</p>`;
      return;
    }

    // Create Major courses section
    const majorHeader = document.createElement("h3");
    majorHeader.textContent = texts[langSelect.value].majorCourses;
    coursesContainer.appendChild(majorHeader);

    // Load major courses
    if (yearData.major && yearData.major.length > 0) {
      yearData.major.forEach(course => {
        const row = document.createElement("div");
        row.classList.add("course-row", "major-course");

        const courseName = document.createElement("label");
        courseName.textContent = course.name;
        row.appendChild(courseName);

        const creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.value = course.credit;
        creditInput.readOnly = true;
        row.appendChild(creditInput);

        const gradeSelect = createGradeDropdown();
        row.appendChild(gradeSelect);

        coursesContainer.appendChild(row);
      });
    } else {
      const noMajorCourses = document.createElement("p");
      noMajorCourses.textContent = texts[langSelect.value].noMajorCourses;
      coursesContainer.appendChild(noMajorCourses);
    }

    // Create Non-Major courses section
    if (yearData.nonMajor && yearData.nonMajor.length > 0) {
      const nonMajorHeader = document.createElement("h3");
      nonMajorHeader.textContent = texts[langSelect.value].nonMajorCourses;
      coursesContainer.appendChild(nonMajorHeader);

      yearData.nonMajor.forEach(course => {
        const row = document.createElement("div");
        row.classList.add("course-row");

        const courseName = document.createElement("label");
        courseName.textContent = course.name;
        row.appendChild(courseName);

        const creditInput = document.createElement("input");
        creditInput.type = "number";
        creditInput.value = course.credit;
        creditInput.readOnly = true;
        row.appendChild(creditInput);

        const gradeSelect = createGradeDropdown();
        row.appendChild(gradeSelect);

        const removeButton = createRemoveButton(course, true);
        row.appendChild(removeButton);

        coursesContainer.appendChild(row);
      });
    }

    // Add Calculate GPA button
    const calculateBtn = document.createElement("button");
    calculateBtn.id = "calculate-btn";
    calculateBtn.innerHTML = `<i class="fas fa-calculator"></i> ${texts[langSelect.value].calculateGPA}`;
    calculateBtn.addEventListener("click", calculateGPA);
    coursesContainer.appendChild(calculateBtn);

    // Add result display div
    const resultDiv = document.createElement("div");
    resultDiv.id = "result";
    coursesContainer.appendChild(resultDiv);
  });

  // Remove the automatic loading from department and year change events
  departmentSelect.addEventListener("change", () => {
    console.log('Department changed:', departmentSelect.value); // Debug log
  });

  yearSelect.addEventListener("change", () => {
    console.log('Year changed:', yearSelect.value); // Debug log
  });

  // Function to clear courses container
  function clearCourses() {
    coursesContainer.innerHTML = "";
  }

  // Function to create remove button
  function createRemoveButton(course, isNonMajor) {
    const button = document.createElement("button");
    button.innerHTML = `<i class="fas fa-trash"></i> ${texts[langSelect.value].remove}`;
    button.classList.add("remove-course");
    button.addEventListener("click", () => {
      if (confirm(texts[langSelect.value].confirmRemove)) {
        const courseIndex = coursesData[departmentSelect.value][yearSelect.value].nonMajor.findIndex(
          c => c.name === course.name
        );
        if (courseIndex !== -1) {
          coursesData[departmentSelect.value][yearSelect.value].nonMajor.splice(courseIndex, 1);
          loadCourses();
        }
      }
    });
    return button;
  }

  // Function to calculate GPA
  function calculateGPA() {
    try {
      const gradeSelects = coursesContainer.querySelectorAll("select");
      const creditInputs = coursesContainer.querySelectorAll("input[readonly]");
      const resultDiv = document.getElementById("result");

      if (gradeSelects.length === 0 || creditInputs.length === 0) {
        throw new Error('No courses found');
      }

      let totalCredits = 0;
      let totalGradePoints = 0;
      let missingGrades = false;
      let invalidCredits = false;

      for (let i = 0; i < gradeSelects.length; i++) {
        const gradeValue = parseFloat(gradeSelects[i].value);
        const credit = parseFloat(creditInputs[i].value);

        if (isNaN(gradeValue)) {
          missingGrades = true;
          break;
        }

        if (isNaN(credit) || credit <= 0) {
          console.error('Invalid credit value:', creditInputs[i].value);
          invalidCredits = true;
          break;
        }

        totalCredits += credit;
        totalGradePoints += credit * gradeValue;
      }

      if (missingGrades) {
        resultDiv.innerHTML = `<p class="error">${texts[langSelect.value].missingGrades}</p>`;
        return;
      }

      if (invalidCredits) {
        resultDiv.innerHTML = `<p class="error">${texts[langSelect.value].invalidCredits}</p>`;
        return;
      }

      if (totalCredits === 0) {
        resultDiv.innerHTML = `<p class="error">${texts[langSelect.value].zeroCredits}</p>`;
        return;
      }

      const gpa = totalGradePoints / totalCredits;
      
      // Validate GPA range
      if (gpa < 0 || gpa > 4) {
        throw new Error('Invalid GPA calculated');
      }

      resultDiv.innerHTML = `
        <p>${texts[langSelect.value].totalCredits}: ${totalCredits}</p>
        <p>${texts[langSelect.value].totalGradePoints}: ${totalGradePoints.toFixed(2)}</p>
        <p class="gpa">${texts[langSelect.value].gpa}: ${gpa.toFixed(2)}</p>
      `;

      // Store the result
      yearWiseResults[yearSelect.value] = {
        gpa: gpa.toFixed(2),
        totalCredits,
        totalGradePoints,
        timestamp: new Date().toISOString()
      };

      // Save to localStorage
      try {
        localStorage.setItem('yearWiseResults', JSON.stringify(yearWiseResults));
      } catch (error) {
        console.error('Error saving results:', error);
        alert(texts[langSelect.value].saveError);
      }

      // Update summary display
      updateSummaryDisplay();
    } catch (error) {
      console.error('Error calculating GPA:', error);
      const resultDiv = document.getElementById("result");
      resultDiv.innerHTML = `<p class="error">${texts[langSelect.value].calculationError}</p>`;
    }
  }

  // Function to calculate CGPA
  window.calculateCGPA = function(yearCount) {
    console.log('Calculating CGPA for', yearCount, 'years');
    console.log('Available results:', yearWiseResults);

    const selectedYears = Object.keys(yearWiseResults)
      .sort()
      .slice(0, yearCount);

    console.log('Selected years for calculation:', selectedYears);

    if (selectedYears.length < yearCount) {
      document.getElementById("cgpa-result").innerHTML = 
        `<p class="error">${texts[langSelect.value].notEnoughData.replace('{count}', yearCount)}</p>`;
      return;
    }

    let totalGP = 0;
    let totalCredits = 0;

    selectedYears.forEach(year => {
      const { totalGradePoints, totalCredits: credits } = yearWiseResults[year];
      totalGP += totalGradePoints;
      totalCredits += credits;
    });

    if (totalCredits === 0) {
      document.getElementById("cgpa-result").innerHTML = 
        `<p class="error">${texts[langSelect.value].zeroCredits}</p>`;
      return;
    }

    const cgpa = totalGP / totalCredits;
    document.getElementById("cgpa-result").innerHTML = `
      <div class="result-box">
        <h3>${texts[langSelect.value].cgpa} (${yearCount} ${texts[langSelect.value].year})</h3>
        <p class="cgpa-value">${cgpa.toFixed(2)}</p>
        <div class="result-details">
          <p>${texts[langSelect.value].totalCredits}: ${totalCredits}</p>
          <p>${texts[langSelect.value].totalGradePoints}: ${totalGP.toFixed(2)}</p>
        </div>
      </div>
    `;
  };

  // Function to update summary display
  function updateSummaryDisplay() {
    const summary = document.getElementById("summary-results");
    summary.innerHTML = "<h3>Year-wise Results</h3>";

    Object.keys(yearWiseResults).sort().forEach(year => {
      const data = yearWiseResults[year];
      summary.innerHTML += `
        <p>
          <strong>Year ${year}:</strong> 
          GPA: ${data.gpa}, 
          Credits: ${data.totalCredits}
          <button onclick="editYearResult('${year}')" class="edit-btn">
            <i class="fas fa-edit"></i> Edit
          </button>
        </p>
      `;
    });

    // Save to localStorage
    try {
      localStorage.setItem('yearWiseResults', JSON.stringify(yearWiseResults));
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }

  // Function to edit year result
  window.editYearResult = function(year) {
    departmentSelect.value = departmentSelect.value;
    yearSelect.value = year;
    loadCourses();
  };

  // Function to export results as PDF
  window.exportToPDF = function() {
    try {
      const { jsPDF } = window.jspdf;
      if (!jsPDF) {
        throw new Error('jsPDF library not loaded');
      }

      const doc = new jsPDF();
      let y = 20;

      // Add header
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text("CGPA Calculator by Avro", 105, y, { align: 'center' });
      y += 10;

      // Add department and date
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Department: ${departmentSelect.value}`, 20, y);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, y);
      y += 15;

      // Add year-wise results table
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text("Year-wise Results", 20, y);
      y += 10;

      // Table headers
      const headers = ['Year', 'GPA', 'Total Credits', 'Total Grade Points'];
      const columnWidths = [30, 30, 50, 50];
      let x = 20;

      // Draw table header
      doc.setFillColor(200, 200, 200);
      doc.rect(x, y, columnWidths.reduce((a, b) => a + b, 0), 10, 'F');
      doc.setFontSize(10);
      headers.forEach((header, i) => {
        doc.text(header, x + 2, y + 7);
        x += columnWidths[i];
      });
      y += 10;

      // Table data
      doc.setFont('helvetica', 'normal');
      Object.keys(yearWiseResults).sort().forEach(year => {
        const data = yearWiseResults[year];
        x = 20;
        doc.text(`Year ${year}`, x + 2, y + 7);
        x += columnWidths[0];
        doc.text(data.gpa, x + 2, y + 7);
        x += columnWidths[1];
        doc.text(data.totalCredits.toString(), x + 2, y + 7);
        x += columnWidths[2];
        doc.text(data.totalGradePoints.toFixed(2), x + 2, y + 7);
        y += 10;
      });
      y += 10;

      // Add CGPA result if available
      const cgpaResult = document.getElementById("cgpa-result");
      if (cgpaResult && cgpaResult.textContent.trim()) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text("CGPA Summary", 20, y);
        y += 10;

        // Extract CGPA information
        const cgpaText = cgpaResult.textContent;
        const cgpaMatch = cgpaText.match(/CGPA.*?(\d+\.\d+)/);
        const creditsMatch = cgpaText.match(/Total Credits: (\d+)/);
        const pointsMatch = cgpaText.match(/Total Grade Points: (\d+\.\d+)/);

        if (cgpaMatch) {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'normal');
          doc.text(`Final CGPA: ${cgpaMatch[1]}`, 20, y);
          y += 7;
          if (creditsMatch) {
            doc.text(`Total Credits: ${creditsMatch[1]}`, 20, y);
            y += 7;
          }
          if (pointsMatch) {
            doc.text(`Total Grade Points: ${pointsMatch[1]}`, 20, y);
          }
        }
      }

      // Add footer with contact information
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text("Developed by Md. Alimul Islam Avro", 105, pageHeight - 20, { align: 'center' });
      doc.text("Website: alimulavro.netlify.app", 105, pageHeight - 15, { align: 'center' });
      doc.text("Facebook: facebook.com/alimul.avro", 105, pageHeight - 10, { align: 'center' });

      // Save the PDF with consistent naming
      const timestamp = new Date().toISOString().split('T')[0];
      doc.save(`CGPA_Calculator_by_Avro_${departmentSelect.value}_${timestamp}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert(texts[langSelect.value].pdfError);
    }
  };

  // Function to clear all results
  window.clearAllResults = function() {
    if (confirm(texts[langSelect.value].confirmClear)) {
      Object.keys(yearWiseResults).forEach(key => delete yearWiseResults[key]);
      localStorage.removeItem('yearWiseResults');
      updateSummaryDisplay();
      document.getElementById("cgpa-result").innerHTML = "";
    }
  };

  // Add event listeners for CGPA calculation buttons
  document.getElementById('calculate-cgpa-1').addEventListener('click', () => calculateCGPA(1));
  document.getElementById('calculate-cgpa-2').addEventListener('click', () => calculateCGPA(2));
  document.getElementById('calculate-cgpa-3').addEventListener('click', () => calculateCGPA(3));
  document.getElementById('calculate-cgpa-4').addEventListener('click', () => calculateCGPA(4));

  // Add footer to the page
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-content">
      <p>Developed by <a href="https://alimulavro.netlify.app/" target="_blank">Md. Alimul Islam Avro</a></p>
      <div class="social-links">
        <a href="https://www.facebook.com/alimul.avro" target="_blank">
          <i class="fab fa-facebook"></i> Facebook
        </a>
        <a href="https://alimulavro.netlify.app/" target="_blank">
          <i class="fas fa-globe"></i> Website
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(footer);
}); 