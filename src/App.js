import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { openDB } from 'idb';
import * as Survey from 'survey-react'
import { coursesInfo } from './courses'
import 'survey-react/survey.css'

const slugify = require('slugify')

const SectionsContext = React.createContext()

const Section = ({ match }) => {
  const sections = useContext(SectionsContext)
  const activeSection = section => slugify(section.name) === match.params.sectionId
  const [activities] = sections.filter(activeSection)[0].activities

  // Callback method on survey complete
  const sendSurveyToServer = survey => {
    const resultAsString = JSON.stringify(survey.data)
    console.log(`Survey results: ${resultAsString}`)
  }

  const sectionStyle = {
    title: {
      color: 'green',
    },
    li: {
      color: '#6d7072',
      padding: 10,
    },
  }

  const sectionInfo = () => activities.map(activity => {
    if (activity.type === 'Question') {
      const surveyJSON = {
        elements: [
          {
            type: 'radiogroup', choices: activity.options, isRequired: true, name: 'sectionQuestion', title: activity.prompt,
          },
        ],
      }
      return <Survey.Survey key={activity.id} json={surveyJSON} onComplete={sendSurveyToServer} />
    }
    return (<li key={activity.id} style={sectionStyle.li}>{activity.content}</li>)
  })

  return (
    <div>
      <h3 style={sectionStyle.title}>{match.params.sectionId}</h3>
      <ul>
        {sectionInfo()}
      </ul>
    </div>
  )
}

const Sections = ({ match }) => {
  const sections = useContext(SectionsContext)

  const sectionsStyle = {
    ul: {
      display: 'flex',
      'list-style': 'none',
      'justify-content': 'space-between',
    },
    li: {
      border: 'solid 2px gray',
      borderRadius: 5,
      padding: 5,
      width: 100,
    },
    a: {
      color: 'green',
      'font-size': 18,
      'font-weight': 500,
      'text-decoration': 'none',
    },
  }

  const sectionLinks = () => sections.map(({ name, order, image }) => (
    <li style={sectionsStyle.li} key={order}>
      <Link style={sectionsStyle.a} to={`${match.url}/${slugify(name)}`}>
        <img src={image} alt="link" width={100} height={100} />
        <p>{name}</p>
      </Link>
    </li>
  ))

  return (
    <div>
      <h2>Sections</h2>
      <ul style={sectionsStyle.ul}>
        {sectionLinks()}
      </ul>
      <Route path={`${match.path}/:sectionId`} component={Section} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a section</h3>}
      />
    </div>
  )
}

const App = () => {
  const [courses, setCourses] = useState(coursesInfo)

  const programsStyle = {
    ul: {
      display: 'flex',
      'list-style': 'none',
      'justify-content': 'space-between',
    },
    a: {
      color: 'red',
      'font-size': 18,
      'font-weight': 500,
      'text-decoration': 'none',
    },
  }

  const dbPromise = openDB('courses-store', 1, {
    upgrade(db) {
      console.log('Creating the courses object store')
      const store = db.createObjectStore('courses', { keyPath: 'name' })

      console.log('Creating sections index')
      store.createIndex('sections', 'sections')
    },
  })

  const storeLocally = () => {
    console.log('storing locally')
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB')
      return
    }

    dbPromise.then(db => {
      const tx = db.transaction('courses', 'readwrite')
      const store = tx.objectStore('courses')

      return Promise.all(courses.map(item => {
        console.log('Adding item: ', item)
        return store.add(item)
      })).catch(e => {
        tx.abort()
        console.log('Store Error:', e)
      }).then(() => {
        console.log('All items added successfully!');
      })
    }).catch(error => {
      console.log('DB Promise Error:', error)
    })
  }

  useEffect(() => {
    setCourses(courses)
    storeLocally()
  }, [courses])

  const programLinks = () => courses.map(({ name }) => (
    <li key={slugify(name)}>
      <Link style={programsStyle.a} to={`/${slugify(name)}`}>{name}</Link>
    </li>
  ))

  const programRoutes = () => courses.map(course => (
    <SectionsContext.Provider key={slugify(course.name)} value={course.sections}>
      <Route path={`/${slugify(course.name)}`} component={Sections} />
    </SectionsContext.Provider>
  ))

  return (
    <Router>
      <div>
        <h2>Programs</h2>
        <ul style={programsStyle.ul}>
          {programLinks()}
        </ul>
        <hr />
        {programRoutes()}
      </div>
    </Router>
  )
}

export default App
