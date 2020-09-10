import React, { useState } from 'react';
import './Reports.css';

const sortAscending = (a,b) => a.updated - b.updated;
const sortDescending = (a,b) => b.updated - a.updated;
const dateOptions = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true}
const formatDate = (number) =>
    new Intl.DateTimeFormat('en-US', dateOptions)
        .format(new Date(number))
        .split(',')
        .join('<br />')

function Reports (props) {
    const { reports } = props;
    const [ sort, setSort ] = useState({ sort: sortAscending });
    const [ search, setSearch ] = useState('');
    const toggleSort = () => {
        // noinspection JSIncompatibleTypesComparison
        if (sort.sort === sortAscending)
            setSort({ sort: sortDescending });
        else
            setSort({ sort: sortAscending });
    }
    const getToggleClass = (whichOne) => {
        if (whichOne === 'less') {
            if (sort.sort === sortAscending) return 'gray-out';
            return '';
        }
        if (sort.sort === sortDescending) return 'gray-out';
        return '';
    }

    return (
      <div className="component-reports">
          <div className="reports-header">
              <span className="reports-header-text">Reports {reports.length}</span>
              <i  onClick={props.onRefresh}
                  className="material-icons reports-header-icons">
                  refresh
              </i>
              <i  onClick={props.onClose}
                  className="material-icons reports-header-icons">
                  close
              </i>
          </div>
          <div className="reports-search">
              <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="search reports" />
              <div className="sort-options">
                  <i  onClick={toggleSort}
                      className={`material-icons reports-expand-icons ${getToggleClass('less')}`}>
                      expand_less
                  </i>
                  <i  onClick={toggleSort}
                      className={`material-icons reports-expand-icons ${getToggleClass('more')}`}>
                      expand_more
                  </i>
              </div>
          </div>
          <div className="reports-grid">
              {reports
                  .sort(sort.sort)
                  .filter(e => e.name.indexOf(search) > -1)
                  .map((gridItem, index) => {
                  return (
                  <div key={`grid-item-${index}`}
                       className="reports-grid-item">
                      <div className="grid-item-left">
                          <span>{ gridItem.name }</span>
                          <span className="grid-bottom-line">{ gridItem.location }</span>
                      </div>
                      <div
                          className="grid-item-right"
                          dangerouslySetInnerHTML={{__html: formatDate(gridItem.updated) }} />
                  </div>);
              })}

          </div>
      </div>
    );
}

export default React.memo(Reports);