package com.example.jakecharron.nextup;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;

import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;

public class calendar extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.calendar);
        Button home = findViewById(R.id.calHome);
        home.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {startActivity(new Intent(calendar.this, MainActivity.class));}
        });
    }
}
