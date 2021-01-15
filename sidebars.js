module.exports = {
  tapsdk: [
    {
      快速开始: [
        'sdk/tap-android',
        'sdk/tap-ios',
        'sdk/tap-unity'
      ],
    },
    {
      功能介绍: ['sdk/tap-fun-login', 'sdk/tap-fun-db', 'sdk/tap-fun-moment', 'sdk/tap-fun-paysdk', 'sdk/tap-fun-alive', 'sdk/tap-fun-dlc'],
    },
    {
      API: [
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
    },
    {
      常见问题: ['sdk/tap-android-faq', 'sdk/tap-ios-faq', 'sdk/tap-unity-faq', 'sdk/tap-noun'],
    },
    'sdk/tap-changelog',
    'sdk/tap-download'
  ],
  store: [
    'store/store-about',
    'store/store-practice',
    'store/store-agree',
    'store/store-admin',
    'store/store-register',
    'store/store-auth',
    'store/store-material',
    'store/store-creategame',
    'store/store-order',
    'store/store-update',
    'store/store-test',
    'store/store-release',
    'store/store-ad',
    'store/store-complaint',
    'store/store-contact',
    'store/store-faq',
  ],
};
