import React from 'react';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import './dashboard.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const testResults = (resultsArray) => {
      const buildOutput = [];
      for (let resultsIndex = 0; resultsIndex <= resultsArray.length - 1; resultsIndex++) {
        // console.log(`result: ${resultsIndex}`);
        // console.log(resultsArray[resultsIndex]);
        // console.log(Object.keys(resultsArray[resultsIndex]));
        Object.entries(resultsArray[resultsIndex]).forEach(([key, value]) => {
          if (typeof value === 'object') {
            console.log('1 level deep');
            Object.entries(value).forEach(([key, value]) => { buildOutput.push(`${key}: ${value}`); });
            return;
          } // else
          if (key !== undefined) {
            console.log('0 level deep');
            buildOutput.push(`${key}: ${value}`);
          }
        }); 
      }
      return buildOutput;
    };

    const testRender = (resultsArray) => {
      const returnedOutput = testResults(resultsArray);
      // console.log('returnedOutput');
      // console.log(returnedOutput);
      return <div>
        {
          returnedOutput.map((toDisplay) => {
            const key = toDisplay.split(': ')[0];
            const value = toDisplay.split(': ')[1];
            return <section>
              <p>{`${key}`}</p>
              <p>{`${value}`}</p>
            </section>;
          })
        }
      </div>;
    };

    // this list is what we will build with a DB query... this is just test data
    const list = [
      {
        title: "Old Man's War",
        author: {
          firstName: 'John',
          lastName: 'Scalzi',
        },
      },
      {
        title: 'The Lock Artist',
        author: {
          firstName: 'Steve',
          lastName: 'Hamilton',
        },
      },
      {
        title: 'HTML5',
        author: {
          firstName: 'Remy',
          lastName: 'Sharp',
        },
      },
      {
        title: 'Right Ho Jeeves',
        author: {
          firstName: 'P.D',
          lastName: 'Woodhouse',
        },
      },
    ];

    // search options... need to continue to teak using fuse documentation
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'title',
        'author.firstName',
      ],
    };
    // "list" is the item array
    const fuse = new Fuse(list, options);
    // this is where the search box populates this input to re-render the page
    const result = fuse.search('old');

    return (
      <div className='centered'>
        <p>You are logged in to FlySorter</p>
        <p>SEARCH FUNCTIONALITY HERE</p>
        {testRender(result)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps, null)(Dashboard);
