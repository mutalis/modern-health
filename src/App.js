import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { courses as coursesInfo } from './courses'
const slugify = require('slugify')

const courses = []
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
    return courses.map(({ name }) => (
      <Route key={slugify(name)} path={`/${slugify(name)}`} component={Sections} />
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
  const sectionLinks = () => {
    return courses[0].sections.map(({ name, order }) => (
      <li>
        <Link key={order} to={`${match.url}/${slugify(name)}`} >{name}</Link>
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
  const sectionInfo = () => {
    return courses[0].sections[0].activities.map(({ type, content }) => (
      <li>
       {type}: {content}
      </li>
    ))
  }
  return (
    <div>
      {console.log('AAA:',match)}
      <h3>{match.params.sectionId}</h3>
      <ul>
        {sectionInfo()}
      </ul>
    </div>
  );
}

export default App
