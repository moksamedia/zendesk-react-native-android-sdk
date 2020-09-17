package com.zenchatapp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.smooch.ui.ConversationActivity;

import android.app.Activity;

public class ZenchatModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    ZenchatModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "ZenchatModule";
    }

    @ReactMethod
    public void showChat() {
        final Activity activity = getCurrentActivity();
        ConversationActivity.builder()
                .withStartingText("Welcome to Zenchat!")
                .show(activity);
    }

}
