/* eslint-disable */
/* global __CHAT_TOKEN__, __GA_TOKEN__ */

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)


if (__GA_TOKEN__) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', __GA_TOKEN__);

  const script = document.createElement('script');
  script.setAttribute('async', '')
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + __GA_TOKEN__;
  document.head.appendChild(script);
}

if (__CHAT_TOKEN__) {
  const customChat = document.createElement('div');
  customChat.id = 'custom_link';

  if (isMobile) {
      customChat.className = '_mobile';
  }

  document.body.appendChild(customChat);

  window.intercomSettings = {
      app_id: __CHAT_TOKEN__,
      custom_launcher_selector: '#custom_link',
      hide_default_launcher: true,
  };

  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',intercomSettings);}else{var d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args){i.q.push(args)};w.Intercom=i;function l(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/mwtupjx4';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);}if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
}
