import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { courses as coursesInfo } from './courses'

const slugify = require('slugify')

const SectionsContext = React.createContext()

const App = () => {
  const [courses, setCourses] = useState(coursesInfo)

  useEffect(() => {
    setCourses(courses)
  },[courses])

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

  return (
    <div>
      <h3>{match.params.sectionId}</h3>
      <ul>
        {sectionInfo()}
      </ul>
    </div>
  )
}

export default App
