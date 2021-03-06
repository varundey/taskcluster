import React, { Component, Fragment } from 'react';
import { object } from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Entry from './Entry';
import Markdown from '../../../components/Markdown';
import HeaderWithAnchor from '../../../components/HeaderWithAnchor';

@withRouter
export default class Reference extends Component {
  static propTypes = {
    /** The JSON object representation of api.json or events.json.  */
    json: object.isRequired,
  };

  render() {
    const { json } = this.props;
    const functionEntries =
      json.entries && json.entries.filter(({ type }) => type === 'function');
    const topicExchangeEntries =
      json.entries &&
      json.entries.filter(({ type }) => type === 'topic-exchange');

    return (
      <div>
        {json.title && <HeaderWithAnchor>{json.title}</HeaderWithAnchor>}
        {json.description && <Markdown>{json.description}</Markdown>}
        {topicExchangeEntries && Boolean(topicExchangeEntries.length) && (
          <Fragment>
            <Typography gutterBottom component="h2" variant="h5">
              Exchanges
            </Typography>
            {topicExchangeEntries.map(entry => (
              <Entry
                key={entry.name}
                type="topic-exchange"
                entry={entry}
                exchangePrefix={json.exchangePrefix}
                serviceName={json.serviceName}
              />
            ))}
          </Fragment>
        )}
        {functionEntries && Boolean(functionEntries.length) && (
          <Fragment>
            <Typography component="h2" variant="h5">
              Functions
            </Typography>
            <Typography>
              For more information on invoking the API methods described here,
              see <Link to="/docs/manual/apis">Using the APIs</Link> in the
              manual.
            </Typography>
            <br />
            {functionEntries.map(entry => (
              <Entry
                key={`${entry.name}-${entry.query}`}
                type="function"
                entry={entry}
                serviceName={json.serviceName}
              />
            ))}
          </Fragment>
        )}
      </div>
    );
  }
}
