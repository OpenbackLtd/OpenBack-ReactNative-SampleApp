/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <OpenBack/OpenBack.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [self setupOpenBack];
  
  NSURL *jsCodeLocation;

  #ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  #else
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"SampleReact"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  NSLog(@"");
}

- (void)setupOpenBack {
  NSDictionary *openBackConfig = @{
       kOBKConfigAppCode: @"OEOAASSQCU",
       kOBKConfigEnableAlertNotifications: @(YES),
       kOBKConfigEnableInAppNotifications: @(YES),
       kOBKConfigEnableRemoteNotifications: @(YES),
       kOBKConfigRequestAlertNotificationsAuthorization: @(YES),
       kOBKConfigLogLevel: @(kOBKLogLevelVerbose)
  };
  
  NSError *error = nil;
  if ([OpenBack setupWithConfig:openBackConfig error:&error]) {
    NSLog(@"OpenBack configured successfully");
    if ([OpenBack start:&error]) {
      NSLog(@"OpenBack started successfully");
    } else {
      NSLog(@"Oops, something went wrong! %@", error);
    }
  } else {
    NSLog(@"Oops, something went wrong! %@", error);
  }
}

@end
