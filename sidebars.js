module.exports = {
  tapsdk: [
    'tap-download',
    {
      快速开始: [
        'tap-android',
        'tap-ios',
        {Unity快速开始:['tap-unity','tap-unity2ios','tap-unity2android']},
      ],
    },
    {
      功能介绍:['tap-fun-login','tap-fun-db','tap-fun-moment'],
    },
    {
      常见问题:['tap-android-faq','tap-ios-faq','tap-unity-faq'],
    },
    'tap-changelog',
    'tap-known',
  ],
  api: ['tap-api']
};
