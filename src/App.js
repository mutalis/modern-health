import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const slugify = require('slugify')


  const items = [
    {
      "name": "Core Pillars Program",
      "description": "This program is for people who want to live a happier and more fulfilling life. It's for those of us who want to become more mindful, more engaged, and more connected to our everyday lives and relationships.",
      "sections": [
        {
          "name": "Mindfulness",
          "description": "Mindfulness is the ability to be fully present and aware of in the current moment, without judging your experience or yourself.",
          "image": "https://my.joinmodernhealth.com/static/media/meditation-image-page.71f7c8b3.png",
          "order": 0,
          "activities": [
            {
              "type": "Text",
              "content": "Mindfulness is a type of meditation. It can be practiced both formally (i.e. sitting down and focusing on the breath or body intentionally for a few minutes) or informally (i.e. bringing your focus and attention to an activity to the moment while you engage in an activity)."
            },
            {
              "type": "Text",
              "content": "After only eight minutes of mindfulness practice people often start to notice a calmer mind."
            },
            {
              "type": "Text",
              "content": "After two weeks people report better focus and memory. Overall, most people will start to notice changes in a few weeks when they practice for 10-20 minutes a day but keep in mind that this will be different for everyone. Pay attention to your own experience - mindfulness can help you develop more patience with this too."
            },
            {
              "type": "Question",
              "prompt": "How do you want to use mindfulness to improve your work?",
              "options": [
                "Increase Focus",
                "Improve Concentration",
                "Mental Clarity",
                "Reduce Stress",
                "Respond With Kindness",
                "More Self-Control",
                "Other"
              ]
            }
          ]
        },
        {
          "name": "Values",
          "description": "To live a happy and fulfilling life, we must understand our purpose.",
          "image": "https://my.joinmodernhealth.com/static/media/values.e8b1dc68.png",
          "order": 1,
          "activities": [
            {
              "type": "Text",
              "content": "Living according to our values is a great way to get more fulfillment out of our lives."
            },
            {
              "type": "Text",
              "content": "It's also important to remember that no one can live according to their values 100% of the time - remember to be flexible and kind to yourself as you go."
            },
            {
              "type": "Text",
              "content": "It's difficult to live according to our values - congratulate yourself for getting started."
            },
            {
              "type": "Text",
              "content": "Values can change over time. Keep in mind that your values in may change over time, or the way you prioritize them might change."
            },
            {
              "type": "Question",
              "prompt": "If you had more resources to devote to one of these areas, which one would you pick?",
              "options": [
                "Community",
                "Work",
                "Relationships",
                "Physical Health",
                "Play"
              ]
            }
          ]
        },
        {
          "name": "Action",
          "description": "Now that you have identified what is most important to you and what you value the most, the next step is to figure out how to start living your life according to these values!",
          "image": "https://my.joinmodernhealth.com/static/media/action.605a754d.png",
          "order": 2,
          "activities": [
            {
              "type": "Text",
              "content": "It can be helpful to pay attention to what we are doing when we feel like we ARE and ARE NOT living according to our values so that we know what we should do more or less of."
            },
            {
              "type": "Text",
              "content": "How could you be a more supportive friend or family member? Maybe the answer is to call a friend you haven’t spoken to in a while, or to make dinner for your partner when they’ve had a busy day, or to babysit so your friend can go to an movie... It can be anything!"
            },
            {
              "type": "Text",
              "content": "To make it more likely that you will follow through, it can be helpful to be specific, pick a time,and set a reminder."
            }
          ]
        },
        {
          "name": "Flexibility",
          "description": "I’m sure we can all agree that living according to our values sounds great! We all want to do that. But it’s not always as easy as it sounds. Sometimes things get in the way.",
          "image": "https://my.joinmodernhealth.com/static/media/flexibility.edd8dc40.png",
          "order": 3,
          "activities": [
            {
              "type": "Text",
              "content": "Sometimes we don’t do things we care about because it brings up a negative emotion, like fear or anxiety."
            },
            {
              "type": "Text",
              "content": "For example, we might want to develop better relationships with our coworkers but we won’t ask a new coworker to eat lunch with us because we’re scared they might say no."
            },
            {
              "type": "Text",
              "content": "Practicing psychological flexibility means doing it anyway, because it matters to us."
            },
            {
              "type": "Question",
              "prompt": "I'm grateful for....",
              "options": [
                "Friends",
                "Family",
                "Health",
                "Laughter",
                "Meaningful Work",
                "Work",
                "Books",
                "Nature",
                "Food",
                "Learning",
                "Music",
                "Other"
              ]
            },
            {
              "type": "Text",
              "content": "Congrats on finishing the Core Pillars Program!"
            }
          ]
        }
      ]
    },
    {
      "name": "Psychological First Aid",
      "description": "Experiencing distress after a stressful or traumatic event is common. The goals of this short course are to help you cope and recover.",
      "sections": [
        {
          "name": "Common Reactions you Might Experience",
          "description": "There are common emotional, mental, and behavioral reactions after someone experiences or witnesses a traumatic event. These can be difficult but usually improve over time.",
          "image": "https://staging.joinmodernhealth.com/static/media/psychological-first-aid.38f004a7.svg",
          "order": 0,
          "activities": [
            {
              "type": "Text",
              "content": "Emotions:\n  - Anxiety and Fear\n  - Sadness, Grief, and Depression\n  - Anger and Irritability\n  - Disconnected, Withdrawn, Numb\n  - Lack of enjoyment\n  - Feeling empty or hopeless\n  - Shock"
            },
            {
              "type": "Text",
              "content": "Thoughts:\n  - Difficulty concentrating or following instructions\n  - Memory problems or very strong memories of the events\n  - Recurring dreams or nightmares\n  - Trouble communicating"
            }
          ]
        },
        {
          "name": "What Helps (and what doesn't)",
          "description": "",
          "image": "https://staging.joinmodernhealth.com/static/media/undraw-feeling-blue-4-b-7-q-copy.74c19b42.svg",
          "order": 1,
          "activities": [
            {
              "type": "Text",
              "content": "What helps?\n  - Talking to someone for support\n  - Spending time with your loved ones\n  - Spending time doing positive activities (e.g., sports, hobbies, reading)\n  - Sleeping enough\n  - Eating healthy meals\n  - Getting some exercise (not too much!)\n  - Trying to stick to a normal schedule\n  - Planning pleasant activities\n  - Taking breaks\n  - Using relaxation methods (breathing exercises, meditation, calming self-talk, soothing music)\n  - Participating in a support group"
            },
            {
              "type": "Text",
              "content": "What doesn’t help?\n  - Drinking or using drugs to cope\n  - Withdrawing from friends and family\n  - Eating too much or not enough\n  - Working too much\n  - Getting into fights or other violent behaviors\n  - Never talking or thinking about the event\n  - Not taking care of yourself\n  - Blaming yourself or others\n  - Doing risky things (e.g., driving recklessly, drinking too much)"
            }
          ]
        }
      ]
    }
  ]

const App = () => {
  const programLinks = () => {
    return items.map(({ name }) => (
      <li>
        <Link key={slugify(name)} to={`/${slugify(name)}`} >{name}</Link>
      </li>
    ))
  }
  const programRoutes = () => {
    return items.map(({ name }) => (
      <Route path={`/${slugify(name)}`} component={Sections} />
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
    return items[0].sections.map(({ name, order }) => (
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
  );
}

const Section = ({ match }) => {
  const sectionInfo = () => {
    return items[0].sections[0].activities.map(({ type, content }) => (
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

export default App;
