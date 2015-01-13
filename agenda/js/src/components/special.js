var Special = React.createClass({

  get_url: function(){
    return( "http://www.agendakar.com/agenda/" + this.props.item.slug );
  },

  render: function(){
    var classes = this.props.show ? '' : 'hidden',
        _item   = this.props.item;
    return(
      _item ?
      <div className={classes} id='agd-special'>
        <div id='s-header'>
          <div id='date'>
          </div>
          <div id='close'>
            <i className='fa fa-remove' onClick={this.props.onClose}></i>
          </div>
        </div>
        <div id='content'>
          <div className="titre"> {_item.nom} </div>
          <div id='image'>
            <img src='http://www.agendakar.com/system/evenements/photos/000/001/258/android/1399579_478340228970536_1206969411209848894_o.jpg' />
            <br />

            <table>
              <tr>
                <td>{_item.date}</td>
                <td className='heure'>{_item.heure}</td>
              </tr>
            </table>
          </div>
          <div id='extra'>
            <a href={this.get_url()} target='_blank'>
              <i className='fa fa-external-link'></i>
              plus d'infos sur www.agenakar.com
            </a>
          </div>
        </div>
      </div>
      : null
    );
  }
});

module.exports = Special;
