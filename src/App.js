import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { courses as coursesInfo } from './courses'
import { openDB } from 'idb';
import * as Survey from "survey-react"
import "survey-react/survey.css"

const slugify = require('slugify')

const SectionsContext = React.createContext()

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
        <Link to={`/${slugify(name)}`} >{name}</Link>
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
        <ul>
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
    return sections.map(({ name, order }) => (
      <li key={order}>
        <Link to={`${match.url}/${slugify(name)}`} >{name}</Link>
      </li>
    ))
  }

  return (
    <div>
      <h2>Sections</h2>
      <ul>
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
    return activities.map(({ type, content }, index) => (
      <li key={index}>
       {type}: {content}
      </li>
    ))
  }

  // Callback methods on survey complete
  const sendSurveyToServer = (survey, options) => {
    const resultAsString = JSON.stringify(survey.data)
    console.log(`Survey results: ${resultAsString}`)
    alert(resultAsString) //send Ajax request to your web server.
  }

  const surveyJSON = { title: "Tell us, what technologies do you use?", pages: [
    { name:"page1", questions: [ 
        { type: "radiogroup", choices: [ "Yes", "No" ], isRequired: true, name: "frameworkUsing",title: "Do you use any front-end framework like Bootstrap?" },
        { type: "checkbox", choices: ["Bootstrap","Foundation"], hasOther: true, isRequired: true, name: "framework", title: "What front-end framework do you use?", visibleIf: "{frameworkUsing} = 'Yes'" }
     ]},
    { name: "page2", questions: [
      { type: "radiogroup", choices: ["Yes","No"],isRequired: true, name: "mvvmUsing", title: "Do you use any MVVM framework?" },
      { type: "checkbox", choices: [ "AngularJS", "KnockoutJS", "React" ], hasOther: true, isRequired: true, name: "mvvm", title: "What MVVM framework do you use?", visibleIf: "{mvvmUsing} = 'Yes'" } ] },
    { name: "page3",questions: [
      { type: "comment", name: "about", title: "Please tell us about your main requirements for Survey library" } ] }
   ]
  }

  return (
    <div>
      <h3>{match.params.sectionId}</h3>
      <ul>
        {sectionInfo()}
      </ul>
      <Survey.Survey json={surveyJSON} onComplete={sendSurveyToServer}/>
    </div>
  )
}

export default App
