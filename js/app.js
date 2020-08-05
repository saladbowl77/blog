var main = document.getElementsByTagName("main")[0];
var ShutterAnimation = Barba.BaseTransition.extend({
  start: function() {
    this.shutter(300)
      .then(this.newContainerLoading)
      .then(this.finish.bind(this));
  },
  shutter: function(timer) {
    return new Promise( function (resolve) {
      main.classList.toggle('moved');
      setTimeout(function () {
      main.classList.toggle('moved');
        resolve();
      }, timer);

    });
  },
  finish: function() {
    document.body.scrollTop = 0;
    this.done();
  }
});
Barba.Pjax.getTransition = function() {
  return ShutterAnimation;
};
Barba.Dispatcher.on( 'newPageReady', function( currentStatus, oldStatus, container, newPageRawHTML ) {
    if ( Barba.HistoryManager.history.length === 1 ) {
        return;
    }
    var head = document.head,
        newPageRawHead = newPageRawHTML.match( /<head[^>]*>([\s\S.]*)<\/head>/i )[ 0 ],
        newPageHead = document.createElement( 'head' );
    newPageHead.innerHTML = newPageRawHead;
    var headTags = [
        "meta[name='keywords']",
        "meta[name='description']",
        "meta[property^='og']",
        "meta[name^='twitter']",
        "meta[itemprop]",
        "link[itemprop]",
        "link[rel='prev']",
        "link[rel='next']",
        "link[rel='canonical']",
        "link[rel='alternate']"
    ].join( ',' );
    var oldHeadTags = head.querySelectorAll( headTags );
    for ( var i = 0; i < oldHeadTags.length; i++ ) {
        head.removeChild( oldHeadTags[ i ] );
    }
    var newHeadTags = newPageHead.querySelectorAll( headTags );
    for ( var i = 0; i < newHeadTags.length; i++ ) {
        head.appendChild( newHeadTags[ i ] );
    }
});
Barba.Dispatcher.on('newPageReady', function () {
  if (location.pathname == '/'){
    var el = document.createElement("script");
    el.src = "/js/blog.js";
    document.body.appendChild(el);
  }
});
Barba.Pjax.start();
