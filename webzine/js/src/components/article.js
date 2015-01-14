var Article = React.createClass({
  displayName : "Article",

  get_url: function(slug){
    var id = this.props.clientId;
    return 'http://www.agendakar.com/webzine/' + slug + '?clientId=' + id;
  },

  clickHandler: function(){
    this.props.onClick(this.props.index);
  },

  render: function(){
    var _art = this.props.art;

    return(
      <li className='item' onClick={this.clickHandler}>
        <div>
          <table className='article'>
            <tr>
              <td>{_art.titre}</td>
            </tr>
            <tr>
              <td>
                <div className='dateheure'>
                  <small>
                  {'publi' + String.fromCharCode(233) + ' le '}
                  <b>{_art.date_de_publication}</b>
                  </small>
                </div>
              </td>
            </tr>
           </table>
        </div>
      </li>
    );
  }
});

module.exports = Article;
