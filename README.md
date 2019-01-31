# OpenBack React Native Sample App

This application is a simple project highlighting the integration of the OpenBack library into a React Native application. It shows how to set custom trigger values using the OpenBack SDK. It also comes with a ready made OpenBack app code, which has already been setup with some simple campaigns reacting to the trigger values. An App Inbox view is also included.

> For the full React Native integration guide, check out the [OpenBack Documentation](https://docs.openback.com/plugins/react).

## How the sample app was setup

A basic React Native project was created using `react-native init SampleReact`. 

External dependencies were installed using npm:

```bash
npm install react-navigation react-native-gesture-handler react-native-openback moment
```

After modifying the plaforms as described below, the OpenBack react native library was linked to the project using:

```bash
react-native link react-native-openback
```

### iOS Specifics

Cocoapods [Podfile](/ios/Podfile) was added in the `/ios` folder using `pod init` and edited to add `pod OpenBack` as well as enabling the dynamic framework feature. Then the OpenBack framework was installed using `pod update`.

The [App Delegate](/ios/SampleReact/AppDelegate.m) was tweaked to setup OpenBack in the `didFinishLaunchingWithOptions` call.

Check the full [iOS Integration Documentation](https://docs.openback.com/ios/integration) for other important details.

### Android Specifics

The application [build.gradle](/android/app/build.gradle) was edited to include the OpenBack library dependency.

```ruby
repositories {
    maven { url 'https://maven.openback.com/public' }
}

dependencies {
    ...
    implementation "com.openback:OpenBack:2.+"
}
```

> OpenBack library is compiled with the latest android support version - top level gradle file was changed to use support version 28.

Check the full [Android Integration Documentation](https://docs.openback.com/android/integration) for other important details.
