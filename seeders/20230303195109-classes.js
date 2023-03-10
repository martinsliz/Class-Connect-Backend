'use strict'
const falso = require('@ngneat/falso')
const subjects = [
  'Calculus',
  'Astronomy',
  'Algebra',
  'Physics',
  'Physical Education',
  'Music',
  'History',
  'Social Studies',
  'Art',
  'Geography',
  'Biology',
  'Chemistry',
  'Foreign Languages',
  'Philosophy',
  'Literature',
  'English',
  'Computer Science',
  'Health Education',
  'Anthropology',
  'Dance',
  'Drama',
  'Forensics',
  'Geometry',
  'Humanities',
  'Law',
  'Nutrition',
  'Mechanics',
  'Photography',
  'Pottery',
  'Probability',
  'Religion',
  'Sociology',
  'Statistics',
  'Trigonometry',
  'Web Designing'
]

const semesters = ['Fall', 'Spring', 'Summer']

const classLevels = ['I', 'II', 'III', 'IV']

const getRandomClassName = (subjects, classLevels) => {
  const subjectsRandomIndex = Math.floor(Math.random() * subjects.length)
  const levelsRandomIndex = Math.floor(Math.random() * classLevels.length)
  const subject = subjects[subjectsRandomIndex]
  const level = classLevels[levelsRandomIndex]
  const name = subject + ' ' + level
  return [name, subject]
}

const getRandomSemester = () => {
  const RandomIndex = Math.floor(Math.random() * semesters.length)
  const semester = semesters[RandomIndex]
  return semester
}

const classes = new Array(25)

for (let i = 0; i < classes.length; i++) {
  let classInfo = getRandomClassName(subjects, classLevels)
  let name = classInfo[0]
  let subject = classInfo[1]
  let description = falso.randParagraph()
  let semester = getRandomSemester()
  let teacher = falso.randFullName()
  let credits = falso.randNumber({ min: 1, max: 4 })
  let createdAt = new Date()
  let updatedAt = new Date()
  classes[i] = {
    name,
    subject,
    description,
    semester,
    teacher,
    credits,
    createdAt,
    updatedAt
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('classes', classes)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('classes')
  }
}
