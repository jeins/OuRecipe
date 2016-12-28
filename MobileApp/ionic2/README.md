**Install Ionic2**
* `$ npm install -g cordova`
* `$ npm install -g ionic`
* `$ npm install -g typescript`

**Start Project**
* `$ npm ionic start ionic2 blank --v2`

**Run on Android Emulator**
* `$ cordova platform add android`
* `$ ionic run android`

if error add more timeout on config.xml ==> `<preference name="loadUrlTimeoutValue" value="700000" />`

**Upload to IonicView**
* `$ ionic upload`

**Build Release APK**
* `$ cd platforms\android`
* `$ keytool -genkey -v -keystore ourecipe.keystore -alias ourecipe -keyalg RSA -keysize 2048 -validity 10000`
* `$ vim release-signing.properties`

`key.store=ourecipe.keystore
key.store.password=password
key.alias=ourecipe
key.alias.password=password`

* `$ ionic build android --release`

