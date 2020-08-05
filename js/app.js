var main = document.getElementsByTagName("main")[0];
const replaceHeadTags = target => {
  const head = document.head
  const targetHead = target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
  const newPageHead = document.createElement('head')
  newPageHead.innerHTML = targetHead
  const removeHeadTags = [
    "meta[name='keywords']",
    "meta[name='description']",
    "meta[property^='fb']",
    "meta[property^='og']",
    "meta[name^='twitter']",
    "meta[name='robots']",
    'meta[itemprop]',
    'link[itemprop]',
    "link[rel='prev']",
    "link[rel='next']",
    "link[rel='canonical']",
  ].join(',')
  const headTags = [...head.querySelectorAll(removeHeadTags)]
  headTags.forEach(item => {
    head.removeChild(item)
  })
  const newHeadTags = [...newPageHead.querySelectorAll(removeHeadTags)]
  newHeadTags.forEach(item => {
    head.appendChild(item)
  })
}
barba.init({
  transitions: [
    {
      async leave() {
        main.classList.add('moved');
        await new Promise(resolve => {
          return setTimeout(resolve, 600);
        });
      },
      afterEnter() {
        main.classList.remove('moved');
        if (location.pathname == '/'){
          const blog = document.createElement("script");
          blog.src = "/js/blog.js";
          document.body.appendChild(blog);
        }
        if (location.pathname.slice(0,5) == '/blog'){
          const parts = document.createElement("script");
          parts.src = "/js/parts.js";
          document.body.appendChild(parts);
        }
      },
      beforeEnter({ next }) {
        replaceHeadTags(next)
      }
    }
  ]
});
barba.use(barbaCss);
barba.init();
/*
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
*/