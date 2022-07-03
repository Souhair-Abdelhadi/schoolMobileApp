package com.schooltime;
import java.util.Arrays;
import com.facebook.react.shell.MainReactPackage;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.imagepicker.ImagePickerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.reactlibrary.LaunchApplicationPackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.ninty.system.setting.SystemSettingPackage;
import com.github.douglasjunior.reactNativeGetLocation.ReactNativeGetLocationPackage;
import com.taluttasgiran.rnsecurestorage.RNSecureStoragePackage;
import io.invertase.firebase.RNFirebasePackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.zmxv.RNSound.RNSoundPackage;
// import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import java.lang.reflect.InvocationTargetException;
import java.util.List;



public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }
            @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNFusedLocationPackage(),
            new RNSpinkitPackage(),
            new ImagePickerPackage(),
            new ReactNativePushNotificationPackage(),
            new LaunchApplicationPackage(),
            new BackgroundTimerPackage(),
            new ReactSliderPackage(),
            new SystemSettingPackage(),
            new ReactNativeGetLocationPackage(),
            new RNSecureStoragePackage(),
            new RNFirebasePackage(),
            new RNScreensPackage(),
            new LinearGradientPackage(),
            new RNSoundPackage(),
            new SafeAreaContextPackage(),
            new ReanimatedPackage(),
            new RNGestureHandlerPackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new RNFirebaseStoragePackage()
      );
    }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

 


  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());

  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.schooltime.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
