git submodule update --init
cp -r content/static .
cp -r content/zh-Hans/docs .
cp -r content/docComponents src
cp -r content/en/docs i18n/en/docusaurus-plugin-content-docs/current
cp -r content/eng/docs i18n/eng/docusaurus-plugin-content-docs/current
cp content/en/translation.json i18n/en/docusaurus-plugin-content-docs/current.json
cp content/eng/translation.json i18n/eng/docusaurus-plugin-content-docs/current.json
