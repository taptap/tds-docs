module.exports = {
  tapsdk: [
    'tap-download',
    {
      快速开始: [
        'tap-android',
        'tap-ios',
        //{Unity快速开始:['tap-unity','tap-unity2ios','tap-unity2android']},
        'tap-unity'
      ],
    },
    {
      功能介绍:['tap-fun-login','tap-fun-db','tap-fun-moment'],
    },
    {
      常见问题:['tap-android-faq','tap-ios-faq','tap-unity-faq','tap-noun'],
    },
    'tap-changelog',
    'tap-known',
  ],
  api: [
    {
      Android:['api/android-initializer','api/android-loginhelper','api/android-tapdb','api/android-tapmoment'],
    },
    {
      iOS:['api/ios-initializer','api/ios-loginhelper','api/ios-tapdb','api/ios-tapmoment'],
    },
    {
      Unity:['api/unity-login','api/unity-tapdb','api/unity-tapmoment'],
    },

  ]
};
