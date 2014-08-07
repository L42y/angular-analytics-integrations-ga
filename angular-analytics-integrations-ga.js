angular.module('l42y.analytics.integrations.ga', [
  'l42y.analytics'
]).config(function (
  AnalyticsProvider
) {
  var identifier = 'ga.js';
  var variableName = '_gaq';

  var config = AnalyticsProvider.config.integrations[identifier];
  (function (window, document, script, variableName, config, scriptElement, firstScript) {
    window[variableName] = [
      ['_setAccount', config.accountId],
      ['_setDomainName', config.domain || 'auto']
    ];
    scriptElement = document.createElement(script);
    scriptElement.src='//www.google-analytics.com/ga.js';
    firstScript = document.getElementsByTagName(script)[0];
    firstScript.parentNode.insertBefore(scriptElement, firstScript);
  }(window, document, 'script', variableName, config));

  AnalyticsProvider.integrate(identifier, {
    page: function trackPageViewByGoogleAnalytics (current) {
      window[variableName].push(['_trackPageview', current]);
    },
    track: function trackEventByGoogleAnalytics (event, prop) {
      window[variableName].push([
        '_trackEvent',
        prop.category,
        event,
        prop.label,
        prop.value,
        prop.noninteraction
      ]);
    }
  });
});
