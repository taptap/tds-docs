module.exports = {
  tapsdk: [
    'sdk/tap-download',
    {
      快速开始: [
        'sdk/tap-android',
        'sdk/tap-ios',
        'sdk/tap-unity'
      ],
    },
    {
      功能介绍: ['sdk/tap-fun-login', 'sdk/tap-fun-db', 'sdk/tap-fun-moment'],
    },
    {
      常见问题: ['sdk/tap-android-faq', 'sdk/tap-ios-faq', 'sdk/tap-unity-faq', 'sdk/tap-noun'],
    },
    'sdk/tap-changelog',
  ],
  api: [
    {
      Android: ['api/android-initializer', 'api/android-loginhelper', 'api/android-tapdb', 'api/android-tapmoment'],
    },
    {
      iOS: ['api/ios-initializer', 'api/ios-loginhelper', 'api/ios-tapdb', 'api/ios-tapmoment'],
    },
    {
      Unity: ['api/unity-login', 'api/unity-tapdb', 'api/unity-tapmoment'],
    },

  ]
};
