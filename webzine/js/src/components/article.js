var React = require('react');

var Article = React.createClass({
  render: function(){
    return(
      <article>
        <h1 className='titre'>{this.props.article.titre}</h1>
      </article>
    );
  }
});

module.exports = Article;
