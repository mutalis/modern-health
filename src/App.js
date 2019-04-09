import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { courses as coursesInfo } from './courses'
import { openDB } from 'idb';
import * as Survey from "survey-react"
import "survey-react/survey.css"

const slugify = require('slugify')

const SectionsContext = React.createContext()

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
    'text-decoration': 'none'
  }
}

const App = () => {
  const [courses, setCourses] = useState(coursesInfo)

  const dbPromise = openDB('courses-store', 1, {
    upgrade(db) {
        console.log('Creating the courses object store')
        const store = db.createObjectStore('courses', {keyPath: 'name'})

        console.log('Creating sections index')
        store.createIndex('sections', 'sections')
    }
  })

  useEffect(() => {
    setCourses(courses)
    storeLocally()
  },[courses])

  const storeLocally = () => {
    console.log('storing locally')
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB')
      return
    }
    
    dbPromise.then(db => {
      let tx = db.transaction('courses', 'readwrite')
      let store = tx.objectStore('courses')

      return Promise.all(courses.map(item => {
        console.log('Adding item: ', item)
        return store.add(item)
      })
      ).catch(function(e) {
        tx.abort()
        console.log('Store Error:', e)
      }).then(() => {
        console.log('All items added successfully!');
      })
    }).catch(error => {
      console.log('DB Promise Error:', error)
    })
  }

  const programLinks = () => {
    return courses.map(({ name }) => (
      <li key={slugify(name)}>
        <Link style={programsStyle.a} to={`/${slugify(name)}`} >{name}</Link>
      </li>
    ))
  }
  const programRoutes = () => {
    return courses.map(course => (
      <SectionsContext.Provider key={slugify(course.name)} value={course.sections}>
        <Route path={`/${slugify(course.name)}`} component={Sections} />
      </SectionsContext.Provider>
    ))
  }

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

const Sections = ({ match }) => {

  const sections = useContext(SectionsContext)

  const sectionLinks = () => {
    return sections.map(({ name, order, image }) => (
      <li style={sectionsStyle.li} key={order}>
        <Link style={sectionsStyle.a} to={`${match.url}/${slugify(name)}`} >
          <img src={image} width={100} height={100} />
          <p>{name}</p>
        </Link>
      </li>
    ))
  }

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
      width: 100
    },
    a: {
      color: 'green',
      'font-size': 18,
      'font-weight': 500,
      'text-decoration': 'none',
    }
  }

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

const Section = ({ match }) => {

  const sections = useContext(SectionsContext)
  const activities = sections.filter( section => slugify(section.name) === match.params.sectionId)[0].activities

  const sectionInfo = () => {
    return activities.map((activity, index) => {
      if (activity.type === 'Question') {
        const surveyJSON = {
          elements: [
              { type: 'radiogroup', choices: activity.options, isRequired: true, name: 'sectionQuestion',title: activity.prompt }
          ]
        }
        return <Survey.Survey key={index} json={surveyJSON} onComplete={sendSurveyToServer}/>
      } else {
        return (<li key={index} style={sectionStyle.li}>
        {activity.content}
        </li>)
      }
    })
  }

  // Callback method on survey complete
  const sendSurveyToServer = (survey, options) => {
    const resultAsString = JSON.stringify(survey.data)
    console.log(`Survey results: ${resultAsString}`)
  }

  const sectionStyle = {
    title: {
      color: 'green',
    },
    li: {
      color: '#6d7072',
      padding: 10
    }
  }

  return (
    <div>
      <h3 style={sectionStyle.title}>{match.params.sectionId}</h3>
      <ul>
        {sectionInfo()}
      </ul>
    </div>
  )
}

export default App
