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
    "A+": 4.00,  // 80% and above
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
          { name: "212801 - Physical Chemistry-I", credit: 3 },
          { name: "212803 - Fundamentals of Organic Chemistry", credit: 3 },
          { name: "212805 - Fundamentals of Inorganic Chemistry", credit: 3 },
          { name: "212806 - Chemistry Practical: Qualitative inorganic analysis, inorganic preparations and elementary crystal chemistry", credit: 3 },
          { name: "213709 - Fundamentals of Mathematics", credit: 4 },
          { name: "213711 - Calculus-I", credit: 2 }
        ],
        nonMajor: [
          { name: "212707 - Physics-I (Mechanics, Properties of Matter, Waves & Optics)", credit: 4 },
          { name: "212709 - Physics-II (Heat, Thermodynamics and Radiation)", credit: 2 },
          { name: "211501 - History of the Emergence of Independent of Bangladesh", credit: 4 }
        ]
      },
      "2": {
        major: [
          { name: "222801 - Physical Chemistry-II", credit: 4 },
          { name: "222803 - Organic Chemistry", credit: 4 },
          { name: "222805 - Chemistry of the Representative Elements", credit: 4 },
          { name: "222806 - Quantitative Inorganic Analysis (Practical)", credit: 4 },
          { name: "223707 - Calculus-II", credit: 4 },
          { name: "223708 - Math Lab (Practical)", credit: 2 }
        ],
        nonMajor: [
          { name: "222707 - Physics-III (Electricity and Modern Physics)", credit: 4 },
          { name: "222708 - Physics-IV (Physics Practical)", credit: 2 },
          { name: "221109 - English (Compulsory)", credit: 0 }
        ]
      },
      "3": {
        major: [
          { name: "232801 - Physical Chemistry-III", credit: 4 },
          { name: "232803 - Stereochemistry", credit: 4 },
          { name: "232805 - Advanced Concepts of Atomic Structure and Chemical Bonding", credit: 4 },
          { name: "232807 - Coordination Chemistry and Organometallic Chemistry", credit: 4 },
          { name: "232809 - Fundamentals of Analytical Chemistry", credit: 4 },
          { name: "232811 - Industrial Chemistry", credit: 4 },
          { name: "232813 - Agricultural Chemistry", credit: 4 },
          { name: "232814 - Physical Chemistry Practical", credit: 2 },
          { name: "232816 - Organic Chemistry Practical (Detection & Preparation)", credit: 2 }
        ],
        nonMajor: []
      },
      "4": {
        major: [
          { name: "242801 - Physical Chemistry-IV", credit: 4 },
          { name: "242803 - Selected Topics in Organic Chemistry", credit: 4 },
          { name: "242805 - Selected Topics in Inorganic Chemistry", credit: 4 },
          { name: "242807 - Nuclear Chemistry", credit: 4 },
          { name: "242809 - Organic Polymers", credit: 4 },
          { name: "242811 - Reaction Mechanism", credit: 4 },
          { name: "242813 - Separation Techniques", credit: 4 },
          { name: "242815 - Chemical Spectroscopy", credit: 4 },
          { name: "242816 - Practical Chemistry (Organic)", credit: 2 },
          { name: "242818 - Practical Chemistry (Industrial)", credit: 2 },
          { name: "242820 - Viva-voce", credit: 4 }
        ],
        nonMajor: []
      }
    },
    "Math": {
      "1": {
        major: [
          { name: "213701 - Fundamentals of Mathematics", credit: 3 },
          { name: "213703 - Calculus – I", credit: 3 },
          { name: "213705 - Linear Algebra", credit: 3 },
          { name: "213707 - Analytic and Vector Geometry", credit: 3 }
        ],
        nonMajor: [
          { name: "212807 - Chemistry-I", credit: 4 },
          { name: "212808 - Chemistry-I Practical", credit: 2 },
          { name: "213607 - Introduction to Statistics", credit: 4 },
          { name: "213608 - Statistics Practical-I", credit: 2 },
          { name: "212707 - Physics-I (Mechanics, Properties of Matter, Waves & Optics)", credit: 4 },
          { name: "212709 - Physics-II (Heat, Thermodynamics and Radiation)", credit: 2 },
          { name: "211501 - History of the Emergence of Independent Bangladesh", credit: 4 }
        ]
      },
      "2": {
        major: [
          { name: "223701 - Calculus –II", credit: 4 },
          { name: "223703 - Ordinary Differential Equations", credit: 4 },
          { name: "223705 - Computer Programming (Fortran)", credit: 4 },
          { name: "223706 - Math Lab (Practical)", credit: 4 }
        ],
        nonMajor: [
          { name: "222707 - Physics-III (Electricity and Modern Physics)", credit: 4 },
          { name: "222708 - Physics-IV (Physics Practical)", credit: 2 },
          { name: "222807 - General Chemistry-II", credit: 4 },
          { name: "222809 - Environmental Chemistry", credit: 2 },
          { name: "223609 - Methods of Statistics", credit: 4 },
          { name: "223610 - Statistics Practical-II", credit: 2 },
          { name: "221109 - English (Compulsory)", credit: 0 }
        ]
      },
      "3": {
        major: [
          { name: "233701 - Abstract Algebra", credit: 4 },
          { name: "233703 - Real Analysis", credit: 4 },
          { name: "233705 - Numerical Analysis", credit: 4 },
          { name: "233707 - Complex Analysis", credit: 4 },
          { name: "233709 - Differential Geometry", credit: 4 },
          { name: "233711 - Mechanics", credit: 4 },
          { name: "233713 - Linear Programming", credit: 4 },
          { name: "233714 - Math Lab (Practical)", credit: 4 }
        ],
        nonMajor: []
      },
      "4": {
        major: [
          { name: "243701 - Theory of Numbers", credit: 4 },
          { name: "243703 - Topology & Functional Analysis", credit: 4 },
          { name: "243705 - Methods of Applied Mathematics", credit: 4 },
          { name: "243707 - Tensor Analysis", credit: 4 },
          { name: "243709 - Partial Differential equations", credit: 4 },
          { name: "243711 - Hydrodynamics", credit: 4 },
          { name: "243713 - Discrete Mathematics", credit: 4 },
          { name: "243715 - Astronomy", credit: 4 },
          { name: "243717 - Mathematical Modeling in Biology", credit: 4 },
          { name: "243718 - Math Lab (Practical)", credit: 4 },
          { name: "243720 - Viva-Voce (Comprehensive)", credit: 4 }
        ],
        nonMajor: []
      }
    }
  };

  // Translation texts
  const texts = {
    en: {
      title: "<i class='fas fa-calculator'></i> CGPA Calculator by Alimul Avro",
      selectDept: "<i class='fas fa-building'></i> Department:",
      selectYear: "<i class='fas fa-calendar-alt'></i> Year:",
      selectGrade: "<i class='fas fa-graduation-cap'></i> Select Grade",
      majorCourses: "<i class='fas fa-book'></i> Major Courses",
      nonMajorCourses: "<i class='fas fa-book-open'></i> Non-Major Courses",
      calculateGPA: "<i class='fas fa-calculator'></i> Calculate GPA",
      calculateCGPA: "<i class='fas fa-calculator'></i> Calculate CGPA",
      calculateCGPA1: "<i class='fas fa-calculator'></i> Calculate CGPA (1 Year)",
      calculateCGPA2: "<i class='fas fa-calculator'></i> Calculate CGPA (2 Years)",
      calculateCGPA3: "<i class='fas fa-calculator'></i> Calculate CGPA (3 Years)",
      calculateCGPA4: "<i class='fas fa-calculator'></i> Calculate CGPA (4 Years)",
      loadCourses: "<i class='fas fa-download'></i> Load Courses",
      exportPDF: "<i class='fas fa-file-pdf'></i> Export Result as PDF",
      clearResults: "<i class='fas fa-trash-alt'></i> Clear All Results",
      darkMode: "<i class='fas fa-moon'></i> Dark Mode",
      lightMode: "<i class='fas fa-sun'></i> Light Mode",
      selectDeptAndYear: "<i class='fas fa-exclamation-circle'></i> Please select both department and year",
      noDataFound: "<i class='fas fa-exclamation-triangle'></i> No course data found for this selection",
      noMajorCourses: "<i class='fas fa-info-circle'></i> No major courses available",
      missingGrades: "<i class='fas fa-exclamation-circle'></i> Please select grades for all courses",
      invalidCredits: "<i class='fas fa-times-circle'></i> Invalid credit values found",
      zeroCredits: "<i class='fas fa-ban'></i> Total credits cannot be zero",
      calculationError: "<i class='fas fa-exclamation-triangle'></i> Error calculating GPA",
      saveError: "<i class='fas fa-times-circle'></i> Error saving results",
      pdfError: "<i class='fas fa-file-pdf'></i> Error generating PDF",
      notEnoughData: "<i class='fas fa-exclamation-circle'></i> Not enough data for {count} years",
      totalCredits: "<i class='fas fa-hashtag'></i> Total Credits",
      totalGradePoints: "<i class='fas fa-star'></i> Total Grade Points",
      gpa: "<i class='fas fa-chart-line'></i> GPA",
      cgpa: "<i class='fas fa-chart-bar'></i> CGPA",
      year: "<i class='fas fa-calendar'></i> Years",
      confirmClear: "<i class='fas fa-question-circle'></i> Are you sure you want to clear all results?",
      confirmRemove: "<i class='fas fa-question-circle'></i> Are you sure you want to remove this course?",
      remove: "<i class='fas fa-trash'></i> Remove"
    },
    bn: {
      title: "<i class='fas fa-calculator'></i> সিজিপিএ ক্যালকুলেটর - আলিমুল অভ্র",
      selectDept: "<i class='fas fa-building'></i> বিভাগ:",
      selectYear: "<i class='fas fa-calendar-alt'></i> বছর:",
      selectGrade: "<i class='fas fa-graduation-cap'></i> গ্রেড নির্বাচন করুন",
      majorCourses: "<i class='fas fa-book'></i> মেজর কোর্সসমূহ",
      nonMajorCourses: "<i class='fas fa-book-open'></i> নন-মেজর কোর্সসমূহ",
      calculateGPA: "<i class='fas fa-calculator'></i> জিপিএ গণনা করুন",
      calculateCGPA: "<i class='fas fa-calculator'></i> সিজিপিএ গণনা করুন",
      calculateCGPA1: "<i class='fas fa-calculator'></i> সিজিপিএ গণনা করুন (১ বছর)",
      calculateCGPA2: "<i class='fas fa-calculator'></i> সিজিপিএ গণনা করুন (২ বছর)",
      calculateCGPA3: "<i class='fas fa-calculator'></i> সিজিপিএ গণনা করুন (৩ বছর)",
      calculateCGPA4: "<i class='fas fa-calculator'></i> সিজিপিএ গণনা করুন (৪ বছর)",
      loadCourses: "<i class='fas fa-download'></i> কোর্স লোড করুন",
      exportPDF: "<i class='fas fa-file-pdf'></i> পিডিএফ হিসেবে রিপোর্ট ডাউনলোড করুন",
      clearResults: "<i class='fas fa-trash-alt'></i> সব ফলাফল মুছে ফেলুন"
    }
  };

  // Function to update theme label
  function updateThemeLabel(isDark) {
    const themeLabel = document.querySelector('.theme-label');
    if (themeLabel) {
      themeLabel.innerHTML = isDark ? 
        '<i class="fas fa-moon"></i> Dark Mode' : 
        '<i class="fas fa-sun"></i> Light Mode';
    }
  }

  // Function to update language
  function updateLanguage(lang) {
    // Update department and year labels
    const deptLabel = document.querySelector('label[for="department"]');
    const yearLabel = document.querySelector('label[for="year"]');
    
    if (deptLabel) {
      deptLabel.innerHTML = `<i class="fas fa-building"></i> ${lang === 'bn' ? 'বিভাগ:' : 'Department:'}`;
    }
    if (yearLabel) {
      yearLabel.innerHTML = `<i class="fas fa-calendar-alt"></i> ${lang === 'bn' ? 'বছর:' : 'Year:'}`;
    }

    // Update other elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (texts[lang] && texts[lang][key]) {
        element.innerHTML = texts[lang][key];
      }
    });

    // Update theme label
    updateThemeLabel(document.body.classList.contains('dark'));
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

  // Initial setup
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const savedLang = localStorage.getItem('language') || 'en';

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
  }

  langSelect.value = savedLang;
  updateLanguage(savedLang);
  updateThemeLabel(document.body.classList.contains('dark'));

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

  // Function to create grade dropdown
  function createGradeDropdown() {
    const select = document.createElement("select");
    select.required = true;
    select.classList.add("grade-select");
    select.innerHTML = `<option value="">${texts[langSelect.value].selectGrade}</option>`;
    
    // Add grades in order with their percentage ranges
    const gradeRanges = [
      { grade: "A+", range: "80% and above" },
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

    // Add change event listener to remove error class when a grade is selected
    select.addEventListener('change', function() {
      if (this.value) {
        this.classList.remove('error');
      }
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

    // Load removed courses from localStorage
    const removedCourses = JSON.parse(localStorage.getItem('removedCourses') || '{}');
    const yearRemovedCourses = removedCourses[selectedDept]?.[selectedYear] || [];

    // Create Major courses section
    const majorHeader = document.createElement("h3");
    majorHeader.innerHTML = `<i class="fas fa-book"></i> ${texts[langSelect.value].majorCourses.replace(/<i.*?><\/i>/, '')}`;
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
      nonMajorHeader.innerHTML = `<i class="fas fa-book-open"></i> ${texts[langSelect.value].nonMajorCourses.replace(/<i.*?><\/i>/, '')}`;
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
    calculateBtn.innerHTML = `<i class="fas fa-calculator" style="color: white;"></i> Calculate GPA`;
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
    majorHeader.innerHTML = `<i class="fas fa-book"></i> ${texts[langSelect.value].majorCourses.replace(/<i.*?><\/i>/, '')}`;
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
      nonMajorHeader.innerHTML = `<i class="fas fa-book-open"></i> ${texts[langSelect.value].nonMajorCourses.replace(/<i.*?><\/i>/, '')}`;
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
    calculateBtn.innerHTML = `<i class="fas fa-calculator" style="color: white;"></i> Calculate GPA`;
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
    button.innerHTML = `<i class="fas fa-trash"></i>`;
    button.classList.add("remove-course");
    button.title = texts[langSelect.value].remove;
    button.addEventListener("click", () => {
      if (confirm(texts[langSelect.value].confirmRemove)) {
        // Store the course data before removing
        const courseData = {
          name: course.name,
          credit: course.credit,
          grade: course.grade
        };

        // Find the course in non-major courses
        const courseIndex = coursesData[departmentSelect.value][yearSelect.value].nonMajor.findIndex(
          c => c.name === course.name
        );

        if (courseIndex !== -1) {
          // Store the course data in localStorage before removing
          const removedCourses = JSON.parse(localStorage.getItem('removedCourses') || '{}');
          if (!removedCourses[departmentSelect.value]) {
            removedCourses[departmentSelect.value] = {};
          }
          if (!removedCourses[departmentSelect.value][yearSelect.value]) {
            removedCourses[departmentSelect.value][yearSelect.value] = [];
          }
          removedCourses[departmentSelect.value][yearSelect.value].push(courseData);
          localStorage.setItem('removedCourses', JSON.stringify(removedCourses));

          // Remove the course
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
      let hasFailedSubject = false;
      let invalidCreditsFound = false;
      let nonCreditSubjects = [];
      let courseDetails = [];

      // Reset error states
      gradeSelects.forEach(select => {
        select.classList.remove('error');
      });

      for (let i = 0; i < gradeSelects.length; i++) {
        const gradeValue = parseFloat(gradeSelects[i].value);
        const credit = parseFloat(creditInputs[i].value);
        const courseName = creditInputs[i].previousElementSibling.textContent;

        if (isNaN(gradeValue)) {
          gradeSelects[i].classList.add('error');
          missingGrades = true;
          continue;
        }

        // Store course details
        courseDetails.push({
          name: courseName,
          credit: credit,
          grade: gradeValue
        });

        // Handle non-credit subjects
        if (credit === 0) {
          nonCreditSubjects.push({
            name: courseName,
            grade: gradeValue
          });
          continue;
        }

        // Validate credit value for credit-bearing subjects
        if (isNaN(credit) || credit < 0 || credit > 6) {
          console.error('Invalid credit value:', creditInputs[i].value);
          invalidCreditsFound = true;
          creditInputs[i].classList.add('error');
          continue;
        }

        // Check for failed subject
        if (gradeValue === 0) {
          hasFailedSubject = true;
        } else {
          totalCredits += credit;
          totalGradePoints += credit * gradeValue;
        }
      }

      if (missingGrades) {
        resultDiv.innerHTML = `<p class="error">${texts[langSelect.value].missingGrades}</p>`;
        return;
      }

      if (invalidCreditsFound) {
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

      // Determine grade interpretation based on new scale
      let gradeInterpretation = "";
      if (gpa >= 3.75) gradeInterpretation = "First Class (A+)";
      else if (gpa >= 3.50) gradeInterpretation = "First Class (A)";
      else if (gpa >= 3.25) gradeInterpretation = "First Class (B+)";
      else if (gpa >= 3.00) gradeInterpretation = "First Class (B)";
      else if (gpa >= 2.75) gradeInterpretation = "First Class (B-)";
      else if (gpa >= 2.50) gradeInterpretation = "Second Class (C+)";
      else if (gpa >= 2.25) gradeInterpretation = "Second Class (C)";
      else if (gpa >= 2.00) gradeInterpretation = "Third Class (D)";
      else gradeInterpretation = "Failed (F)";

      // Update result display with grade interpretation and non-credit subjects
      updateResultDisplay(resultDiv, gpa, totalCredits, totalGradePoints, gradeInterpretation, hasFailedSubject, nonCreditSubjects);

      // Store the result with course details
      yearWiseResults[yearSelect.value] = {
        gpa: gpa.toFixed(2),
        totalCredits,
        totalGradePoints,
        gradeInterpretation,
        hasFailedSubject,
        nonCreditSubjects,
        courses: courseDetails,
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

  // Function to update result display
  function updateResultDisplay(resultDiv, gpa, totalCredits, totalGradePoints, gradeInterpretation, hasFailedSubject, nonCreditSubjects = []) {
    let nonCreditSubjectsHtml = '';
    if (nonCreditSubjects.length > 0) {
      nonCreditSubjectsHtml = `
        <div class="non-credit-subjects">
          <h4><i class="fas fa-info-circle"></i> Non-Credit Subjects</h4>
          <ul>
            ${nonCreditSubjects.map(subject => `
              <li>
                <span class="subject-name">${subject.name}</span>
                <span class="subject-grade">Grade: ${getGradeFromPoints(subject.grade)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    resultDiv.innerHTML = `
      <div class="result-box">
        <h3><i class="fas fa-chart-line"></i> GPA Result</h3>
        <p class="gpa-value">${gpa.toFixed(2)}</p>
        <p class="grade-interpretation"><i class="fas fa-award"></i> Grade: ${gradeInterpretation}</p>
        ${hasFailedSubject ? '<p class="warning"><i class="fas fa-exclamation-triangle"></i> Warning: Failed subjects detected. These must be retaken.</p>' : ''}
        <div class="result-details">
          <p><i class="fas fa-hashtag"></i> Total Credits: ${totalCredits}</p>
          <p><i class="fas fa-star"></i> Total Grade Points: ${totalGradePoints.toFixed(2)}</p>
        </div>
        ${nonCreditSubjectsHtml}
      </div>
    `;
  }

  // Helper function to get grade from points
  function getGradeFromPoints(points) {
    if (points >= 4.00) return "A+";
    if (points >= 3.75) return "A";
    if (points >= 3.50) return "A-";
    if (points >= 3.25) return "B+";
    if (points >= 3.00) return "B";
    if (points >= 2.75) return "B-";
    if (points >= 2.50) return "C+";
    if (points >= 2.25) return "C";
    if (points >= 2.00) return "D";
    return "F";
  }

  // Function to calculate CGPA
  window.calculateCGPA = function(yearCount) {
    console.log('Calculating CGPA for', yearCount, 'years');
    console.log('Available results:', yearWiseResults);

    // Reset all grade select fields to normal state
    document.querySelectorAll('select').forEach(select => {
      select.classList.remove('error');
    });

    const selectedYears = Object.keys(yearWiseResults)
      .sort()
      .slice(0, yearCount);

    console.log('Selected years for calculation:', selectedYears);

    if (selectedYears.length < yearCount) {
      document.getElementById("cgpa-result").innerHTML = 
        `<p class="error">${texts[langSelect.value].notEnoughData.replace('{count}', yearCount)}</p>`;
      return;
    }

    // Check for missing grades in current view
    let hasMissingGrades = false;
    const courseRows = document.querySelectorAll('.course-row');
    courseRows.forEach(row => {
      const gradeSelect = row.querySelector('select');
      if (gradeSelect && !gradeSelect.value) {
        gradeSelect.classList.add('error');
        hasMissingGrades = true;
      }
    });

    if (hasMissingGrades) {
      document.getElementById("cgpa-result").innerHTML = 
        `<p class="error">${texts[langSelect.value].missingGrades}</p>`;
      return;
    }

    // Calculate GPA for current year
    let totalGP = 0;
    let totalCredits = 0;
    let nonCreditSubjects = [];
    let hasFailedSubject = false;

    courseRows.forEach(row => {
      const gradeSelect = row.querySelector('select');
      const creditInput = row.querySelector('input[readonly]');
      const courseName = row.querySelector('label').textContent;
      
      if (gradeSelect && creditInput) {
        const grade = parseFloat(gradeSelect.value);
        const credit = parseFloat(creditInput.value);
        
        if (!isNaN(grade)) {
          if (credit === 0) {
            nonCreditSubjects.push({
              name: courseName,
              grade: grade
            });
          } else if (!isNaN(credit)) {
            if (grade === 0) {
              hasFailedSubject = true;
            } else {
              totalGP += grade * credit;
              totalCredits += credit;
            }
          }
        }
      }
    });

    // Add to yearWiseResults
    const currentYear = yearSelect.value;
    yearWiseResults[currentYear] = {
      gpa: (totalGP / totalCredits).toFixed(2),
      totalCredits,
      totalGradePoints: totalGP,
      nonCreditSubjects,
      hasFailedSubject,
      timestamp: new Date().toISOString()
    };

    // Calculate CGPA from all years
    let cgpaTotalGP = 0;
    let cgpaTotalCredits = 0;
    let allNonCreditSubjects = [];
    let hasAnyFailedSubject = false;

    selectedYears.forEach(year => {
      const data = yearWiseResults[year];
      cgpaTotalGP += data.totalGradePoints;
      cgpaTotalCredits += data.totalCredits;
      if (data.nonCreditSubjects) {
        allNonCreditSubjects = allNonCreditSubjects.concat(data.nonCreditSubjects);
      }
      if (data.hasFailedSubject) {
        hasAnyFailedSubject = true;
      }
    });

    if (cgpaTotalCredits === 0) {
      document.getElementById("cgpa-result").innerHTML = 
        `<p class="error">${texts[langSelect.value].zeroCredits}</p>`;
      return;
    }

    const cgpa = cgpaTotalGP / cgpaTotalCredits;
    
    // Calculate grade interpretation based on new scale
    let gradeInterpretation = "";
    if (cgpa >= 3.75) gradeInterpretation = "First Class (A+)";
    else if (cgpa >= 3.50) gradeInterpretation = "First Class (A)";
    else if (cgpa >= 3.25) gradeInterpretation = "First Class (B+)";
    else if (cgpa >= 3.00) gradeInterpretation = "First Class (B)";
    else if (cgpa >= 2.75) gradeInterpretation = "First Class (B-)";
    else if (cgpa >= 2.50) gradeInterpretation = "Second Class (C+)";
    else if (cgpa >= 2.25) gradeInterpretation = "Second Class (C)";
    else if (cgpa >= 2.00) gradeInterpretation = "Third Class (D)";
    else gradeInterpretation = "Failed (F)";

    updateCGPAResultDisplay(cgpa, gradeInterpretation, cgpaTotalCredits, cgpaTotalGP, yearCount, allNonCreditSubjects, hasAnyFailedSubject);

    // Save to localStorage
    try {
      localStorage.setItem('yearWiseResults', JSON.stringify(yearWiseResults));
    } catch (error) {
      console.error('Error saving results:', error);
    }

    // Update summary display
    updateSummaryDisplay();
  };

  // Function to update CGPA result display
  function updateCGPAResultDisplay(cgpa, gradeInterpretation, totalCredits, totalGradePoints, yearCount, nonCreditSubjects = [], hasFailedSubject = false) {
    let nonCreditSubjectsHtml = '';
    if (nonCreditSubjects.length > 0) {
      nonCreditSubjectsHtml = `
        <div class="non-credit-subjects">
          <h4><i class="fas fa-info-circle"></i> Non-Credit Subjects</h4>
          <ul>
            ${nonCreditSubjects.map(subject => `
              <li>
                <span class="subject-name">${subject.name}</span>
                <span class="subject-grade">Grade: ${getGradeFromPoints(subject.grade)}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    document.getElementById("cgpa-result").innerHTML = `
      <div class="result-box">
        <h3><i class="fas fa-chart-bar"></i> CGPA Result (${yearCount} Years)</h3>
        <p class="cgpa-value">${cgpa.toFixed(2)}</p>
        <p class="grade-interpretation"><i class="fas fa-award"></i> Grade: ${gradeInterpretation}</p>
        ${hasFailedSubject ? '<p class="warning"><i class="fas fa-exclamation-triangle"></i> Warning: Failed subjects detected. These must be retaken.</p>' : ''}
        <div class="result-details">
          <p><i class="fas fa-hashtag"></i> Total Credits: ${totalCredits}</p>
          <p><i class="fas fa-star"></i> Total Grade Points: ${totalGradePoints.toFixed(2)}</p>
        </div>
        ${nonCreditSubjectsHtml}
      </div>
    `;
  }

  // Function to update summary display
  function updateSummaryDisplay() {
    const summary = document.getElementById("summary-results");
    summary.innerHTML = "<h3><i class='fas fa-list-alt'></i> Year-wise Results</h3>";

    Object.keys(yearWiseResults).sort().forEach(year => {
      const data = yearWiseResults[year];
      // Convert year number to ordinal format
      const ordinalYear = year === "1" ? "1st" : 
                         year === "2" ? "2nd" : 
                         year === "3" ? "3rd" : 
                         year === "4" ? "4th" : year;
      
      summary.innerHTML += `
        <div class="year-result">
          <div class="year-info">
            <strong><i class="fas fa-calendar"></i> ${ordinalYear} Year:</strong> 
            <i class="fas fa-chart-line"></i> GPA: ${data.gpa}, 
            <i class="fas fa-hashtag"></i> Credits: ${data.totalCredits}
          </div>
          <div class="result-actions">
            <button onclick="editYearResult('${year}')" class="edit-btn">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button onclick="deleteYearResult('${year}')" class="delete-btn">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      `;
    });

    // Add CSS for the year results
    const style = document.createElement('style');
    style.textContent = `
      .year-result {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin: 10px 0;
        background-color: var(--card-bg);
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .year-info {
        flex: 1;
      }

      .result-actions {
        display: flex;
        gap: 10px;
        margin-left: 15px;
      }

      .edit-btn, .delete-btn {
        padding: 8px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
      }

      .edit-btn {
        background-color: var(--primary-color);
        color: white;
      }

      .delete-btn {
        background-color: #dc3545;
        color: white;
      }

      .edit-btn:hover {
        background-color: var(--hover-color);
        transform: translateY(-2px);
      }

      .delete-btn:hover {
        background-color: #c82333;
        transform: translateY(-2px);
      }

      .dark .year-result {
        background-color: var(--dark-card-bg);
      }

      .dark .edit-btn {
        background-color: var(--primary-color);
      }

      .dark .delete-btn {
        background-color: #dc3545;
      }

      .dark .edit-btn:hover {
        background-color: var(--hover-color);
      }

      .dark .delete-btn:hover {
        background-color: #c82333;
      }

      /* Make all button icons white */
      .edit-btn i, .delete-btn i, #calculate-btn i {
        color: white !important;
      }

      /* Calculate GPA button styles */
      #calculate-btn {
        background-color: var(--primary-color);
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1em;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        margin-top: 20px;
      }

      #calculate-btn:hover {
        background-color: var(--hover-color);
        transform: translateY(-2px);
      }

      .dark #calculate-btn {
        background-color: var(--primary-color);
      }

      .dark #calculate-btn:hover {
        background-color: var(--hover-color);
      }
    `;
    document.head.appendChild(style);

    // Save to localStorage
    try {
      localStorage.setItem('yearWiseResults', JSON.stringify(yearWiseResults));
    } catch (error) {
      console.error('Error saving results:', error);
    }
  }

  // Function to edit year result
  window.editYearResult = function(year) {
    // Set the department and year
    departmentSelect.value = departmentSelect.value;
    yearSelect.value = year;
    
    // Load the courses first
    loadCourses();
    
    // Wait for courses to load before setting grades
    setTimeout(() => {
      const yearData = yearWiseResults[year];
      if (yearData && yearData.courses) {
        // Get all course rows
        const courseRows = document.querySelectorAll('.course-row');
        
        // For each course row, find and set the matching grade
        courseRows.forEach(row => {
          const courseName = row.querySelector('label').textContent;
          const gradeSelect = row.querySelector('select');
          
          // Find the matching course in the stored data
          const storedCourse = yearData.courses.find(course => course.name === courseName);
          if (storedCourse && gradeSelect) {
            // Set the grade value
            gradeSelect.value = storedCourse.grade;
            
            // Remove error class if it exists
            gradeSelect.classList.remove('error');
          }
        });
        
        // Scroll to the courses container
        coursesContainer.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // Small delay to ensure courses are loaded
  };

  // Function to delete year result
  window.deleteYearResult = function(year) {
    if (confirm(`Are you sure you want to delete the results for Year ${year}?`)) {
      delete yearWiseResults[year];
      updateSummaryDisplay();
      document.getElementById("cgpa-result").innerHTML = "";
      
      // Save to localStorage after deletion
      try {
        localStorage.setItem('yearWiseResults', JSON.stringify(yearWiseResults));
      } catch (error) {
        console.error('Error saving results:', error);
      }
    }
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
      doc.text("CGPA Calculator by Alimul Avro", 105, y, { align: 'center' });
      y += 10;

      // Add department and date
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Department: ${departmentSelect.value}`, 20, y);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, y);
      y += 15;

      // Add CGPA Summary section first
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text("CGPA Summary", 20, y);
      y += 10;

      // Calculate CGPA from yearWiseResults
      let totalGP = 0;
      let totalCredits = 0;
      Object.keys(yearWiseResults).sort().forEach(year => {
        const data = yearWiseResults[year];
        totalGP += data.totalGradePoints;
        totalCredits += data.totalCredits;
      });

      const cgpa = totalCredits > 0 ? (totalGP / totalCredits).toFixed(2) : "0.00";

      // Add CGPA details
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`CGPA (${Object.keys(yearWiseResults).length} Years): ${cgpa}`, 20, y);
      y += 7;

      // Add grade interpretation
      let gradeInterpretation = "";
      if (cgpa >= 3.75) gradeInterpretation = "First Class (A+)";
      else if (cgpa >= 3.50) gradeInterpretation = "First Class (A)";
      else if (cgpa >= 3.25) gradeInterpretation = "First Class (B+)";
      else if (cgpa >= 3.00) gradeInterpretation = "First Class (B)";
      else if (cgpa >= 2.75) gradeInterpretation = "First Class (B-)";
      else if (cgpa >= 2.50) gradeInterpretation = "Second Class (C+)";
      else if (cgpa >= 2.25) gradeInterpretation = "Second Class (C)";
      else if (cgpa >= 2.00) gradeInterpretation = "Third Class (D)";
      else gradeInterpretation = "Failed (F)";
      
      doc.text(`Grade: ${gradeInterpretation}`, 20, y);
      y += 7;
      doc.text(`Total Credits: ${totalCredits}`, 20, y);
      y += 7;
      doc.text(`Total Grade Points: ${totalGP.toFixed(2)}`, 20, y);
      y += 15;

      // Add year-wise detailed results
      Object.keys(yearWiseResults).sort().forEach(year => {
        const data = yearWiseResults[year];
        
        // Add year header
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Year ${year} Details`, 20, y);
        y += 10;

        // Add year summary
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`GPA: ${data.gpa}`, 20, y);
        y += 7;
        doc.text(`Total Credits: ${data.totalCredits}`, 20, y);
        y += 7;
        doc.text(`Total Grade Points: ${data.totalGradePoints.toFixed(2)}`, 20, y);
        y += 10;

        // Add course details table
        const courseHeaders = ['Course', 'Credit', 'Grade', 'Grade Points'];
        const columnWidths = [80, 30, 30, 40];
        let x = 20;

        // Draw table header
        doc.setFillColor(200, 200, 200);
        doc.rect(x, y, columnWidths.reduce((a, b) => a + b, 0), 10, 'F');
        doc.setFontSize(10);
        courseHeaders.forEach((header, i) => {
          doc.text(header, x + 2, y + 7);
          x += columnWidths[i];
        });
        y += 10;

        // Add course data
        doc.setFont('helvetica', 'normal');
        if (data.courses && data.courses.length > 0) {
          data.courses.forEach(course => {
            x = 20;
            // Course name
            doc.text(course.name.substring(0, 30), x + 2, y + 7);
            x += columnWidths[0];
            // Credit
            doc.text(course.credit.toString(), x + 2, y + 7);
            x += columnWidths[1];
            // Grade
            doc.text(getGradeFromPoints(course.grade), x + 2, y + 7);
            x += columnWidths[2];
            // Grade Points
            doc.text(course.grade.toFixed(2), x + 2, y + 7);
            y += 10;

            // Check if we need a new page
            if (y > 250) {
              doc.addPage();
              y = 20;
            }
          });
        }

        // Add non-credit subjects if any
        if (data.nonCreditSubjects && data.nonCreditSubjects.length > 0) {
          y += 5;
          doc.setFont('helvetica', 'bold');
          doc.text('Non-Credit Subjects:', 20, y);
          y += 7;
          doc.setFont('helvetica', 'normal');
          data.nonCreditSubjects.forEach(subject => {
            doc.text(`${subject.name}: ${getGradeFromPoints(subject.grade)}`, 25, y);
            y += 7;
          });
        }

        // Add warning for failed subjects if any
        if (data.hasFailedSubject) {
          y += 5;
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(255, 0, 0);
          doc.text('Warning: Failed subjects detected. These must be retaken.', 20, y);
          doc.setTextColor(0, 0, 0);
          y += 10;
        }

        y += 15; // Add space between years
      });

      // Add footer with contact information
      const pageHeight = doc.internal.pageSize.height;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text("Developed by Md. Alimul Islam Avro", 105, pageHeight - 20, { align: 'center' });
      doc.text("Website: alimulavro.netlify.app", 105, pageHeight - 15, { align: 'center' });
      doc.text("Facebook: facebook.com/alimul.avro", 105, pageHeight - 10, { align: 'center' });

      // Save the PDF with consistent naming
      const timestamp = new Date().toISOString().split('T')[0];
      doc.save(`CGPA_Calculator_by_Alimul_Avro_${departmentSelect.value}_${timestamp}.pdf`);
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

  // Update the header with icon
  document.querySelector('h1').innerHTML = `<i class="fas fa-calculator"></i> CGPA Calculator by Alimul Avro`;

  // Update department select label
  document.querySelector('label[for="department"]').innerHTML = `<i class="fas fa-building"></i> Department:`;

  // Update year select label
  document.querySelector('label[for="year"]').innerHTML = `<i class="fas fa-calendar-alt"></i> Year:`;

  // Update load courses button
  document.getElementById('load-courses-btn').innerHTML = `<i class="fas fa-download" style="color: white;"></i> Load Courses`;

  // Update CGPA buttons
  document.getElementById('calculate-cgpa-1').innerHTML = `<i class="fas fa-calculator"></i> Calculate CGPA (1 Year)`;
  document.getElementById('calculate-cgpa-2').innerHTML = `<i class="fas fa-calculator"></i> Calculate CGPA (2 Years)`;
  document.getElementById('calculate-cgpa-3').innerHTML = `<i class="fas fa-calculator"></i> Calculate CGPA (3 Years)`;
  document.getElementById('calculate-cgpa-4').innerHTML = `<i class="fas fa-calculator"></i> Calculate CGPA (4 Years)`;

  // Update action buttons
  document.querySelector('.action-buttons').innerHTML = `
    <button onclick="exportToPDF()" class="export-btn">
      <i class="fas fa-file-pdf" style="color: white;"></i> Export Result as PDF
    </button>
    <button onclick="clearAllResults()" class="clear-btn">
      <i class="fas fa-trash-alt"></i> Clear All Results
    </button>
  `;

  // Add CSS for the action buttons
  const actionButtonsStyle = document.createElement('style');
  actionButtonsStyle.textContent = `
    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
      align-items: center;
    }

    .export-btn, .clear-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      min-width: 200px;
      justify-content: center;
    }

    .export-btn {
      background-color: var(--primary-color);
      color: white;
    }

    .clear-btn {
      background-color: #dc3545;
      color: white;
    }

    .export-btn:hover {
      background-color: var(--hover-color);
      transform: translateY(-2px);
    }

    .clear-btn:hover {
      background-color: #c82333;
      transform: translateY(-2px);
    }

    .dark .export-btn {
      background-color: var(--primary-color);
    }

    .dark .clear-btn {
      background-color: #dc3545;
    }

    .dark .export-btn:hover {
      background-color: var(--hover-color);
    }

    .dark .clear-btn:hover {
      background-color: #c82333;
    }

    #load-courses-btn {
      background-color: var(--primary-color);
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1em;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
    }

    #load-courses-btn:hover {
      background-color: var(--hover-color);
      transform: translateY(-2px);
    }

    .dark #load-courses-btn {
      background-color: var(--primary-color);
    }

    .dark #load-courses-btn:hover {
      background-color: var(--hover-color);
    }

    /* Remove export PDF button from CGPA section */
    .export-pdf-btn {
      display: none;
    }
  `;
  document.head.appendChild(actionButtonsStyle);

  // Physics Animation Setup
  function initPhysicsAnimation() {
    const canvas = document.getElementById('physics-canvas');
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Create particles
    const particles = [];
    const particleCount = 50;
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];

    for (let i = 0; i < particleCount; i++) {
      const particle = Matter.Bodies.circle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.random() * 5 + 2,
        {
          restitution: 0.8,
          friction: 0.005,
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)]
          }
        }
      );
      particles.push(particle);
    }

    // Add particles to world
    Matter.World.add(engine.world, particles);

    // Add walls
    const walls = [
      Matter.Bodies.rectangle(window.innerWidth / 2, -10, window.innerWidth, 20, { isStatic: true }),
      Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 10, window.innerWidth, 20, { isStatic: true }),
      Matter.Bodies.rectangle(-10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
      Matter.Bodies.rectangle(window.innerWidth + 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true })
    ];
    Matter.World.add(engine.world, walls);

    // Handle window resize
    window.addEventListener('resize', () => {
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    });

    // Start the engine and renderer
    Matter.Engine.run(engine);
    Matter.Render.run(render);
  }

  // Export/Import Functions
  function exportData() {
    try {
      const data = {
        courses: {},
        results: {},
        settings: {
          theme: document.body.classList.contains('dark') ? 'dark' : 'light',
          language: langSelect.value
        }
      };

      // Save course data
      const courseRows = document.querySelectorAll('.course-row');
      courseRows.forEach(row => {
        const courseName = row.querySelector('.course-name').textContent;
        const credits = row.querySelector('.credits').textContent;
        const grade = row.querySelector('.grade-select').value;
        data.courses[courseName] = { credits, grade };
      });

      // Save results
      data.results = {
        yearWiseResults: yearWiseResults,
        cgpaResult: document.getElementById('cgpa-result').innerHTML,
        summaryResults: document.getElementById('summary-results').innerHTML
      };

      // Ask user where to save
      const saveLocation = prompt('Where would you like to save the data?\n1. Local Storage (Browser)\n2. Download as File\n\nEnter 1 or 2:');

      if (saveLocation === '1') {
        // Save to localStorage
        localStorage.setItem('cgpaCalculatorData', JSON.stringify(data));
        alert('Data saved to browser storage successfully!');
      } else if (saveLocation === '2') {
        // Save as file
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cgpa_calculator_data_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Data downloaded as file successfully!');
      } else {
        alert('Invalid option selected. Data not saved.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  }

  function importData() {
    try {
      // Ask user where to import from
      const importSource = prompt('Where would you like to import data from?\n1. Local Storage (Browser)\n2. Upload File\n\nEnter 1 or 2:');

      if (importSource === '1') {
        // Import from localStorage
        const savedData = localStorage.getItem('cgpaCalculatorData');
        if (!savedData) {
          alert('No saved data found in browser storage.');
          return;
        }
        loadData(JSON.parse(savedData));
      } else if (importSource === '2') {
        // Import from file
        const input = document.getElementById('import-file');
        input.click();

        input.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              try {
                const data = JSON.parse(event.target.result);
                loadData(data);
              } catch (error) {
                alert('Error reading file. Please check the file format.');
                console.error('Import error:', error);
              }
            };
            reader.readAsText(file);
          }
        });
      } else {
        alert('Invalid option selected. Data not imported.');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Error importing data. Please try again.');
    }
  }

  // Helper function to load data
  function loadData(data) {
    try {
      // Restore settings
      if (data.settings) {
        // Restore theme
        if (data.settings.theme === 'dark') {
          document.body.classList.add('dark');
          themeSwitch.checked = true;
        } else {
          document.body.classList.remove('dark');
          themeSwitch.checked = false;
        }
        
        // Restore language
        if (data.settings.language) {
          langSelect.value = data.settings.language;
          updateLanguage(data.settings.language);
        }
      }
      
      // Restore results
      if (data.results) {
        // Restore year-wise results
        if (data.results.yearWiseResults) {
          Object.assign(yearWiseResults, data.results.yearWiseResults);
        }
        
        // Restore CGPA result
        if (data.results.cgpaResult) {
          document.getElementById('cgpa-result').innerHTML = data.results.cgpaResult;
        }
        
        // Restore summary results
        if (data.results.summaryResults) {
          document.getElementById('summary-results').innerHTML = data.results.summaryResults;
        }
      }
      
      // Save to localStorage
      try {
        localStorage.setItem('yearWiseResults', JSON.stringify(yearWiseResults));
        localStorage.setItem('theme', data.settings.theme);
        localStorage.setItem('language', data.settings.language);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      alert('Data loaded successfully!');
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data. Please try again.');
    }
  }

  // Add event listeners for export/import buttons
  document.querySelector('.export-btn[data-i18n="exportData"]').addEventListener('click', exportData);
  document.querySelector('.import-btn[data-i18n="importData"]').addEventListener('click', importData);

  // Load saved data when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('cgpaCalculatorData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        loadData(data);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  });

  // Set icons for static elements
  document.querySelector('.theme-label').innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  document.querySelector('h1').innerHTML = '<i class="fas fa-calculator"></i> CGPA Calculator by Alimul Avro';
  document.querySelector('h2[data-i18n="calculateCGPA"]').innerHTML = '<i class="fas fa-calculator"></i> Calculate CGPA';
  
  // Set icons for buttons
  document.getElementById('calculate-cgpa-1').innerHTML = '<i class="fas fa-calculator"></i> Calculate CGPA (1 Year)';
  document.getElementById('calculate-cgpa-2').innerHTML = '<i class="fas fa-calculator"></i> Calculate CGPA (2 Years)';
  document.getElementById('calculate-cgpa-3').innerHTML = '<i class="fas fa-calculator"></i> Calculate CGPA (3 Years)';
  document.getElementById('calculate-cgpa-4').innerHTML = '<i class="fas fa-calculator"></i> Calculate CGPA (4 Years)';
  
  // Set icons for labels
  document.querySelector('label[for="department"]').innerHTML = '<i class="fas fa-building"></i> Department:';
  document.querySelector('label[for="year"]').innerHTML = '<i class="fas fa-calendar-alt"></i> Year:';
  
  // Set icon for load courses button
  document.getElementById('load-courses-btn').innerHTML = '<i class="fas fa-download" style="color: white;"></i> Load Courses';
  
  // Set icons for action buttons
  document.querySelector('.export-btn[data-i18n="exportPDF"]').innerHTML = '<i class="fas fa-file-pdf" style="color: white;"></i> Export Result as PDF';
  document.querySelector('.clear-btn').innerHTML = '<i class="fas fa-trash-alt"></i> Clear All Results';

  // Update footer content
  const footerContent = document.querySelector('.footer-content');
  if (footerContent) {
    footerContent.innerHTML = `
      <p>Developed by <a href="https://github.com/alimul-avro" target="_blank" class="developer-link">
        <i class="fas fa-code"></i> Md. Alimul Islam Avro
      </a></p>
      <div class="social-links">
        <a href="https://www.facebook.com/alimul.avro" target="_blank" class="social-link">
          <i class="fab fa-facebook"></i> Facebook
        </a>
        <a href="https://alimulavro.netlify.app/" target="_blank" class="social-link">
          <i class="fas fa-globe"></i> Website
        </a>
        <a href="mailto:avroalimul@gmail.com" class="social-link">
          <i class="fas fa-envelope"></i> Email
        </a>
        <a href="https://github.com/alimul-avro" target="_blank" class="social-link">
          <i class="fab fa-github"></i> GitHub
        </a>
      </div>
      <p class="copyright">© 2025 All rights reserved</p>
    `;

    // Add hover effects for social links
    const socialLinks = footerContent.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px)';
        link.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
      });
      link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
        link.style.boxShadow = 'none';
      });
    });
  }

  // Physics Animation Setup
  function initPhysicsAnimation() {
    const canvas = document.getElementById('physics-canvas');
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Create particles
    const particles = [];
    const particleCount = 50;
    const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];

    for (let i = 0; i < particleCount; i++) {
      const particle = Matter.Bodies.circle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        Math.random() * 5 + 2,
        {
          restitution: 0.8,
          friction: 0.005,
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)]
          }
        }
      );
      particles.push(particle);
    }

    // Add particles to world
    Matter.World.add(engine.world, particles);

    // Add walls
    const walls = [
      Matter.Bodies.rectangle(window.innerWidth / 2, -10, window.innerWidth, 20, { isStatic: true }),
      Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 10, window.innerWidth, 20, { isStatic: true }),
      Matter.Bodies.rectangle(-10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true }),
      Matter.Bodies.rectangle(window.innerWidth + 10, window.innerHeight / 2, 20, window.innerHeight, { isStatic: true })
    ];
    Matter.World.add(engine.world, walls);

    // Handle window resize
    window.addEventListener('resize', () => {
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    });

    // Start the engine and renderer
    Matter.Engine.run(engine);
    Matter.Render.run(render);
  }

  // Debug Font Awesome loading
  console.log('Checking Font Awesome...');
  const testIcon = document.createElement('i');
  testIcon.className = 'fas fa-check';
  document.body.appendChild(testIcon);
  const computedStyle = window.getComputedStyle(testIcon);
  console.log('Font Awesome font-family:', computedStyle.fontFamily);
  document.body.removeChild(testIcon);
}); 