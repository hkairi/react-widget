var React;

var Header= React.createClass({
  displayName : "Header",
  logo_url    : "http://agendakar.com/assets/logo-327ec88839272b08eb7b40fe82d636de.png",

  render: function(){
    var style = {
      width        : '60px;',
      height       : '60px;',
      background   : '#fff;',
      borderRadius : '1000px;',
      display      : 'block;',
      float        : 'left;',
      margin       : '2px;'
    };

    var img_style = {
      width  : '50px;',
      margin : '6px;'
    };

    return(
      React.createElement("div", null, 
        React.createElement("div", {style: style}, 
          React.createElement("img", {src: this.logo_url, style: img_style})
        ), 
        React.createElement("h1", null, this.props.titre)
      )
    );
  }
});

var Evenement = React.createClass({
  displayName : "Evenement",
  iscollapsed: null,

  get_url: function(id){
    return 'http://www.agendakar.com/agenda/' + id;
  },

  handleClick: function(){
    this.setState({ iscollapsed: ! this.state.iscollapsed });
  },

  getInitialState: function(){
    return {
      iscollapsed: true
    };
  },

  render: function(){
    var _style = {
      margin   : '0px',
      padding  : '0px',
      fontSize : '12px',
      width    : '100%'
    },
    li_style = {
      height  : this.state.iscollapsed ? 'auto' : '150px'
    },
    c = {
      display : this.state.iscollapsed ? 'none' : 'block'
    },
    a = {
      margin  : '0px',
      padding :'0px'
    };

    return(
      React.createElement("li", {style: li_style, onClick: this.handleClick}, 
        React.createElement("div", null, 
        React.createElement("table", {style: _style}, 
          React.createElement("tr", null, 
            React.createElement("td", null, "Le ", this.props.date), 
            React.createElement("td", null, this.props.heure)
          ), 
          React.createElement("tr", null, React.createElement("td", {colSpan: "2"}, React.createElement("a", {href: this.get_url(this.props.id), style: a}, " ", this.props.nom, " "))), 
          React.createElement("tr", {style: c}, 
            React.createElement("td", null, this.props.prix), 
            React.createElement("td", null, this.props.endroit)
          ), 
          React.createElement("tr", {style: c}, 
            React.createElement("td", {colSpan: "2"}, 
              React.createElement("a", {href: this.get_url(this.props.id)}, "voir sur Agendakar")
            )
          )
        )
        )
      )
    );
  }
});

var Liste = React.createClass({
  displayName: 'Agenda',

  render: function(){
    var l = {
      height   : '230px',
      overflow : 'auto'
    },
    liste = [];

    this.props.evenements.map(function(e){
      liste.push(
        React.createElement(Evenement, {key: e.id, id: e.id, nom: e.nom, date: e.date_de_debut, heure: e.heure_de_debut, endroit: e.nom_endroit, prix: e.prix})
      )
    });

    return(
      React.createElement("div", {style: l}, 
        liste
      )
    );
  }
});

var Footer= React.createClass({displayName: "Footer",
  render: function(){
    var footer_style = {
      borderTop: '1px solid #DDD'
    },
    h2 = {
      fontSize       : '16px;',
      textAlign      : 'center;',
      height         : '20px;',
      fontFamily     : "'Dosis', sans-serif;",
      fontweight     : '100;',
      textTransform  : 'uppercase;',
      background     : '#a3abac;',
      color          : '#fff ;',
      margin         : '0px !important;',
      padding        : '5px 0px;',
      textDecoration : 'none;'
    };

    return(
      React.createElement("div", {style: footer_style}, 
        React.createElement("a", {href: "http://www.agendakar.com", target: "_blank"}, 
          React.createElement("h2", {style: h2}, "aller sur agendakar")
        )
      )
    );
  }
});

var AgendakarWidget= React.createClass({
  displayName: 'agendakar-widget',
  evenements : [],
  isLoading  : true,
  url        : 'http://www.agendakar.com/api/events.json',

  getInitialState: function(){
    return {
      evenements : [],
      isLoading  : true,
      url        : 'http://www.agendakar.com/api/events.json'
    }
  },

  componentDidMount: function(){
    var self = this;
    $.get(this.state.url)
    .done(function(data){
      self.setState({ isLoading: false, evenements: data });
    })
    .fail(function(){
      alert("oups");
    });
  },

  render: function(){
    var styles = {
      width  : '300px',
      height : '330px',
      float  : 'right'
    },
    toShow = {
      textAlign : 'center',
      display   : this.state.isLoading ? 'block' : 'none'
    };

    return(
      React.createElement("div", {style: styles}, 
        React.createElement(Header, {titre: "L'agenda cette semaine"}), 
        React.createElement("h2", {style: toShow}, "Chargement en cours ..."), 
        React.createElement(Liste, {evenements: this.state.evenements}), 
        React.createElement(Footer, null)
      )
    );
  }
});

React.render(
  React.createElement(AgendakarWidget, null), document.getElementById('content')
);
