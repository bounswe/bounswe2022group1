// Generated by view binder compiler. Do not edit!
package com.example.myapplication.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.example.myapplication.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class ActivityAddContentBinding implements ViewBinding {
  @NonNull
  private final ConstraintLayout rootView;

  @NonNull
  public final EditText NameEditText;

  @NonNull
  public final Button SubmitButton;

  @NonNull
  public final TextView name;

  @NonNull
  public final EditText textEditText;

  @NonNull
  public final TextView textOrUrl;

  @NonNull
  public final TextView textView15;

  private ActivityAddContentBinding(@NonNull ConstraintLayout rootView,
      @NonNull EditText NameEditText, @NonNull Button SubmitButton, @NonNull TextView name,
      @NonNull EditText textEditText, @NonNull TextView textOrUrl, @NonNull TextView textView15) {
    this.rootView = rootView;
    this.NameEditText = NameEditText;
    this.SubmitButton = SubmitButton;
    this.name = name;
    this.textEditText = textEditText;
    this.textOrUrl = textOrUrl;
    this.textView15 = textView15;
  }

  @Override
  @NonNull
  public ConstraintLayout getRoot() {
    return rootView;
  }

  @NonNull
  public static ActivityAddContentBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static ActivityAddContentBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.activity_add_content, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static ActivityAddContentBinding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.NameEditText;
      EditText NameEditText = ViewBindings.findChildViewById(rootView, id);
      if (NameEditText == null) {
        break missingId;
      }

      id = R.id.SubmitButton;
      Button SubmitButton = ViewBindings.findChildViewById(rootView, id);
      if (SubmitButton == null) {
        break missingId;
      }

      id = R.id.name;
      TextView name = ViewBindings.findChildViewById(rootView, id);
      if (name == null) {
        break missingId;
      }

      id = R.id.textEditText;
      EditText textEditText = ViewBindings.findChildViewById(rootView, id);
      if (textEditText == null) {
        break missingId;
      }

      id = R.id.textOrUrl;
      TextView textOrUrl = ViewBindings.findChildViewById(rootView, id);
      if (textOrUrl == null) {
        break missingId;
      }

      id = R.id.textView15;
      TextView textView15 = ViewBindings.findChildViewById(rootView, id);
      if (textView15 == null) {
        break missingId;
      }

      return new ActivityAddContentBinding((ConstraintLayout) rootView, NameEditText, SubmitButton,
          name, textEditText, textOrUrl, textView15);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}